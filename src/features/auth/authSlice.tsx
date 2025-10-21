import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { authService } from "./authService";
import { handleApiError } from "@/api/error-handler";
import type {
  ForgotPasswordData,
  OrganizationSignupData,
  SetNewPasswordData,
  LoginData,
} from "@/schemas/auth/auth-schema";
import type { RootState } from "@/app/store"; // Import from store instead of types


/**
 * User roles used throughout the app
 */
export type UserRole = "Admin" | "Organization" | "Manager" | "User" | "Caregiver" | "Viewer";

/**
 * Interface for a logged-in user
 */
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
//   role: string;
  organization_id?: string;
  avatar_url?: string;
  phone?: string;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface for a user that just signed up
 * Email and other data used on verification pages
 */
export interface SignedupUser {
  id: string;
  name: string;
  acronym: string;
  user_email: string;
}

/**
 * Auth state structure
 */
interface AuthState {
  user: User | null;
  signedupUser: SignedupUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  resetEmail: string | null;
  error: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
}

/**
 * Get initial auth state from localStorage
 */
const getInitialAuthState = (): AuthState => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userStr = localStorage.getItem("user");

  let user: User | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
    }
  }

  return {
    user,
    signedupUser: null,
    accessToken: accessToken || null,
    refreshToken: refreshToken || null,
    resetEmail: null,
    loading: false,
    error: null,
    isAuthenticated: !!accessToken && !!user,
    tokenExpiry: null,
  };
};

const initialState: AuthState = getInitialAuthState();

/**
 * Organization Signup Thunk
 */
export const organizationSignup = createAsyncThunk<
  SignedupUser,
  OrganizationSignupData,
  { rejectValue: string }
>("auth/signup-organization", async (organizationData, thunkAPI) => {
  try {
    const response = await authService.organizationSignupService(organizationData);
    return response.data.data.data;
  } catch (error) {
    handleApiError(error);
    return thunkAPI.rejectWithValue("Signup failed");
  }
});

/**
 * Verify Account Thunk
 */
export const verifyAccount = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("auth/verify-account", async (token, thunkAPI) => {
  try {
    const response = await authService.verifyAccountService(token);
    return response.data.message || "Account verified successfully";
  } catch (error) {
    handleApiError(error);
    return thunkAPI.rejectWithValue("Account verification failed");
  }
});

/**
 * Login Thunk
 */
export const login = createAsyncThunk<
  { user: User; access_token: string; refresh_token: string },
  LoginData,
  { rejectValue: string }
>("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    const response = await authService.loginService(loginData);
  
    const { access, refresh, user } = response.data.data;

    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("user", JSON.stringify(user));

    // Return with normalized field names for Redux state
    return { 
      user, 
      access_token: access,    
      refresh_token: refresh   
    };
  } catch (error) {
    handleApiError(error);
    return rejectWithValue("Login failed");
  }
});

/**
 * Forgot Password Thunk
 */
export const forgotPassword = createAsyncThunk<
  string,
  ForgotPasswordData,
  { rejectValue: string }
>("auth/forgot-password", async (forgotPasswordData, thunkAPI) => {
  try {
    const response = await authService.forgotPasswordService(forgotPasswordData);
    return response.data.data.email || forgotPasswordData.email;
  } catch (error) {
    handleApiError(error);
    return thunkAPI.rejectWithValue("Password reset request failed");
  }
});

/**
 * Set New Password Thunk
 */
export const setNewPassword = createAsyncThunk<
  void,
  SetNewPasswordData,
  { rejectValue: string }
>("auth/set-new-password", async (setNewPasswordData, thunkAPI) => {
  try {
    await authService.setNewPasswordService(setNewPasswordData);
  } catch (error) {
    handleApiError(error);
    return thunkAPI.rejectWithValue("Setting new password failed");
  }
});

/**
 * Refresh Token Thunk
 */
export const refreshToken = createAsyncThunk<
  { access_token: string; refresh_token: string },
  void,
  { rejectValue: string; state: RootState }
>("auth/refresh-token", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const currentRefreshToken = state.auth.refreshToken;

    if (!currentRefreshToken) {
      return rejectWithValue("No refresh token available");
    }

    const response = await authService.refreshTokenService(currentRefreshToken);
    const { access_token, refresh_token } = response.data.data;

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    return { access_token, refresh_token };
  } catch (error) {
    handleApiError(error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    return rejectWithValue("Token refresh failed");
  }
});

/**
 * Logout Thunk
 */
export const logout = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    try {
      await authService.logoutService();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }
);

/**
 * Change Password Thunk
 */
export const changePassword = createAsyncThunk<
  void,
  { current_password: string; new_password: string; confirm_new_password: string },
  { rejectValue: string }
>("auth/change-password", async (changePasswordData, thunkAPI) => {
  try {
    await authService.changePasswordService(changePasswordData);
  } catch (error) {
    handleApiError(error);
    return thunkAPI.rejectWithValue("Password change failed");
  }
});

/**
 * Get Current User Thunk
 */
export const getCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/get-current-user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUserService();
      const user = response.data.data;
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      handleApiError(error);
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

/**
 * ✅ Restore Auth Thunk
 * Loads user and tokens from localStorage into Redux when app starts
 */
export const restoreAuth = createAsyncThunk<
  AuthState,
  void,
  { rejectValue: string }
>("auth/restore-auth", async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userStr = localStorage.getItem("user");

    let user: User | null = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
      }
    }

    if (accessToken && user) {
      return {
        user,
        signedupUser: null,
        accessToken,
        refreshToken: refreshToken || null,
        resetEmail: null,
        loading: false,
        error: null,
        isAuthenticated: true,
        tokenExpiry: null,
      };
    } else {
      return rejectWithValue("No auth data found in localStorage");
    }
  } catch (error) {
    handleApiError(error);
    return rejectWithValue("Failed to restore auth");
  }
});

/**
 * Auth Slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    clearAuthState: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
      state.tokenExpiry = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    clearSignedupUser: (state) => {
      state.signedupUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Restore Auth
      .addCase(restoreAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(restoreAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })

      // Organization Signup
      .addCase(organizationSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(organizationSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.signedupUser = action.payload;
      })
      .addCase(organizationSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Signup failed";
      })

      // Verify Account
      .addCase(verifyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAccount.fulfilled, (state) => {
        state.loading = false;
        state.signedupUser = null;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Verification failed";
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      // Logout
      .addCase(logout.fulfilled, () => getInitialAuthState())
      .addCase(logout.rejected, () => getInitialAuthState());
  },
});

export const {
  clearError,
  setTokens,
  clearAuthState,
  updateUser,
  clearSignedupUser,
} = authSlice.actions;

// ✅ Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectSignedupUser = (state: RootState) => state.auth.signedupUser;
export const selectResetEmail = (state: RootState) => state.auth.resetEmail;

export default authSlice.reducer;
