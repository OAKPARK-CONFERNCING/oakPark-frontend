import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (serverUrl: string = import.meta.env.VITE_BASE_URL) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(true);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Create socket connection
        const newSocket = io(serverUrl, {
            transports: ['websocket', 'polling'],
            autoConnect: true,
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

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
                errorMessage = 'Cannot connect to mediasoup server. Make sure the server is running on localhost:3000';
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
            console.log('Cleaning up socket connection');
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, [serverUrl]);

    const disconnect = () => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setSocket(null);
            setIsConnected(false);
        }
    };

    const reconnect = () => {
        if (socketRef.current) {
            socketRef.current.connect();
        }
    };

    return {
        socket,
        isConnected,
        connectionError,
        isConnecting,
        disconnect,
        reconnect,
    };
};