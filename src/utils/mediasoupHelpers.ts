// Utility functions for mediasoup video conferencing

/**
 * Check if the browser supports the required WebRTC features for mediasoup
 */
export const checkBrowserSupport = (): boolean => {
    try {
        // Check for basic WebRTC support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('getUserMedia is not supported');
            return false;
        }

        if (!window.RTCPeerConnection) {
            console.error('RTCPeerConnection is not supported');
            return false;
        }

        if (!window.RTCSessionDescription) {
            console.error('RTCSessionDescription is not supported');
            return false;
        }

        if (!window.RTCIceCandidate) {
            console.error('RTCIceCandidate is not supported');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error checking browser support:', error);
        return false;
    }
};

/**
 * Get user-friendly error messages for common mediasoup errors
 */
export const getErrorMessage = (error: Error): string => {
    const message = error.message.toLowerCase();

    if (message.includes('permission denied') || message.includes('notallowed')) {
        return 'Camera/microphone access denied. Please allow access and try again.';
    }

    if (message.includes('notfound')) {
        return 'No camera or microphone found. Please connect a device and try again.';
    }

    if (message.includes('notreadable') || message.includes('tracking')) {
        return 'Camera/microphone is already in use by another application.';
    }

    if (message.includes('overconstrained')) {
        return 'Camera/microphone constraints could not be satisfied.';
    }

    if (message.includes('network') || message.includes('connection')) {
        return 'Network connection failed. Please check your internet connection.';
    }

    if (message.includes('device not initialized')) {
        return 'Unable to initialize media device. Please refresh and try again.';
    }

    if (message.includes('transport') || message.includes('producer') || message.includes('consumer')) {
        return 'Media connection failed. Please try rejoining the room.';
    }

    return `An error occurred: ${error.message}`;
};

/**
 * Generate a unique user ID
 */
export const generateUserId = (): string => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate room ID format
 */
export const isValidRoomId = (roomId: string): boolean => {
    // Room ID should be alphanumeric and between 3-50 characters
    return /^[a-zA-Z0-9_-]{3,50}$/.test(roomId.trim());
};

/**
 * Validate participant name
 */
export const isValidParticipantName = (name: string): boolean => {
    // Name should be 1-30 characters, no special characters except spaces
    return /^[a-zA-Z0-9\s]{1,30}$/.test(name.trim());
};

/**
 * Format participant count for display
 */
export const formatParticipantCount = (count: number): string => {
    if (count === 0) return 'No participants';
    if (count === 1) return '1 participant';
    return `${count} participants`;
};

/**
 * Get video resolution constraints based on connection quality
 */
export const getVideoConstraints = (quality: 'low' | 'medium' | 'high' = 'medium') => {
    const constraints = {
        low: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 15 }
        },
        medium: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
        },
        high: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 }
        }
    };

    return constraints[quality];
};

/**
 * Get audio constraints for optimal quality
 */
export const getAudioConstraints = () => {
    return {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 48000,
        channelCount: 1
    };
};

/**
 * Check if the device is likely mobile
 */
export const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Get optimal grid layout for given participant count
 */
export const getGridLayout = (participantCount: number): { columns: number; rows: number } => {
    if (participantCount <= 1) return { columns: 1, rows: 1 };
    if (participantCount <= 4) return { columns: 2, rows: 2 };
    if (participantCount <= 6) return { columns: 2, rows: 3 };
    if (participantCount <= 9) return { columns: 3, rows: 3 };
    if (participantCount <= 12) return { columns: 3, rows: 4 };
    return { columns: 4, rows: 4 }; // Max 16 participants
};

/**
 * Debounce function for preventing rapid successive calls
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: number;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait) as any;
    };
};