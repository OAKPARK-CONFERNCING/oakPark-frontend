// components/Crea.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import closeBtn from '../assets/icons/closeBtn.png';
import GoogleLogo from "../assets/icons/googleLogo.png";
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/toastSlice';

interface CreateAccountProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormInputs {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ isOpen, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data: FormInputs) => {
        console.log(data);
        // Handle form submission here
        dispatch(addToast({
            id: Date.now().toString(),
            message: 'Account created successfully!',
            type: 'success',
            open: true,
        }));
        
        // Close the modal and navigate to dashboard
        onClose();
        navigate('/dashboard');
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
                            {...register("firstName", { required: "First name is required" })}
                            type="text"
                            id="firstName"
                            className="bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="FirstName"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}

                        <label htmlFor="lastName" className="sr-only">Last Name</label>
                        <input
                            {...register("lastName", { required: "Last name is required" })}
                            type="text"
                            id="lastName"
                            className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="Lastname"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}

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
                            className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
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
                            className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-[#cccccc] focus:ring-0 focus:border-[#cccccc] p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button type="submit" className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full">
                        Create Account
                    </button>
                    <p className="text-text-grey uppercase text-center font-inter-400">or</p>
                    <button type="button" className='p-3 border bg-white border-border-color-grey w-full rounded-2xl flex justify-center items-center space-x-2'>
                        <img src={GoogleLogo} className='size-8' alt="google logo" />
                        <span className="font-inter-400">Continue with Google</span>
                    </button>
                    <p className='cursor-pointer text-text-grey underline font-inter-400 text-right'>Already have an account? Sign in</p>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateAccount;

