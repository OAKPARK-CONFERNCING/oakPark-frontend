// components/SignIn.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import closeBtn from '../assets/icons/closeBtn.png';
import GoogleLogo from "../assets/icons/googleLogo.png";
import { addToast } from '../redux/toastSlice';
import { updateUser } from '../redux/userSlice';
import { loginUser } from '../api/apiconfig';
import PasswordReset from './PasswordReset';

interface SignInProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormInputs {
    email: string;
    password: string;
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data: FormInputs) => {
        setIsLoading(true);
        try {
            const result = await loginUser(data.email, data.password);
            if (result.success) {
                // Update user state in Redux
                dispatch(updateUser({
                    name: result.data.user?.name || result.data.firstName + ' ' + result.data.lastName || '',
                    email: result.data.user?.email || data.email,
                }));

                dispatch(addToast({
                    id: Date.now().toString(),
                    message: result.message,
                    type: 'success',
                    open: true,
                }));

                onClose();
                navigate('/dashboard');
            } else {
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: result.message,
                    type: 'error',
                    open: true,
                }));
            }
        } catch {
            dispatch(addToast({
                id: Date.now().toString(),
                message: 'Network error. Please try again.',
                type: 'error',
                open: true,
            }));
        } finally {
            setIsLoading(false);
        }
    };

    // Reset form when modal is closed
    useEffect(() => {
        if (!isOpen) {
            reset();
            setShowPasswordReset(false);
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Transparent overlay (click to close) - completely transparent */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-bg-secondary/36" 
                    onClick={onClose}
                />

                {/* Modal content with opaque white/dark background */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.2,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.25 },
                    }}
                    className="relative z-10 w-xl max-w-3xl rounded-xl bg-[#fbfbfb] shadow md:p-16 p-6 text-text-primary overflow-hidden dark:border-gray-700"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <div className='flex justify-between items-center'>
                            <div>
                                <h3 className='text-2xl font-inter-700 text-text-primary'>Login</h3>
                                <p className='text-xs text-inActive-green font-inter-400'>Authenticate your membership, Gain your quick access</p>
                            </div>
                            <button type="button" onClick={onClose} className='cursor-pointer'>
                                <img src={closeBtn} alt="close" className='size-6' />
                            </button>
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                type="email"
                                id="email"
                                disabled={isLoading}
                                className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                                placeholder="Enter your email address"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                type="password"
                                id="password"
                                disabled={isLoading}
                                className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                                placeholder="Password"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Login'}
                        </button>
                        <p className="text-text-grey uppercase text-center font-inter-400">or</p>
                        <button type="button" className='p-3 border bg-white border-border-color-grey w-full rounded-2xl flex justify-center items-center space-x-2'>
                            <img src={GoogleLogo} className='size-8' alt="google logo" />
                            <span className="font-inter-400">Continue with Google</span>
                        </button>
                        <p 
                            className='cursor-pointer text-text-grey underline font-inter-400 text-right hover:text-medium-green'
                            onClick={() => setShowPasswordReset(true)}
                        >
                            Forget password?
                        </p>
                    </form>
                </motion.div>
            </div>

            {/* Password Reset Modal */}
            <AnimatePresence>
                {showPasswordReset && (
                    <PasswordReset
                        isOpen={showPasswordReset}
                        onClose={() => setShowPasswordReset(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default SignIn;

