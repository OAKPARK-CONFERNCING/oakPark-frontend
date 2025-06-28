import { useState, useEffect, useRef, useCallback } from 'react';

interface UseWebcamReturn {
  stream: MediaStream | null;
  isStreaming: boolean;
  error: string | null;
  startStream: () => Promise<void>;
  stopStream: () => void;
  toggleStream: () => Promise<void>;
  hasPermission: boolean;
  isRequesting: boolean;
}

export const useWebcam = (): UseWebcamReturn => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  // Check if browser supports getUserMedia
  const isSupported = typeof navigator !== 'undefined' && 
    typeof navigator.mediaDevices !== 'undefined' && 
    typeof navigator.mediaDevices.getUserMedia !== 'undefined';

  const startStream = useCallback(async () => {
    if (!isSupported) {
      setError('Webcam is not supported in this browser');
      return;
    }

    if (isStreaming) {
      return; // Already streaming
    }

    setIsRequesting(true);
    setError(null);

    try {
      // Request video and audio permissions
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Use front camera
        },
        audio: true
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setIsStreaming(true);
      setHasPermission(true);
    } catch (err) {
      console.error('Error accessing webcam:', err);
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Camera permission denied. Please allow camera access and try again.');
        } else if (err.name === 'NotFoundError') {
          setError('No camera found on this device.');
        } else if (err.name === 'NotReadableError') {
          setError('Camera is already in use by another application.');
        } else {
          setError(`Camera error: ${err.message}`);
        }
      } else {
        setError('Failed to access camera. Please check your camera permissions.');
      }
      setHasPermission(false);
    } finally {
      setIsRequesting(false);
    }
  }, [isStreaming, isSupported]);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      // Stop all tracks in the stream
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    setStream(null);
    setIsStreaming(false);
  }, []);

  const toggleStream = useCallback(async () => {
    if (isStreaming) {
      stopStream();
    } else {
      await startStream();
    }
  }, [isStreaming, startStream, stopStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopStream();
    };
  }, [stopStream]);

  return {
    stream,
    isStreaming,
    error,
    startStream,
    stopStream,
    toggleStream,
    hasPermission,
    isRequesting
  };
}; 