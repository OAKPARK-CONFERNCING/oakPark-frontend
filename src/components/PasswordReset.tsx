import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import closeBtn from '../assets/icons/closeBtn.png';
import { addToast } from '../redux/toastSlice';
import { initiatePasswordReset, verifyPasswordResetToken, resetPassword } from '../api/apiconfig';

interface PasswordResetProps {
    isOpen: boolean;
    onClose: () => void;
}

interface EmailFormInputs {
    email: string;
}

interface TokenFormInputs {
    token: string;
}

interface PasswordFormInputs {
    password: string;
    rePassword: string;
}

type StepType = 'email' | 'token' | 'password';

const PasswordReset: React.FC<PasswordResetProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState<StepType>('email');
    const [verifiedEmail, setVerifiedEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const emailForm = useForm<EmailFormInputs>();
    const tokenForm = useForm<TokenFormInputs>();
    const passwordForm = useForm<PasswordFormInputs>();

    // Reset forms when modal is closed
    useEffect(() => {
        if (!isOpen) {
            emailForm.reset();
            tokenForm.reset();
            passwordForm.reset();
            setCurrentStep('email');
            setVerifiedEmail('');
        }
    }, [isOpen, emailForm, tokenForm, passwordForm]);

    const handleEmailSubmit = async (data: EmailFormInputs) => {
        setIsLoading(true);
        try {
            const result = await initiatePasswordReset(data.email);
            if (result.success) {
                setVerifiedEmail(data.email);
                setCurrentStep('token');
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: result.message,
                    type: 'success',
                    open: true,
                }));
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

    const handleTokenSubmit = async (data: TokenFormInputs) => {
        setIsLoading(true);
        try {
            const result = await verifyPasswordResetToken(verifiedEmail, data.token);
            if (result.success) {
                setCurrentStep('password');
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: result.message,
                    type: 'success',
                    open: true,
                }));
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

    const handlePasswordSubmit = async (data: PasswordFormInputs) => {
        if (data.password !== data.rePassword) {
            dispatch(addToast({
                id: Date.now().toString(),
                message: 'Passwords do not match.',
                type: 'error',
                open: true,
            }));
            return;
        }

        setIsLoading(true);
        try {
            const result = await resetPassword(verifiedEmail, data.password, data.rePassword);
            if (result.success) {
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: result.message,
                    type: 'success',
                    open: true,
                }));
                onClose();
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
                message: 'Failed to reset password. Please try again.',
                type: 'error',
                open: true,
            }));
        } finally {
            setIsLoading(false);
        }
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 'email': return 'Reset Password';
            case 'token': return 'Verify Code';
            case 'password': return 'New Password';
            default: return 'Reset Password';
        }
    };

    const getStepDescription = () => {
        switch (currentStep) {
            case 'email': return 'Enter your email to receive a reset code';
            case 'token': return `We've sent a reset code to ${verifiedEmail}`;
            case 'password': return 'Create your new password';
            default: return 'Reset your password';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Transparent overlay */}
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
                className="relative z-10 w-xl max-w-2xl rounded-xl bg-[#fbfbfb] shadow md:p-16 p-6 text-text-primary overflow-hidden dark:border-gray-700"
            >
                {/* Header */}
                <div className='flex justify-between items-center mb-6'>
                    <div>
                        <h3 className='text-2xl font-inter-700 text-text-primary'>{getStepTitle()}</h3>
                        <p className='text-xs text-inActive-green font-inter-400'>{getStepDescription()}</p>
                    </div>
                    <button type="button" onClick={onClose} className='cursor-pointer'>
                        <img src={closeBtn} alt="close" className='size-6' />
                    </button>
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center mb-6">
                    <div className="flex space-x-2">
                        {['email', 'token', 'password'].map((step) => (
                            <div
                                key={step}
                                className={`w-3 h-3 rounded-full ${
                                    currentStep === step || 
                                    (step === 'email' && (currentStep === 'token' || currentStep === 'password')) ||
                                    (step === 'token' && currentStep === 'password')
                                        ? 'bg-medium-green' 
                                        : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                {currentStep === 'email' && (
                    <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-3">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                {...emailForm.register("email", { 
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
                            {emailForm.formState.errors.email && (
                                <p className="text-red-500 text-sm mt-1">{emailForm.formState.errors.email.message}</p>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full disabled:opacity-50"
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Code'}
                        </button>
                    </form>
                )}

                {currentStep === 'token' && (
                    <form onSubmit={tokenForm.handleSubmit(handleTokenSubmit)} className="space-y-3">
                        <div>
                            <label htmlFor="token" className="sr-only">Reset Code</label>
                            <input
                                {...tokenForm.register("token", { 
                                    required: "Reset code is required",
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message: "Please enter a valid 6-digit code"
                                    }
                                })}
                                type="text"
                                id="token"
                                disabled={isLoading}
                                className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full text-center font-inter-400 disabled:opacity-50 text-2xl tracking-widest"
                                placeholder="123456"
                                maxLength={6}
                            />
                            {tokenForm.formState.errors.token && (
                                <p className="text-red-500 text-sm mt-1">{tokenForm.formState.errors.token.message}</p>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full disabled:opacity-50"
                        >
                            {isLoading ? 'Verifying...' : 'Verify Code'}
                        </button>

                        <button 
                            type="button" 
                            onClick={() => setCurrentStep('email')}
                            className="w-full text-medium-green font-inter-400 text-sm underline"
                        >
                            Use different email
                        </button>
                    </form>
                )}

                {currentStep === 'password' && (
                    <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-3">
                        <div>
                            <label htmlFor="password" className="sr-only">New Password</label>
                            <input
                                {...passwordForm.register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                type="password"
                                id="password"
                                disabled={isLoading}
                                className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                                placeholder="New Password"
                            />
                            {passwordForm.formState.errors.password && (
                                <p className="text-red-500 text-sm mt-1">{passwordForm.formState.errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="rePassword" className="sr-only">Confirm Password</label>
                            <input
                                {...passwordForm.register("rePassword", { 
                                    required: "Please confirm your password",
                                    validate: (value) => {
                                        const password = passwordForm.watch('password');
                                        return password === value || 'Passwords do not match';
                                    }
                                })}
                                type="password"
                                id="rePassword"
                                disabled={isLoading}
                                className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                                placeholder="Confirm New Password"
                            />
                            {passwordForm.formState.errors.rePassword && (
                                <p className="text-red-500 text-sm mt-1">{passwordForm.formState.errors.rePassword.message}</p>
                            )}
                        </div>

                        <div className="bg-gray-50 p-3 rounded-2xl">
                            <p className="text-sm text-text-primary font-inter-500 mb-1">Resetting password for:</p>
                            <p className="text-xs text-inActive-green font-inter-400">Email: {verifiedEmail}</p>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full disabled:opacity-50"
                        >
                            {isLoading ? 'Updating Password...' : 'Update Password'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default PasswordReset;
