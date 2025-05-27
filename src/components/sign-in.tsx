// components/SignIn.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import closeBtn from '../assets/icons/closeBtn.png';
import GoogleLogo from "../assets/icons/googleLogo.png";

interface SignInProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Transparent overlay (click to close) - completely transparent */}
            <div
                className="absolute inset-0 bg-bg-secondary/36"
                onClick={onClose}
            />

            {/* Modal content with opaque white/dark background */}
            <div className="relative z-10 w-xl max-w-3xl rounded-xl bg-[#fbfbfb] shadow md:p-16 p-6 text-text-primary overflow-hidden dark:border-gray-700">
                <div className=" space-y-3">
                    <div className='flex justify-between items-center'>
                        <div>
                            <h3 className='text-2xl font-inter-700 text-text-primary'>Login</h3>
                            <p className='text-xs text-inActive-green font-inter-400'>Authenticate your membership, Gain your quick access</p>
                        </div>
                        <button onClick={onClose} className='cursor-pointer'>
                            <img src={closeBtn} alt="close" className='size-6' />
                        </button>
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            name="Email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white border-2 border-[#cccccc] focus:outline-none focus:ring-0 focus:border-none  p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="Enter your email address"
                        />


                        <label htmlFor="password" className="sr-only 0 4">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 bg-white border-2 border-[#cccccc] focus:outline-none focus:ring-0 focus:border-none  p-3 rounded-2xl w-full indent-3 font-inter-400"
                            placeholder="Password"
                        />
                    </div>
                    <Link to="/dashboard">
                        <button type='submit' className="cursor-pointer font-inter-400 text-white p-3 mb-3 bg-medium-green rounded-2xl w-full">
                            Login
                        </button>
                    </Link>
                    <p className="text-text-grey uppercase text-center font-inter-400">or</p>
                    <button className='p-3 border bg-white border-border-color-grey w-full rounded-2xl flex justify-center items-center space-x-2'>
                        <img src={GoogleLogo} className='size-8' alt="google logo" />
                        <span className="font-inter-400">Continue with Google</span>
                    </button>
                    <p className='cursor-pointer text-text-grey underline font-inter-400 text-right'>Forget password?</p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;

