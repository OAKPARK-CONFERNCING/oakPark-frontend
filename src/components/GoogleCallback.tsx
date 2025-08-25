// components/GoogleCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handleGoogleCallback, getUserDataWithToken } from '../api/apiconfig';
import { addToast } from '../redux/toastSlice';

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

            // If backend sends token directly (send to userdata endpoint)
            if (token || access_token) {
                const authToken = token || access_token;
                
                if (!authToken) {
                    dispatch(addToast({
                        id: Date.now().toString(),
                        message: 'No valid authentication token received.',
                        type: 'error',
                        open: true,
                    }));
                    navigate('/');
                    return;
                }

                try {
                    const result = await getUserDataWithToken(authToken);
                    
                    if (result.success) {
                        dispatch(addToast({
                            id: Date.now().toString(),
                            message: 'Google authentication successful!',
                            type: 'success',
                            open: true,
                        }));
                        
                        // Redirect to dashboard
                        const preAuthUrl = localStorage.getItem('preAuthUrl') || '/dashboard';
                        localStorage.removeItem('preAuthUrl');
                        navigate(preAuthUrl);
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
                        message: 'Failed to authenticate with Google. Please try again.',
                        type: 'error',
                        open: true,
                    }));
                    navigate('/');
                }
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
                navigate('/');
                return;
            }

            try {
                const result = await handleGoogleCallback(code);
                
                if (result.success) {
                    dispatch(addToast({
                        id: Date.now().toString(),
                        message: result.message,
                        type: 'success',
                        open: true,
                    }));
                    
                    // Redirect to the page they were on before auth, or dashboard
                    const preAuthUrl = localStorage.getItem('preAuthUrl') || '/dashboard';
                    localStorage.removeItem('preAuthUrl');
                    navigate(preAuthUrl);
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
