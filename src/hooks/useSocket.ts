import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (serverUrl: string = import.meta.env.VITE_BASE_URL) => {
    // Use ref to store socket instance - this persists across re-renders without causing re-initialization
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(true);
    const hasInitializedRef = useRef(false);

    useEffect(() => {
        // Only create socket once
        if (hasInitializedRef.current && socketRef.current) {
            console.log('Socket already initialized, skipping:', socketRef.current.id);
            return;
        }

        // Prevent double initialization in React StrictMode
        if (socketRef.current) {
            console.log('Socket instance already exists, skipping initialization');
            return;
        }

        hasInitializedRef.current = true;
        console.log('Creating new socket connection to:', serverUrl);

        // Create socket connection
        const newSocket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current = newSocket;

        // Connection event handlers
        newSocket.on('connect', () => {
            console.log('Socket connected:', newSocket.id);
            setIsConnected(true);
            setIsConnecting(false);
            setConnectionError(null);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
            setIsConnected(false);
            setIsConnecting(false);
        });

        newSocket.on('connect_error', (error) => {
            console.error('Socket connection failed:', error);
            setIsConnecting(false);

            // Provide more specific error messages based on error type
            let errorMessage = 'Connection failed';
            if (error.message.includes('server') || error.message.includes('ECONNREFUSED')) {
                errorMessage = 'Cannot connect to mediasoup server. Make sure the server is running';
            } else if (error.message.includes('timeout')) {
                errorMessage = 'Connection timed out. Check your network connection';
            } else {
                errorMessage = `Connection failed: ${error.message}`;
            }

            setConnectionError(errorMessage);
            setIsConnected(false);
        });

        // Cleanup on unmount
        return () => {
            console.log('useSocket cleanup called - component unmounting');
            const s = socketRef.current;
            if (s) {
                // Only log id if available (socket may not have assigned id yet)
                console.log('Disconnecting socket:', s.id ?? '<no-id>');
                try {
                    s.removeAllListeners();
                } catch (e) {
                    console.warn('Failed to remove listeners from socket', e);
                }
                try {
                    // Disconnect only if not already disconnected
                    if ((s as any).connected !== false) {
                        s.disconnect();
                    }
                } catch (e) {
                    console.warn('Error while disconnecting socket', e);
                }
                socketRef.current = null;
                hasInitializedRef.current = false;
            }
        };
    }, [serverUrl]);

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            console.log('Manually disconnecting socket');
            socketRef.current.disconnect();
            socketRef.current = null;
            setIsConnected(false);
            hasInitializedRef.current = false;
        }
    }, []);

    const reconnect = useCallback(() => {
        if (socketRef.current) {
            console.log('Manually reconnecting socket');
            socketRef.current.connect();
        }
    }, []);

    // Memoize the return object to prevent infinite re-renders
    // Only update when the actual connection state changes
    return useMemo(() => ({
        socket: socketRef.current,
        isConnected,
        connectionError,
        isConnecting,
        disconnect,
        reconnect,
    }), [isConnected, connectionError, isConnecting, disconnect, reconnect]);
};