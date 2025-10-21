// src/features/auth/authService.ts
import { publicAxiosInstance, privateAxiosInstance } from "@/api/base_api";
import {
  FORGOT_PASSWORD_ENDPOINT,
  LOGIN_ENDPOINT,
  ORGANIZATION_SIGNUP_ENDPOINT,
  SET_NEW_PASSWORD_ENDPOINT,
  VERIFY_ACCOUNT_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
  LOGOUT_ENDPOINT,
} from "@/api/endpoints";
import type {
    ForgotPasswordData,
    LoginData,
    OrganizationSignupData,
    SetNewPasswordData,
} from "@/schemas/auth/auth-schema";


export const organizationSignupService = async (organizationData: OrganizationSignupData) => {
  const response = await publicAxiosInstance.post(ORGANIZATION_SIGNUP_ENDPOINT, organizationData);
  return response;
};

/**
 * Verify Account Service
 */
export const verifyAccountService = async (uidb64: string, token: string) => {
  const response = await publicAxiosInstance.get(`${VERIFY_ACCOUNT_ENDPOINT}${uidb64}/${token}/`);
  return response;
};

/**
 * Login Service
 */
export const loginService = async (loginData: LoginData) => {
  const response = await publicAxiosInstance.post(LOGIN_ENDPOINT, loginData);
  console.log('------>',response)
  return response;
};

/**
 * Forgot Password Service
 */
export const forgotPasswordService = async (forgotPasswordData: ForgotPasswordData) => {
  const response = await publicAxiosInstance.post(FORGOT_PASSWORD_ENDPOINT, forgotPasswordData);
  return response;
};

/**
 * Set New Password Service
 */
export const setNewPasswordService = async (newPasswordData: SetNewPasswordData) => {
  const response = await publicAxiosInstance.post(SET_NEW_PASSWORD_ENDPOINT, newPasswordData);
  return response;
};

/**
 * Refresh Token Service
 */
export const refreshTokenService = async (refreshToken: string) => {
  const response = await publicAxiosInstance.post(REFRESH_TOKEN_ENDPOINT, {
    refresh_token: refreshToken,
  });
  return response;
};

/**
 * Logout Service
 */
export const logoutService = async () => {
  const response = await privateAxiosInstance.post(LOGOUT_ENDPOINT);
  return response;
};

/**
 * Get Current User Service
 */
export const getCurrentUserService = async () => {
  const response = await privateAxiosInstance.get("/auth/me");
  return response;
};

/**
 * Change Password Service (for authenticated users)
 */
export const changePasswordService = async (changePasswordData: {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}) => {
  const response = await privateAxiosInstance.post("/auth/change-password", changePasswordData);
  return response;
};

/**
 * Export all services as authService object
 */
export const authService = {
  organizationSignupService,
  verifyAccountService,
  loginService,
  forgotPasswordService,
  setNewPasswordService,
  refreshTokenService,
  logoutService,
  getCurrentUserService,
  changePasswordService,
};

export default authService;