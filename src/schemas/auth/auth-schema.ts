// src/schemas/auth/auth-schema.ts
import { z } from 'zod';

/**
 * Organization Signup Schema
 */
export const OrganizationSignupSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  acronym: z.string()
    .min(2, 'Acronym must be at least 2 characters')
    .max(10, 'Acronym must not exceed 10 characters')
    .toUpperCase(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

/**
 * Login Schema
 */
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  remember_me: z.boolean().optional(),
});

/**
 * Forgot Password Schema
 */
export const ForgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

/**
 * Set New Password Schema
 */
export const SetNewPasswordSchema = z.object({
  // token: z.string().min(1, 'Token is required'),
  new_password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_password: z.string(),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

/**
 * Verify Account Schema
 */
export const VerifyAccountSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
});

/**
 * Change Password Schema (for authenticated users)
 */
export const ChangePasswordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirm_new_password: z.string(),
}).refine((data) => data.new_password === data.confirm_new_password, {
  message: "Passwords don't match",
  path: ['confirm_new_password'],
});

// Export TypeScript types
export type OrganizationSignupData = z.infer<typeof OrganizationSignupSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
export type SetNewPasswordData = z.infer<typeof SetNewPasswordSchema>;
export type VerifyAccountData = z.infer<typeof VerifyAccountSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

// API Response Types
export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: UserData;
}

export interface UserData {
  id: string;
  email: string;
  full_name: string;
  role: string;
  organization_id?: string;
  avatar_url?: string;
  phone?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface SignupResponse {
  id: string;
  name: string;
  acronym: string;
  user_email: string;
  message: string;
}

export interface ForgotPasswordResponse {
  email: string;
  message: string;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status_code: number;
}