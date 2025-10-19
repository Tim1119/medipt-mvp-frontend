// src/api/base_api.ts
import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, REFRESH_TOKEN_ENDPOINT } from './endpoints';
import { store } from '@/app/store';
import { setTokens, clearAuthState } from '@/features/auth/authSlice';

/**
 * Public Axios Instance
 * For unauthenticated requests (login, signup, etc.)
 */
export const publicAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Private Axios Instance
 * For authenticated requests (requires access token)
 */
export const privateAxiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

/**
 * Process queued requests after token refresh
 */
const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * Request Interceptor for Private Instance
 * Adds access token to all requests
 */
privateAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor for Private Instance
 * Handles token refresh on 401 errors
 */
privateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return privateAxiosInstance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const state = store.getState();
    const refreshToken = state.auth.refreshToken;

    if (!refreshToken) {
      // No refresh token available, logout user
      store.dispatch(clearAuthState());
      isRefreshing = false;
      processQueue(error, null);
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      // Attempt to refresh the token
      const response = await publicAxiosInstance.post(REFRESH_TOKEN_ENDPOINT, {
        refresh_token: refreshToken,
      });

      const { access_token, refresh_token: newRefreshToken } = response.data.data;

      // Update tokens in store
      store.dispatch(
        setTokens({
          accessToken: access_token,
          refreshToken: newRefreshToken,
        })
      );

      // Update authorization header and retry original request
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
      }

      processQueue(null, access_token);
      isRefreshing = false;

      return privateAxiosInstance(originalRequest);
    } catch (refreshError) {
      // Refresh token failed, logout user
      processQueue(refreshError as AxiosError, null);
      isRefreshing = false;
      store.dispatch(clearAuthState());
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);

/**
 * Response Interceptor for Public Instance
 * Basic error handling for public requests
 */
publicAxiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default {
  publicAxiosInstance,
  privateAxiosInstance,
};