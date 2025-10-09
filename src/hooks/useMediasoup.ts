import { useState, useEffect, useRef, useCallback } from 'react';
import { Device, types } from 'mediasoup-client';
import { Socket } from 'socket.io-client';
import type {
    RoomJoinData,
    WebRtcTransportData,
    ConnectTransportData,
    ProduceData,
    ConsumeData,
    ResumeConsumerData,
    JoinRoomSuccessData,
    WebRtcTransportCreatedData,
    ProducedData,
    ConsumedData,
    NewProducerData,
    PeerLeftData,
    Participant,
} from '../types/socket.types';

export const useMediasoup = (socket: Socket | null) => {
    const [device, setDevice] = useState<Device | null>(null);
    const [participants, setParticipants] = useState<Map<string, Participant>>(new Map());
    const [isJoined, setIsJoined] = useState(false);
    const [roomId, setRoomId] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [transportReady, setTransportReady] = useState({ send: false, receive: false });

    const socketRef = useRef<Socket | null>(null);
    const deviceRef = useRef<Device | null>(null);
    const sendTransportRef = useRef<types.Transport | null>(null);
    const receiveTransportRef = useRef<types.Transport | null>(null);
    const producersRef = useRef<Map<string, types.Producer>>(new Map());
    const consumersRef = useRef<Map<string, types.Consumer>>(new Map());
    const pendingProducers = useRef<MediaStreamTrack[]>([]);

    // Update socket ref when socket changes
    useEffect(() => {
        socketRef.current = socket;
    }, [socket]);

    // Initialize mediasoup device
    const initializeDevice = useCallback(async (rtpCapabilities: types.RtpCapabilities) => {
        try {
            const newDevice = new Device();
            await newDevice.load({ routerRtpCapabilities: rtpCapabilities });
            deviceRef.current = newDevice;
            setDevice(newDevice);
            return newDevice;
        } catch (err) {
            console.error('Failed to load device:', err);
            setError(`Failed to initialize device: ${err instanceof Error ? err.message : 'Unknown error'}`);
            throw err;
        }
    }, []);

    // Create WebRTC transport
    const createTransport = useCallback((transportData: WebRtcTransportCreatedData, producing: boolean) => {
        if (!deviceRef.current) throw new Error('Device not initialized');

        const transport = producing
            ? deviceRef.current.createSendTransport({
                id: transportData.id!,
                iceParameters: transportData.iceParameters!,
                iceCandidates: transportData.iceCandidates!,
                dtlsParameters: transportData.dtlsParameters!,
            })
            : deviceRef.current.createRecvTransport({
                id: transportData.id!,
                iceParameters: transportData.iceParameters!,
                iceCandidates: transportData.iceCandidates!,
                dtlsParameters: transportData.dtlsParameters!,
            });

        // Handle transport connect event
        transport.on('connect', ({ dtlsParameters }, callback, errback) => {
            if (!socketRef.current) {
                errback(new Error('Socket not connected'));
                return;
            }

            socketRef.current.emit('connect-webrtc-transport', {
                transportId: transport.id,
                dtlsParameters,
            } as ConnectTransportData);

            // Listen for connection confirmation
            const handleConnected = () => {
                callback();
                socketRef.current?.off('webrtc-transport-connected', handleConnected);
            };
            socketRef.current.on('webrtc-transport-connected', handleConnected);
        });

        if (producing) {
            // Handle produce event for send transport
            transport.on('produce', ({ kind, rtpParameters, appData }, callback, errback) => {
                if (!socketRef.current) {
                    errback(new Error('Socket not connected'));
                    return;
                }

                socketRef.current.emit('produce', {
                    transportId: transport.id,
                    kind,
                    rtpParameters,
                    appData,
                } as ProduceData);

                // Listen for producer creation confirmation
                const handleProduced = (data: ProducedData) => {
                    if (data.success && data.id) {
                        callback({ id: data.id });
                    } else {
                        errback(new Error(data.error || 'Failed to produce'));
                    }
                    socketRef.current?.off('produced', handleProduced);
                };
                socketRef.current.on('produced', handleProduced);
            });

            sendTransportRef.current = transport;
            setTransportReady(prev => ({ ...prev, send: true }));
        } else {
            receiveTransportRef.current = transport;
            setTransportReady(prev => ({ ...prev, receive: true }));
        }

        return transport;
    }, []);

    // Join room
    const joinRoom = useCallback(async (roomData: RoomJoinData) => {
        if (!socketRef.current) throw new Error('Socket not connected');

        setError(null);
        setRoomId(roomData.roomId);
        setUserId(roomData.userId);

        return new Promise<void>((resolve, reject) => {
            const handleJoinSuccess = async (data: JoinRoomSuccessData) => {
                try {
                    // Initialize device with RTP capabilities
                    await initializeDevice(data.rtpCapabilities);

                    // Create send transport
                    socketRef.current?.emit('create-webrtc-transport', { producing: true } as WebRtcTransportData);

                    // Create receive transport
                    socketRef.current?.emit('create-webrtc-transport', { producing: false } as WebRtcTransportData);

                    // Add existing peers to participants
                    const newParticipants = new Map<string, Participant>();
                    data.existingPeers.forEach(peer => {
                        newParticipants.set(peer.peerId, {
                            id: peer.peerId,
                            name: peer.peerName,
                        });
                    });
                    setParticipants(newParticipants);

                    setIsJoined(true);
                    resolve();
                } catch (err) {
                    reject(err);
                }
                socketRef.current?.off('join-room-success', handleJoinSuccess);
                socketRef.current?.off('join-room-error', handleJoinError);
            };

            const handleJoinError = (data: { message: string }) => {
                setError(data.message);
                reject(new Error(data.message));
                socketRef.current?.off('join-room-success', handleJoinSuccess);
                socketRef.current?.off('join-room-error', handleJoinError);
            };

            if (socketRef.current) {
                socketRef.current.on('join-room-success', handleJoinSuccess);
                socketRef.current.on('join-room-error', handleJoinError);
                socketRef.current.emit('join-room', roomData);
            } else {
                reject(new Error('Socket disconnected'));
            }
        });
    }, [initializeDevice]);

    // Produce media (camera/microphone)
    const produceMedia = useCallback(async (track: MediaStreamTrack) => {
        // If send transport is not ready, queue the track for later
        if (!sendTransportRef.current || !transportReady.send) {
            console.log('Transport not ready, queuing track for production');
            pendingProducers.current.push(track);
            return;
        }

        try {
            const producer = await sendTransportRef.current.produce({ track });
            producersRef.current.set(producer.id, producer);
            console.log(`Producer created for ${track.kind}:`, producer.id);
            return producer;
        } catch (err) {
            console.error('Failed to produce media:', err);
            throw err;
        }
    }, [transportReady.send]);

    // Process pending producers when transport is ready
    useEffect(() => {
        if (transportReady.send && sendTransportRef.current && pendingProducers.current.length > 0) {
            console.log('Processing pending producers:', pendingProducers.current.length);
            const tracks = [...pendingProducers.current];
            pendingProducers.current = [];

            tracks.forEach(async (track) => {
                try {
                    await produceMedia(track);
                } catch (error) {
                    console.error('Failed to produce pending track:', error);
                }
            });
        }
    }, [transportReady.send, produceMedia]);

    // Consume media from remote peer
    const consumeMedia = useCallback(async (producerId: string) => {
        if (!receiveTransportRef.current || !deviceRef.current || !socketRef.current) {
            throw new Error('Transport, device, or socket not ready');
        }

        const receiveTransport = receiveTransportRef.current;
        const device = deviceRef.current;

        return new Promise<types.Consumer>((resolve, reject) => {
            const handleConsumed = async (data: ConsumedData) => {
                if (data.success && data.id && data.producerId === producerId) {
                    try {
                        const consumer = await receiveTransport.consume({
                            id: data.id,
                            producerId: data.producerId,
                            kind: data.kind!,
                            rtpParameters: data.rtpParameters!,
                            appData: data.appData,
                        });

                        consumersRef.current.set(consumer.id, consumer);

                        // Resume consumer
                        socketRef.current?.emit('resume-consumer', { consumerId: consumer.id } as ResumeConsumerData);

                        resolve(consumer);
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error(data.error || 'Failed to consume'));
                }
                socketRef.current?.off('consumed', handleConsumed);
            };

            if (socketRef.current) {
                socketRef.current.on('consumed', handleConsumed);
                socketRef.current.emit('consume', {
                    transportId: receiveTransport.id,
                    producerId,
                    rtpCapabilities: device.rtpCapabilities,
                } as ConsumeData);
            } else {
                reject(new Error('Socket disconnected'));
            }
        });
    }, []);

    // Leave room
    const leaveRoom = useCallback(() => {
        if (!socketRef.current) return;

        // Clean up producers
        producersRef.current.forEach(producer => producer.close());
        producersRef.current.clear();

        // Clean up consumers
        consumersRef.current.forEach(consumer => consumer.close());
        consumersRef.current.clear();

        // Clean up transports
        if (sendTransportRef.current) {
            sendTransportRef.current.close();
            sendTransportRef.current = null;
        }
        if (receiveTransportRef.current) {
            receiveTransportRef.current.close();
            receiveTransportRef.current = null;
        }

        setParticipants(new Map());
        setIsJoined(false);
        setRoomId('');
        setUserId('');
        setTransportReady({ send: false, receive: false });
        pendingProducers.current = [];

        socketRef.current.emit('leave-room');
    }, []);

    // Set up socket event listeners
    useEffect(() => {
        if (!socketRef.current) return;

        const socket = socketRef.current;

        // Handle transport creation
        const handleTransportCreated = (data: WebRtcTransportCreatedData) => {
            if (data.success) {
                // Determine if this is for sending or receiving based on existing transports
                const producing = !sendTransportRef.current;
                createTransport(data, producing);
            } else {
                setError(data.error || 'Failed to create transport');
            }
        };

        // Handle new producer from remote peer
        const handleNewProducer = async (data: NewProducerData) => {
            try {
                const consumer = await consumeMedia(data.producerId);

                // Update participant with new consumer
                setParticipants(prev => {
                    const updated = new Map(prev);
                    const participant = updated.get(data.peerId) || { id: data.peerId, name: 'Unknown' };

                    if (data.kind === 'video') {
                        participant.videoConsumer = consumer;
                        participant.videoStream = new MediaStream([consumer.track]);
                    } else if (data.kind === 'audio') {
                        participant.audioConsumer = consumer;
                        participant.audioStream = new MediaStream([consumer.track]);
                    }

                    updated.set(data.peerId, participant);
                    return updated;
                });
            } catch (err) {
                console.error('Failed to consume new producer:', err);
            }
        };

        // Handle peer left
        const handlePeerLeft = (data: PeerLeftData) => {
            setParticipants(prev => {
                const updated = new Map(prev);
                const participant = updated.get(data.peerId);

                if (participant) {
                    // Clean up consumers
                    if (participant.videoConsumer) {
                        participant.videoConsumer.close();
                        consumersRef.current.delete(participant.videoConsumer.id);
                    }
                    if (participant.audioConsumer) {
                        participant.audioConsumer.close();
                        consumersRef.current.delete(participant.audioConsumer.id);
                    }
                }

                updated.delete(data.peerId);
                return updated;
            });
        };

        // Handle new peer joined
        const handleNewPeer = (data: { peerId: string; peerName: string }) => {
            setParticipants(prev => {
                const updated = new Map(prev);
                updated.set(data.peerId, {
                    id: data.peerId,
                    name: data.peerName,
                });
                return updated;
            });
        };

        socket.on('webrtc-transport-created', handleTransportCreated);
        socket.on('new-producer', handleNewProducer);
        socket.on('peer-left', handlePeerLeft);
        socket.on('new-peer', handleNewPeer);

        return () => {
            socket.off('webrtc-transport-created', handleTransportCreated);
            socket.off('new-producer', handleNewProducer);
            socket.off('peer-left', handlePeerLeft);
            socket.off('new-peer', handleNewPeer);
        };
    }, [socket]);

    return {
        device,
        participants: Array.from(participants.values()),
        isJoined,
        roomId,
        userId,
        error,
        joinRoom,
        leaveRoom,
        produceMedia,
        consumeMedia,
    };
};