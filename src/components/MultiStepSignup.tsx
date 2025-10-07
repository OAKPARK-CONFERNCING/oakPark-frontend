import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import closeBtn from '../assets/icons/closeBtn.png';
import GoogleLogo from "../assets/icons/googleLogo.png";
import { addToast } from '../redux/toastSlice';
import { updateUser } from '../redux/userSlice';
import { registerEmail, verifyRegistrationToken, createAccount, initiateGoogleAuth } from '../api/apiconfig';

interface MultiStepSignupProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignIn?: () => void;
}

interface EmailFormInputs {
    email: string;
}

interface TokenFormInputs {
    token: string;
}

interface AccountFormInputs {
    firstName: string;
    lastName: string;
    password: string;
}

type StepType = 'email' | 'token' | 'account';

const MultiStepSignup: React.FC<MultiStepSignupProps> = ({ isOpen, onClose, onSwitchToSignIn }) => {
    const [currentStep, setCurrentStep] = useState<StepType>('email');
    const [verifiedEmail, setVerifiedEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const emailForm = useForm<EmailFormInputs>();
    const tokenForm = useForm<TokenFormInputs>();
    const accountForm = useForm<AccountFormInputs>();

    // Reset forms when modal is closed
    useEffect(() => {
        if (!isOpen) {
            emailForm.reset();
            tokenForm.reset();
            accountForm.reset();
            setCurrentStep('email');
            setVerifiedEmail('');
        }
    }, [isOpen, emailForm, tokenForm, accountForm]);

    const handleEmailSubmit = async (data: EmailFormInputs) => {
        setIsLoading(true);
        try {
            const result = await registerEmail(data.email);
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
            const result = await verifyRegistrationToken(verifiedEmail, data.token);
            if (result.success) {
                setCurrentStep('account');
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

    const handleAccountSubmit = async (data: AccountFormInputs) => {
        setIsLoading(true);
        try {
            const accountData = {
                email: verifiedEmail,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password
            };

            const result = await createAccount(accountData);
            if (result.success) {
                // Extract user data from the response
                const userData = result.data?.data?.userData || result.data?.data?.user || result.data?.user;
                
                if (userData) {
                    // Update user state in Redux with actual response data
                    dispatch(updateUser({
                        firstName: userData.firstName || userData.first_name || data.firstName,
                        lastName: userData.lastName || userData.last_name || data.lastName,
                        email: userData.email || verifiedEmail,
                    }));
                    
                    console.log("MultiStepSignup - Updated Redux with user data:", userData);
                } else {
                    // Fallback to form data if no response userData
                    dispatch(updateUser({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: verifiedEmail,
                    }));
                    
                    console.log("MultiStepSignup - No user data in response, using form data");
                }

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
                message: 'Failed to create account. Please try again.',
                type: 'error',
                open: true,
            }));
        } finally {
            setIsLoading(false);
        }
    };

     const handleGoogleAuth = () => {
            try {
                initiateGoogleAuth();
            } catch (error) {
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: 'Failed to initiate Google authentication. Please try again.',
                    type: 'error',
                    open: true,
                }));
            }
        };
    const getStepTitle = () => {
        switch (currentStep) {
            case 'email': return 'Create Account';
            case 'token': return 'Verify Email';
            case 'account': return 'Complete Registration';
            default: return 'Create Account';
        }
    };

    const getStepDescription = () => {
        switch (currentStep) {
            case 'email': return 'Enter your email to get started';
            case 'token': return `We've sent a verification code to ${verifiedEmail}`;
            case 'account': return 'Complete your account details';
            default: return 'Join our community and get started';
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
                className="relative z-10 w-xl max-w-3xl rounded-xl bg-[#fbfbfb] shadow md:p-16 p-6 text-text-primary overflow-hidden dark:border-gray-700"
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
                        {['email', 'token', 'account'].map((step) => (
                            <div
                                key={step}
                                className={`w-3 h-3 rounded-full ${
                                    currentStep === step || 
                                    (step === 'email' && (currentStep === 'token' || currentStep === 'account')) ||
                                    (step === 'token' && currentStep === 'account')
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
                            {isLoading ? 'Sending...' : 'Send Verification Code'}
                        </button>

                        <p className="text-text-grey uppercase text-center font-inter-400">or</p>
                        <button onClick={handleGoogleAuth} type="button" className='p-3 border cursor-pointer bg-white border-border-color-grey w-full rounded-2xl flex justify-center items-center space-x-2'>
                            <img src={GoogleLogo} className='size-8' alt="google logo" />
                            <span className="font-inter-400">Continue with Google</span>
                        </button>
                    </form>
                )}

                {currentStep === 'token' && (
                    <form onSubmit={tokenForm.handleSubmit(handleTokenSubmit)} className="space-y-3">
                        <div>
                            <label htmlFor="token" className="sr-only">Verification Code</label>
                            <input
                                {...tokenForm.register("token", { 
                                    required: "Verification code is required",
                                    minLength: {
                                        value: 6,
                                        message: "Verification code must be 6 characters"
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: "Verification code must be 6 characters"
                                    }
                                })}
                                type="text"
                                id="token"
                                disabled={isLoading}
                                className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full text-center font-inter-400 disabled:opacity-50 text-2xl tracking-widest"
                                placeholder="ABC123"
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

                {currentStep === 'account' && (
                    <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)} className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="firstName" className="sr-only">First Name</label>
                                <input
                                    {...accountForm.register("firstName", { required: "First name is required" })}
                                    type="text"
                                    id="firstName"
                                    disabled={isLoading}
                                    className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                                    placeholder="First Name"
                                />
                                {accountForm.formState.errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{accountForm.formState.errors.firstName.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="sr-only">Last Name</label>
                                <input
                                    {...accountForm.register("lastName", { required: "Last name is required" })}
                                    type="text"
                                    id="lastName"
                                    disabled={isLoading}
                                    className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400 disabled:opacity-50"
                                    placeholder="Last Name"
                                />
                                {accountForm.formState.errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{accountForm.formState.errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                {...accountForm.register("password", { 
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
                                placeholder="Password"
                            />
                            {accountForm.formState.errors.password && (
                                <p className="text-red-500 text-sm mt-1">{accountForm.formState.errors.password.message}</p>
                            )}
                        </div>

                        <div className="bg-gray-50 p-3 rounded-2xl">
                            <p className="text-sm text-text-primary font-inter-500 mb-1">Account Details:</p>
                            <p className="text-xs text-inActive-green font-inter-400">Email: {verifiedEmail}</p>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full disabled:opacity-50"
                        >
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                )}

                {currentStep !== 'account' && (
                    <button 
                        className='cursor-pointer text-text-grey underline font-inter-400 text-right mt-3 hover:text-medium-green'
                        onClick={() => {
                            if (onSwitchToSignIn) {
                                onSwitchToSignIn();
                            }
                        }}
                    >
                        Already have an account? Sign in
                    </button>
                )}
            </motion.div>
        </div>
    );
};

export default MultiStepSignup;
