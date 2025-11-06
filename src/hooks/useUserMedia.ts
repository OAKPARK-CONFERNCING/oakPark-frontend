import { useState, useEffect, useRef, useCallback } from 'react';

export const useUserMedia = () => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [mediaError, setMediaError] = useState<string | null>(null);
    const [isInitializing, setIsInitializing] = useState(false);
    const streamRef = useRef<MediaStream | null>(null);

    const initializeMedia = useCallback(async () => {
        // If stream already exists, return it
        if (streamRef.current) {
            console.log('[useUserMedia] Stream already exists, returning existing stream');
            return streamRef.current;
        }

        setIsInitializing(true);
        setMediaError(null);

        try {
            console.log('[useUserMedia] Requesting user media...');
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

            console.log('[useUserMedia] Successfully obtained user media');
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
    }, []); // No dependencies - function is stable

    const toggleVideo = useCallback(() => {
        if (streamRef.current) {
            const videoTracks = streamRef.current.getVideoTracks();
            videoTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsVideoEnabled(prev => !prev);
        }
    }, []);

    const toggleAudio = useCallback(() => {
        if (streamRef.current) {
            const audioTracks = streamRef.current.getAudioTracks();
            audioTracks.forEach(track => {
                track.enabled = !track.enabled;
            });
            setIsAudioEnabled(prev => !prev);
        }
    }, []);

    const stopMedia = useCallback(() => {
        if (streamRef.current) {
            console.log('[useUserMedia] Stopping media stream');
            streamRef.current.getTracks().forEach(track => {
                track.stop();
            });
            streamRef.current = null;
            setLocalStream(null);
        }
    }, []);

    const getVideoTrack = useCallback(() => {
        return streamRef.current?.getVideoTracks()[0] || null;
    }, []);

    const getAudioTrack = useCallback(() => {
        return streamRef.current?.getAudioTracks()[0] || null;
    }, []);

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