import { useMutation } from '@tanstack/react-query';
import { createAccount, loginUser, CreateAccountData } from '../api/apiconfig';
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/toastSlice';
import { useNavigate } from 'react-router-dom';

export const useCreateAccount = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (accountData: CreateAccountData) => createAccount(accountData),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(addToast({
          id: Date.now().toString(),
          message: data.message || 'Account created successfully! Please sign in to continue.',
          type: 'success',
          open: true,
        }));
        
        // The component will handle the modal switching logic
      } else {
        dispatch(addToast({
          id: Date.now().toString(),
          message: data.message || 'Failed to create account',
          type: 'error',
          open: true,
        }));
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.detail || 
                          error?.message || 
                          'An unexpected error occurred. Please try again.';
      
      dispatch(addToast({
        id: Date.now().toString(),
        message: errorMessage,
        type: 'error',
        open: true,
      }));
    },
  });
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      loginUser(email, password),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(addToast({
          id: Date.now().toString(),
          message: data.message || 'Login successful!',
          type: 'success',
          open: true,
        }));
        
        navigate('/dashboard');
      } else {
        dispatch(addToast({
          id: Date.now().toString(),
          message: data.message || 'Login failed',
          type: 'error',
          open: true,
        }));
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.detail || 
                          error?.message || 
                          'Login failed. Please try again.';
      
      dispatch(addToast({
        id: Date.now().toString(),
        message: errorMessage,
        type: 'error',
        open: true,
      }));
    },
  });
};
