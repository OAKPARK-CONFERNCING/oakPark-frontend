import { useState, useEffect, useRef } from 'react';

export const useUserMedia = () => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [mediaError, setMediaError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);

    const initializeMedia = async () => {
        if (streamRef.current) {
            return streamRef.current;
        }

        setIsInitializing(true);
        setMediaError(null);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    frameRate: { ideal: 30 }
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            streamRef.current = stream;
            setLocalStream(stream);
            setIsInitializing(false);
            return stream;
        } catch (error) {
            console.error('Failed to access user media:', error);
            setMediaError(`Failed to access camera/microphone: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setIsInitializing(false);
            throw error;
        }
    };

    const toggleVideo = () => {
        if (streamRef.current) {
            const videoTracks = streamRef.current.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoEnabled(!isVideoEnabled);
        }
    };

    const toggleAudio = () => {
        if (streamRef.current) {
            const audioTracks = streamRef.current.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsAudioEnabled(!isAudioEnabled);
        }
    };

    const stopMedia = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            streamRef.current = null;
            setLocalStream(null);
        }
    };

    const getVideoTrack = () => {
        return streamRef.current?.getVideoTracks()[0] || null;
    };

    const getAudioTrack = () => {
        return streamRef.current?.getAudioTracks()[0] || null;
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopMedia();
        };
    }, []);

    // Update enabled states when tracks change
    useEffect(() => {
        if (streamRef.current) {
            const videoTrack = streamRef.current.getVideoTracks()[0];
            const audioTrack = streamRef.current.getAudioTracks()[0];

            if (videoTrack) {
                setIsVideoEnabled(videoTrack.enabled);
            }
            if (audioTrack) {
                setIsAudioEnabled(audioTrack.enabled);
            }
        }
    }, [localStream]);

    return {
        localStream,
        isVideoEnabled,
        isAudioEnabled,
        mediaError,
        isInitializing,
        initializeMedia,
        toggleVideo,
        toggleAudio,
        stopMedia,
        getVideoTrack,
        getAudioTrack,
    };
};