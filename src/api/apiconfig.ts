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

    const response = await api.post('/api/v1/auth/register', { email });

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

    const response = await api.post('/api/v1/auth/register/verify', { email, token });
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
    
    console.log("createAccount response:", response.data); // Debug log
    
    // Check for token in multiple possible locations
    const token = response.data.data?.token || 
                  response.data.access_token || 
                  response.data.token;

    if (token) {
      console.log("Setting authToken:", token); // Debug log
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Store user data in localStorage for Redux
      const userDataFromResponse = response.data.data?.userData || response.data.data?.user || accountData;
      if (userDataFromResponse) {
        localStorage.setItem('userData', JSON.stringify(userDataFromResponse));
      }
      
      console.log("Auth state set - isAuthenticated:", localStorage.getItem('isAuthenticated')); // Debug log
    } else {
      console.log("No token received in createAccount response"); // Debug log
      console.log("Full response structure:", JSON.stringify(response.data, null, 2)); // Debug log
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

    console.log("loginUser response:", response.data); // Debug log

    // Check for token in multiple possible locations
    const token = response.data.data?.token || 
                  response.data.access_token || 
                  response.data.token;

    if (token) {
      console.log("Setting authToken from login:", token); // Debug log
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuthenticated', 'true');
      
      // Store user data in localStorage for Redux
      if (response.data.data?.userData) {
        localStorage.setItem('userData', JSON.stringify(response.data.data.userData));
      }
      
      console.log("Auth state set from login - isAuthenticated:", localStorage.getItem('isAuthenticated')); // Debug log
    } else {
      console.log("No token received in login response"); // Debug log
      console.log("Full response structure:", JSON.stringify(response.data, null, 2)); // Debug log
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
    console.log("handleGoogleCallback called with code:", code); // Debug log
    // Submit the auth code to the userdata endpoint
    const response = await api.post('/api/v1/auth/google/userdata', { authToken: code });
    
    console.log("Google OAuth response:", response.data); // Debug log
    
    // Check for token in multiple possible locations
    const token = response.data.data?.token || 
                  response.data.data.accessToken || 
                  response.data.token;

    if (token) {
      console.log("Setting authToken from Google OAuth:", token); // Debug log
      localStorage.setItem('authToken', token);
      localStorage.setItem('isAuthenticated', 'true');
      console.log("Auth state set from Google - isAuthenticated:", localStorage.getItem('isAuthenticated')); // Debug log
    } else {
      console.log("No access_token received in Google OAuth response"); // Debug log
      console.log("Full response structure:", JSON.stringify(response.data, null, 2)); // Debug log
    }
    
    return {
      success: true,
      message: 'Google authentication successful!',
      data: response.data
    };
  } catch (error: any) {
    console.error("Google OAuth error:", error); // Debug log
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

// Get rooms with optional status filter
export const getRooms = async (status?: 'ongoing' | 'ended'): Promise<ApiResponse> => {
  try {
    const params = status ? { status } : {};
    const response = await api.get('/api/v1/rooms', { params });
    
    return {
      success: true,
      message: 'Rooms fetched successfully!',
      data: response.data
    };
    console.log("getRooms response:", response.data); // Debug log
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string; detail?: string } } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Failed to fetch rooms. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: axiosError.response?.data
    };
  }
};

// Create a new room
export interface CreateRoomData {
  title: string;
  description: string;
  tag: string;
  durationInSeconds: number; // in seconds
  roomImage?: string;
  isPrivateRoom?: boolean;
  startTime?: string; // ISO string
}

export interface CreateRoomResponse {
  _id: string;
  title: string;
  description: string;
  banner?: string;
  host: string;
  roomCode: string;
}

export const createRoom = async (roomData: CreateRoomData): Promise<ApiResponse<CreateRoomResponse>> => {
  try {
    const response = await api.post('/api/v1/rooms/create', roomData);
    
    return {
      success: true,
      message: response.data.message || 'Room created successfully!',
      data: response.data.data
    };
  } catch (error: unknown) {
    console.error("Create room error:", error); // Debug log
    const axiosError = error as { response?: { data?: any } };
    const errorMessage = axiosError.response?.data?.message || 
                        axiosError.response?.data?.detail || 
                        'Failed to create room. Please try again.';
    
    return {
      success: false,
      message: errorMessage
    };
    
  }
};

export default api;
