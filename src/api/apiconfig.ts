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
}

const api = axios.create({
  baseURL: 'https://video-conferencing-ne35.onrender.com/',  
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
        const response = await api.post('api/refresh');
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
export const createAccount = async (accountData: CreateAccountData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/account/create', accountData);
    return {
      success: true,
      message: 'Account created successfully!',
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.detail || 
                        'Failed to create account. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: error.response?.data
    };
  }
};

export const loginUser = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.data.access_token) {
      localStorage.setItem('authToken', response.data.access_token);
      localStorage.setItem('isAuthenticated', 'true');
    }
    
    return {
      success: true,
      message: 'Login successful!',
      data: response.data
    };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.detail || 
                        'Login failed. Please try again.';
    
    return {
      success: false,
      message: errorMessage,
      data: error.response?.data
    };
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/';
};

export default api;
