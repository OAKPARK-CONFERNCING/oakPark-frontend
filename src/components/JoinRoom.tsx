import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import closeBtn from '../assets/icons/closeBtn.png';
import { addToast } from '../redux/toastSlice';
import { useSocket } from '../hooks/useSocket';
import { useMediasoup } from '../hooks/useMediasoup';
import { useUserMedia } from '../hooks/useUserMedia';

interface JoinRoomProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormInputs {
    roomId: string;
    userName: string;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.user);
    
    // Socket and mediasoup hooks
    const { socket, isConnected } = useSocket();
    const { joinRoom, produceMedia } = useMediasoup(socket);
    const { initializeMedia, getVideoTrack, getAudioTrack } = useUserMedia();

    const onSubmit = async (data: FormInputs) => {
        setIsLoading(true);
        const roomId = data.roomId.trim();
        const userName = (data.userName || `${currentUser.firstName} ${currentUser.lastName}`.trim() || 'Anonymous User').trim();
        const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

        // Helper: wait for socket to be ready (up to timeoutMs)
        const waitForSocket = (timeoutMs = 5000) => {
            return new Promise<void>((resolve, reject) => {
                if (socket && isConnected) return resolve();
                const start = Date.now();
                const iv = setInterval(() => {
                    if (socket && (isConnected)) {
                        clearInterval(iv);
                        resolve();
                    } else if (Date.now() - start > timeoutMs) {
                        clearInterval(iv);
                        reject(new Error('Socket connection timed out'));
                    }
                }, 200);
            });
        };

        try {
            dispatch(addToast({ id: Date.now().toString(), message: `Preparing to join ${roomId}...`, type: 'info', open: true }));

            // Wait for socket connection
            await waitForSocket(7000);

            // Initialize local media (camera/mic)
            await initializeMedia();

            // Attempt to join the room on the server
            await joinRoom({ roomId, userId, peerName: userName });

            // Persist room data for the video conference page (fallback)
            localStorage.setItem('roomData', JSON.stringify({ roomId, userName, userId }));

            // Produce media tracks (if available)
            const videoTrack = getVideoTrack();
            const audioTrack = getAudioTrack();

            if (videoTrack) {
                try { await produceMedia(videoTrack); } catch (err) { console.warn('Failed to produce video:', err); }
            }
            if (audioTrack) {
                try { await produceMedia(audioTrack); } catch (err) { console.warn('Failed to produce audio:', err); }
            }

            dispatch(addToast({ id: Date.now().toString(), message: `Joined room ${roomId}`, type: 'success', open: true }));

            onClose();
            reset();

            // Navigate to ongoing route (video conference UI)
            navigate(`/video?roomId=${encodeURIComponent(roomId)}&userName=${encodeURIComponent(userName)}`);
        } catch (error: any) {
            console.error('JoinRoom error:', error);
            dispatch(addToast({ id: Date.now().toString(), message: error?.message || 'Failed to join room', type: 'error', open: true }));
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form when modal is closed
    React.useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-bg-secondary/36" 
                onClick={onClose}
            />

            {/* Modal content */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    duration: 0.4,
                    delay: 0.2,
                    scale: { type: "spring", visualDuration: 0.4, bounce: 0.25 },
                }}
                className="relative z-10 w-xl max-w-md rounded-xl bg-[#fbfbfb] shadow md:p-8 p-6 text-text-primary overflow-hidden dark:border-gray-700"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <h3 className='text-2xl font-inter-700 text-text-primary'>Join Room</h3>
                            <p className='text-xs text-inActive-green font-inter-400'>Enter room details to join the video conference</p>
                        </div>
                        <button type="button" onClick={onClose} className='cursor-pointer'>
                            <img src={closeBtn} alt="close" className='size-6' />
                        </button>
                    </div>

                    <div>
                        <label htmlFor="roomId" className="block text-sm font-inter-500 text-text-primary mb-2">
                            Room ID
                        </label>
                        <input
                            {...register("roomId", { 
                                required: "Room ID is required",
                                minLength: {
                                    value: 3,
                                    message: "Room ID must be at least 3 characters"
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9-_]+$/,
                                    message: "Room ID can only contain letters, numbers, hyphens, and underscores"
                                }
                            })}
                            type="text"
                            id="roomId"
                            disabled={isLoading}
                            className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                            placeholder="Enter room ID (e.g., room-123)"
                        />
                        {errors.roomId && <p className="text-red-500 text-sm mt-1">{errors.roomId.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="userName" className="block text-sm font-inter-500 text-text-primary mb-2">
                            Your Name
                        </label>
                        <input
                            {...register("userName", { 
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                            type="text"
                            id="userName"
                            disabled={isLoading}
                            defaultValue={`${currentUser.firstName} ${currentUser.lastName}`.trim()}
                            className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                            placeholder="Enter your display name"
                        />
                        {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="cursor-pointer font-inter-700 text-white p-3 bg-medium-green rounded-2xl w-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                        >
                            {isLoading ? 'Joining Room...' : 'Join Room'}
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-600 font-inter-400">
                            Make sure you have camera and microphone permissions enabled
                        </p>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default JoinRoom;