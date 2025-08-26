// components/GoogleCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleGoogleCallback } from '../api/apiconfig';
import { addToast } from '../redux/toastSlice';
import { updateUser } from '../redux/userSlice';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const processCallback = async () => {
            const code = searchParams.get('code');
            const token = searchParams.get('token');
            const access_token = searchParams.get('access_token');
            const error = searchParams.get('error');

            if (error) {
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: 'Google authentication was cancelled or failed.',
                    type: 'error',
                    open: true,
                }));
                navigate('/');
                return;
            }

            // If backend sends token directly (store directly)
            if (token || access_token) {
                const authToken = token || access_token;
                
                if (!authToken) {
                    dispatch(addToast({
                        id: Date.now().toString(),
                        message: 'No valid authentication token received.',
                        type: 'error',
                        open: true,
                    }));
                    navigate('/dashboard');
                    return;
                }

                // Store the token directly
                localStorage.setItem('authToken', authToken);
                localStorage.setItem('isAuthenticated', 'true');
                
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: 'Google authentication successful!',
                    type: 'success',
                    open: true,
                }));
                
                // Redirect to dashboard
                // const preAuthUrl = localStorage.getItem('preAuthUrl') || '/dashboard';
                // localStorage.removeItem('preAuthUrl');
                // navigate(preAuthUrl);
                navigate('/dashboard')
                return;
            }

            // If backend sends code (needs to be exchanged)
            if (!code) {
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: 'No authorization code or token received.',
                    type: 'error',
                    open: true,
                }));
                navigate('/'); // Redirect to home, not dashboard
                return;
            }

            try {
                const result = await handleGoogleCallback(code);
                
                if (result.success) {
                    // Extract user data from the response if available
                    const userData = result.data?.data?.userData || result.data?.data?.user || result.data?.user;
                    
                    if (userData) {
                        // Update user state in Redux with actual response data
                        dispatch(updateUser({
                            firstName: userData.firstName || userData.first_name || '',
                            lastName: userData.lastName || userData.last_name || '',
                            email: userData.email || '',
                        }));
                        
                        console.log("GoogleCallback - Updated Redux with user data:", userData);
                    } else {
                        console.log("GoogleCallback - No user data in response:", result.data);
                    }
                    
                    dispatch(addToast({
                        id: Date.now().toString(),
                        message: result.message,
                        type: 'success',
                        open: true,
                    }));
                    
                    // Redirect to dashboard on success
                    navigate('/dashboard');
                } else {
                    dispatch(addToast({
                        id: Date.now().toString(),
                        message: result.message,
                        type: 'error',
                        open: true,
                    }));
                    navigate('/');
                }
            } catch (error) {
                dispatch(addToast({
                    id: Date.now().toString(),
                    message: 'An unexpected error occurred during authentication.',
                    type: 'error',
                    open: true,
                }));
                navigate('/');
            }
        };

        processCallback();
    }, [searchParams, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medium-green mx-auto"></div>
                <p className="mt-4 text-lg text-gray-600">Processing authentication...</p>
            </div>
        </div>
    );
};

export default GoogleCallback;
