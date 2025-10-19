import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  login,
  logout,
  organizationSignup,
  forgotPassword,
  setNewPassword,
  verifyAccount,
  refreshToken,
  getCurrentUser,
  clearError,
  changePassword,
  selectAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '@/features/auth/authSlice';


import type {
  LoginData,
  OrganizationSignupData,
  ForgotPasswordData,
  SetNewPasswordData,
  ChangePasswordData,
} from '@/schemas/auth/auth-schema';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for authentication operations
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useAppSelector(selectAuth);
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  /**
   * Handle user login
   */
  const handleLogin = useCallback(
    async (loginData: LoginData) => {
     
      try {
        const result = await dispatch(login(loginData)).unwrap();
        return result;
      } catch (error) {
           console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  /**
   * Handle user logout
   */
  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate('/login', { replace: true });
    } catch (error) {
        console.error(error);
      // Even if logout fails, clear local state
      navigate('/login', { replace: true });
    }
  }, [dispatch, navigate]);

  /**
   * Handle organization signup
   */
  const handleSignup = useCallback(
    async (signupData: OrganizationSignupData) => {
      try {
        const result = await dispatch(organizationSignup(signupData)).unwrap();
        return result;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  /**
   * Handle forgot password
   */
  const handleForgotPassword = useCallback(
    async (forgotPasswordData: ForgotPasswordData) => {
      try {
        const result = await dispatch(forgotPassword(forgotPasswordData)).unwrap();
        return result;
      } catch (error) {
           console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  /**
   * Handle set new password
   */
  const handleSetNewPassword = useCallback(
    async (setNewPasswordData: SetNewPasswordData) => {
      try {
        await dispatch(setNewPassword(setNewPasswordData)).unwrap();
      } catch (error) {
           console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  /**
   * Handle account verification
   */
  const handleVerifyAccount = useCallback(
    async (token: string) => {
      try {
        const result = await dispatch(verifyAccount(token)).unwrap();
        return result;
      } catch (error) {
           console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  /**
   * Handle token refresh
   */
  const handleRefreshToken = useCallback(async () => {
    try {
      await dispatch(refreshToken()).unwrap();
    } catch (error) {
      // If refresh fails, logout user
      handleLogout();
      throw error;
    }
  }, [dispatch, handleLogout]);

  /**
   * Handle password change (for authenticated users)
   */
  const handleChangePassword = useCallback(
    async (changePasswordData: ChangePasswordData) => {
      try {
        await dispatch(changePassword(changePasswordData)).unwrap();
      } catch (error) {
           console.error(error);
        throw error;
      }
    },
    [dispatch]
  );

  /**
   * Fetch current user data
   */
  const fetchCurrentUser = useCallback(async () => {
    try {
      await dispatch(getCurrentUser()).unwrap();
    } catch (error) {
           console.error(error);
      throw error;
    }
  }, [dispatch]);

  /**
   * Clear authentication error
   */
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (role: string): boolean => {
      return user?.role === role;
    },
    [user]
  );

  /**
   * Check if user has any of the specified roles
   */
  const hasAnyRole = useCallback(
    (roles: string[]): boolean => {
      return user ? roles.includes(user.role) : false;
    },
    [user]
  );

  /**
   * Check if token is expired or about to expire
   */
  const isTokenExpired = useCallback((): boolean => {
    if (!auth.tokenExpiry) return true;
    // Consider token expired if less than 5 minutes remaining
    return Date.now() >= auth.tokenExpiry - 5 * 60 * 1000;
  }, [auth.tokenExpiry]);

  /**
   * Auto-refresh token if needed
   */
  useEffect(() => {
    if (isAuthenticated && isTokenExpired() && auth.refreshToken) {
      handleRefreshToken().catch(() => {
        // If refresh fails, user will be logged out
        console.error('Token refresh failed');
      });
    }
  }, [isAuthenticated, isTokenExpired, auth.refreshToken, handleRefreshToken]);

  /**
   * Set up periodic token refresh
   */
  useEffect(() => {
    if (!isAuthenticated || !auth.tokenExpiry) return;

    const timeUntilExpiry = auth.tokenExpiry - Date.now();
    const refreshTime = timeUntilExpiry - 5 * 60 * 1000; // Refresh 5 minutes before expiry

    if (refreshTime <= 0) {
      // Token already expired or about to expire
      handleRefreshToken();
      return;
    }

    const refreshTimer = setTimeout(() => {
      handleRefreshToken();
    }, refreshTime);

    return () => clearTimeout(refreshTimer);
  }, [isAuthenticated, auth.tokenExpiry, handleRefreshToken]);

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    auth,
    
    // Actions
    handleLogin,
    handleLogout,
    handleSignup,
    handleForgotPassword,
    handleSetNewPassword,
    handleVerifyAccount,
    handleRefreshToken,
    handleChangePassword,
    fetchCurrentUser,
    handleClearError,
    
    // Utilities
    hasRole,
    hasAnyRole,
    isTokenExpired,
  };
};

export default useAuth;