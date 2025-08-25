import axios from 'axios';

// Types for API requests and responses
export interface CreateAccountData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  status?: string;
}

export interface RegisterEmailData {
  email: string;
}

export interface VerifyTokenData {
  email: string;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface PasswordResetInitiateData {
  email: string;
}

export interface PasswordResetData {
  email: string;
  password: string;
  rePassword: string;
}

const api = axios.create({

  baseURL: import.meta.env.VITE_BASE_URL,


  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for token refresh and error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 && 
      error.response?.headers['x-refresh-required'] === 'true' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/api/v1/auth/refresh');
        const newToken = response.data.token;
        localStorage.setItem('authToken', newToken);
        api.defaults.headers['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

// API Functions

// Step 1: Register email for signup
export const registerEmail = async (email: string): Promise<ApiResponse> => {
  try {

    const response = await api.post('auth/register', { email });

    return {
      success: true,
      message: response.data.message || 'Verification email sent successfully!',
      data: response.data
    };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Failed to send verification email. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

// Step 2: Verify registration token
export const verifyRegistrationToken = async (email: string, token: string): Promise<ApiResponse> => {
  try {

    const response = await api.post('auth/register/verify', { email, token });
    return {
      success: true,
      message: response.data.message || 'Email verified successfully!',
      data: response.data
    };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Invalid or expired verification code.';

    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

// Step 3: Create account after verification
export const createAccount = async (accountData: CreateAccountData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/api/v1/auth/account/create', accountData);
    
    if (response.data.token || response.data.access_token) {
      const token = response.data.token || response.data.access_token;
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuthenticated', 'true');
    }
    
    return {
      success: true,
      message: response.data.message || 'Account created successfully!',
      data: response.data
    };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Failed to create account. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

// Login user
export const loginUser = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/api/v1/auth/login', { email, password });

    if (response.data.access_token || response.data.token) {
      const token = response.data.access_token || response.data.token;
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuthenticated', 'true');
    }
    
    return {
      success: true,
      message: response.data.message || 'Login successful!',
      data: response.data
    };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Login failed. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

// Initiate password reset
export const initiatePasswordReset = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/api/v1/auth/password/reset/initiate', { email });
    return {
      success: true,
      message: response.data.message || 'Password reset email sent successfully!',
      data: response.data,
      status: response.data.status
    };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Failed to send password reset email.';
    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

// Verify password reset token
export const verifyPasswordResetToken = async (email: string, token: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/api/v1/auth/password/reset/verify', { email, token });
    return {
      success: true,
      message: response.data.message || 'Token verified successfully!',
      data: response.data,
      status: response.data.status
    };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Invalid or expired token.';
    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

// Reset password
export const resetPassword = async (email: string, password: string, rePassword: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/api/v1/auth/password/reset', { email, password, rePassword });
    return {
      success: response.data.success !== false,
      message: response.data.message || 'Password updated successfully!',
      data: response.data
    };
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Failed to reset password.';
    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/';
};

// Google OAuth Functions
export const initiateGoogleAuth = (): void => {
  const googleOAuthURL = import.meta.env.VITE_GOOGLE_OAUTH_URL;
  
  if (!googleOAuthURL) {
    console.error('Google OAuth URL not configured');
    return;
  }
  
  // Store the current URL to redirect back after authentication
  localStorage.setItem('preAuthUrl', window.location.pathname);
  
  // Redirect to Google OAuth
  window.location.href = googleOAuthURL;
};

export const handleGoogleCallback = async (code: string): Promise<ApiResponse> => {
  try {
    // Submit the auth code to the userdata endpoint
    const response = await api.post('/api/v1/auth/google/userdata', { authToken: code });
    
    if (response.data.access_token) {
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('isAuthenticated', 'true');
    }
    
    return {
      success: true,
      message: 'Google authentication successful!',
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.detail || 
                        'Google authentication failed. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: error.response?.data
    };
  }
};

// Function to get user data using auth token (commented out for testing)
export const getUserDataWithToken = async (authToken: string): Promise<ApiResponse> => {
  try {
    // Commented out for testing - keeping for later use
    // const response = await api.post('/api/v1/auth/google/userdata', { authToken: authToken });
    
    // For testing purposes, just return success without API call
    // if (response.data.access_token || response.data.token) {
    //   const token = response.data.access_token || response.data.token;
    //   localStorage.setItem('authToken', token);
    //   localStorage.setItem('isAuthenticated', 'true');
    // }
    
    // Store the token directly for testing
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('isAuthenticated', 'true');
    
    return {
      success: true,
      message: 'User data retrieved successfully!',
      data: { token: authToken } // Return the token for testing
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.detail || 
                        'Failed to retrieve user data. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: error.response?.data
    };
  }
};

export default api;
