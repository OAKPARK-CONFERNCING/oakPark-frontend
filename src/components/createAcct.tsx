// components/Crea.tsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import closeBtn from '../assets/icons/closeBtn.png';
import GoogleLogo from "../assets/icons/googleLogo.png";
import { motion } from 'framer-motion';
import { useCreateAccount } from '../hooks/useAuth';

interface CreateAccountProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToSignIn?: () => void; // New prop to handle switching to sign-in
}

interface FormInputs {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ isOpen, onClose, onSwitchToSignIn }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const createAccountMutation = useCreateAccount();

    const onSubmit = (data: FormInputs) => {
        createAccountMutation.mutate(data, {
            onSuccess: (response) => {
                if (response.success) {
                    // Close current modal and switch to sign-in
                    onClose();
                    if (onSwitchToSignIn) {
                        onSwitchToSignIn();
                    }
                }
            }
        });
    };

    // Reset form when modal is closed
    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Transparent overlay (click to close) - completely transparent */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0  bg-bg-secondary/36"
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
            className="relative z-10 w-xl max-w-3xl rounded-xl bg-[#fbfbfb] shadow md:p-16 p-6 text-text-primary overflow-hidden dark:border-gray-700">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className='flex justify-between items-center'>
                        <div>
                            <h3 className='text-2xl font-inter-700 text-text-primary'>Create Account</h3>
                            <p className='text-xs text-inActive-green font-inter-400'>Join our community and get started</p>
                        </div>
                        <button type="button" onClick={onClose} className='cursor-pointer'>
                            <img src={closeBtn} alt="close" className='size-6' />
                        </button>
                    </div>
                    <div>
                        <label htmlFor="firstName" className="sr-only">First Name</label>
                        <input
                            {...register("firstName", { 
                                required: "First name is required",
                                minLength: {
                                    value: 2,
                                    message: "First name must be at least 2 characters"
                                },
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "First name should only contain letters"
                                }
                            })}
                            type="text"
                            id="firstName"
                            className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="First Name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}

                        <label htmlFor="lastName" className="sr-only">Last Name</label>
                        <input
                            {...register("lastName", { 
                                required: "Last name is required",
                                minLength: {
                                    value: 2,
                                    message: "Last name must be at least 2 characters"
                                },
                                pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: "Last name should only contain letters"
                                }
                            })}
                            type="text"
                            id="lastName"
                            className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="Last Name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}

                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            type="email"
                            id="email"
                            className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="Enter your email address"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            {...register("password", { 
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                    message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                }
                            })}
                            type="password"
                            id="password"
                            className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={createAccountMutation.isPending}
                        className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {createAccountMutation.isPending ? 'Creating Account...' : 'Create Account'}
                    </button>
                    <p className="text-text-grey uppercase text-center font-inter-400">or</p>
                    <button type="button" className='p-3 border bg-white border-border-color-grey w-full rounded-2xl flex justify-center items-center space-x-2'>
                        <img src={GoogleLogo} className='size-8' alt="google logo" />
                        <span className="font-inter-400">Continue with Google</span>
                    </button>
                    <p 
                        className='cursor-pointer text-text-grey underline font-inter-400 text-right'
                        onClick={() => {
                            onClose();
                            if (onSwitchToSignIn) {
                                onSwitchToSignIn();
                            }
                        }}
                    >
                        Already have an account? Sign in
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateAccount;

