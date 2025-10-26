export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

// Authentication Endpoints
export const ORGANIZATION_SIGNUP_ENDPOINT = '/auth/accounts/organization-signup/';
export const LOGIN_ENDPOINT = '/auth/accounts/login/';
export const LOGOUT_ENDPOINT = '/auth/logout';
export const VERIFY_ACCOUNT_ENDPOINT = '/auth/accounts/verify-account/';
export const FORGOT_PASSWORD_ENDPOINT = '/auth/accounts/password-reset/';
export const SET_NEW_PASSWORD_ENDPOINT = '/auth/accounts/password-reset-confirm/';

export const REFRESH_TOKEN_ENDPOINT = '/auth/refresh-token';
export const CHANGE_PASSWORD_ENDPOINT = '/auth/change-password'; // ✅ ADDED THIS
export const GET_CURRENT_USER_ENDPOINT = '/auth/me';

// Organization Endpoints
export const ORGANIZATION_STATISTICS_ENDPOINT = '/organizations/statistics';


// Caregiver Endpoints
export const INVITE_CAREGIVER_ENDPOINT = '/invites/invite-caregiver/';
export const ALL_CAREGIVERS_IN_ORGANIZATION_ENDPOINT = '/organizations/all-caregivers/';














export const ORGANIZATION_ENDPOINT = '/organizations';
export const ORGANIZATION_PROFILE_ENDPOINT = '/organizations/profile';
export const UPDATE_ORGANIZATION_ENDPOINT = '/organizations/update';

// Caregiver Endpoints
export const CAREGIVERS_ENDPOINT = '/caregivers';
export const UPDATE_CAREGIVER_ENDPOINT = '/caregivers/update';
export const DELETE_CAREGIVER_ENDPOINT = '/caregivers/delete';

// Patient Endpoints
export const PATIENTS_ENDPOINT = '/patients';
export const CREATE_PATIENT_ENDPOINT = '/patients/create';
export const UPDATE_PATIENT_ENDPOINT = '/patients/update';
export const DELETE_PATIENT_ENDPOINT = '/patients/delete';
export const PATIENT_DETAILS_ENDPOINT = '/patients';

// Health Records Endpoints
export const HEALTH_RECORDS_ENDPOINT = '/health-records';
export const CREATE_HEALTH_RECORD_ENDPOINT = '/health-records/create';
export const UPDATE_HEALTH_RECORD_ENDPOINT = '/health-records/update';
export const DELETE_HEALTH_RECORD_ENDPOINT = '/health-records/delete';
export const HEALTH_RECORD_DETAILS_ENDPOINT = '/health-records';

// Dashboard/Statistics Endpoints
export const DASHBOARD_STATS_ENDPOINT = '/dashboard/stats';
export const ANALYTICS_ENDPOINT = '/analytics';

// Notifications Endpoints
export const NOTIFICATIONS_ENDPOINT = '/notifications';
export const MARK_NOTIFICATION_READ_ENDPOINT = '/notifications/mark-read';

// File Upload Endpoints
export const UPLOAD_FILE_ENDPOINT = '/files/upload';
export const DELETE_FILE_ENDPOINT = '/files/delete';

export default {
  // Auth
  ORGANIZATION_SIGNUP_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  VERIFY_ACCOUNT_ENDPOINT,
  FORGOT_PASSWORD_ENDPOINT,
  SET_NEW_PASSWORD_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
  CHANGE_PASSWORD_ENDPOINT,
  GET_CURRENT_USER_ENDPOINT,
  
  // Organization
  ORGANIZATION_ENDPOINT,
  ORGANIZATION_PROFILE_ENDPOINT,
  UPDATE_ORGANIZATION_ENDPOINT,
  
  // Caregivers
  CAREGIVERS_ENDPOINT,
  INVITE_CAREGIVER_ENDPOINT,
  UPDATE_CAREGIVER_ENDPOINT,
  DELETE_CAREGIVER_ENDPOINT,
  
  // Patients
  PATIENTS_ENDPOINT,
  CREATE_PATIENT_ENDPOINT,
  UPDATE_PATIENT_ENDPOINT,
  DELETE_PATIENT_ENDPOINT,
  PATIENT_DETAILS_ENDPOINT,
  
  // Health Records
  HEALTH_RECORDS_ENDPOINT,
  CREATE_HEALTH_RECORD_ENDPOINT,
  UPDATE_HEALTH_RECORD_ENDPOINT,
  DELETE_HEALTH_RECORD_ENDPOINT,
  HEALTH_RECORD_DETAILS_ENDPOINT,
  
  // Dashboard
  DASHBOARD_STATS_ENDPOINT,
  ANALYTICS_ENDPOINT,
  
  // Notifications
  NOTIFICATIONS_ENDPOINT,
  MARK_NOTIFICATION_READ_ENDPOINT,
  
  // Files
  UPLOAD_FILE_ENDPOINT,
  DELETE_FILE_ENDPOINT,
};