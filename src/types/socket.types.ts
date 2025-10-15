import { types } from 'mediasoup-client';

// Copy these exact types from backend
export interface RoomJoinData {
    roomId: string;
    userId: string;
    peerName: string;
}

export interface WebRtcTransportData {
    producing: boolean;
}

export interface ConnectTransportData {
    transportId: string;
    dtlsParameters: types.DtlsParameters;
}

export interface ProduceData {
    transportId: string;
    kind: 'audio' | 'video';
    rtpParameters: types.RtpParameters;
    appData?: any;
}

export interface ConsumeData {
    transportId: string;
    producerId: string;
    rtpCapabilities: types.RtpCapabilities;
}

export interface ResumeConsumerData {
    consumerId: string;
}

// Server response types
export interface JoinRoomSuccessData {
    roomId: string;
    rtpCapabilities: types.RtpCapabilities;
    existingProducers: Array<{
        id: string;
        kind: 'audio' | 'video';
        peerId: string;
    }>;
    existingPeers: Array<{
        peerId: string;
        peerName: string;
        joinedAt: string;
    }>;
}

export interface JoinRoomErrorData {
    message: string;
}

export interface RouterRtpCapabilitiesData {
    success: boolean;
    rtpCapabilities?: types.RtpCapabilities;
    error?: string;
}

export interface WebRtcTransportCreatedData {
    success: boolean;
    id?: string;
    iceParameters?: types.IceParameters;
    iceCandidates?: types.IceCandidate[];
    dtlsParameters?: types.DtlsParameters;
    error?: string;
}

export interface WebRtcTransportConnectedData {
    success: boolean;
    error?: string;
}

export interface ProducedData {
    success: boolean;
    id?: string;
    error?: string;
}

export interface ConsumedData {
    success: boolean;
    id?: string;
    producerId?: string;
    kind?: 'audio' | 'video';
    rtpParameters?: types.RtpParameters;
    appData?: any;
    error?: string;
}

export interface ConsumerResumedData {
    success: boolean;
    error?: string;
}

export interface NewProducerData {
    producerId: string;
    peerId: string;
    kind: 'audio' | 'video';
}

export interface PeerLeftData {
    peerId: string;
}

export interface NewPeerData {
    peerId: string;
    peerName: string;
}

export interface PeersListData {
    peers: Array<{
        peerId: string;
        peerName: string;
        joinedAt: string;
    }>;
}

// Participant interface for UI
export interface Participant {
    id: string;
    name: string;
    videoProducer?: types.Producer;
    audioProducer?: types.Producer;
    videoConsumer?: types.Consumer;
    audioConsumer?: types.Consumer;
    videoStream?: MediaStream;
    audioStream?: MediaStream;
}