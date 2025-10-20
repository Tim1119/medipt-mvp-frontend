// src/routes/routes.ts
import { lazy, type ComponentType } from 'react';

/**
 * User role type - matching your auth system
 */
export type UserRole = 'Admin' | 'Manager' | 'User' | 'Caregiver' | 'Viewer';

/**
 * Route configuration interface
 */
export interface RouteConfig {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.LazyExoticComponent<ComponentType<any>>;
  title: string;
  allowedRoles?: UserRole[]; // Optional for auth routes, required for protected routes
  label?: string; // For sidebar display
  icon?: string;
  showInSidebar?: boolean;
}

/**
 * Auth routes (public - no authentication required)
 */
export const authRoutes: RouteConfig[] = [
  {
    path: "login",
    component: lazy(() => import("@/pages/auth/general/LoginPage")),
    title: "Login",
  },
  {
    path: "signup",
    component: lazy(() => import("@/pages/auth/organization/OrganizationSignupPage")),
    title: "Sign Up",
  },
  {
    path: "verify-email",
    component: lazy(() => import("@/pages/auth/organization/OrganizationVerifyEmailPage")),
    title: "Verify Email",
  },
  {
   path: 'reset-password/:uidb64/:token',
    component: lazy(() => import("@/pages/auth/forgot-password/ResetPasswordPage")),
    title: "Reset Password",
  },
  {
   path: 'forgot-password',
    component: lazy(() => import("@/pages/auth/forgot-password/ForgotPasswordPage")),
    title: "Forgot Password",
  },
  {
   path: 'password-link-sent',
    component: lazy(() => import("@/pages/auth/forgot-password/ForgotPasswordEmailSentPage")),
    title: "Forgot Password Link Sent",
  },
//   {
//     path: "forgot-password",
//     component: lazy(() => import("@/pages/auth/general/ForgotPasswordPage")),
//     title: "Forgot Password",
//   },
//   {
//     path: "verify-account/:token",
//     component: lazy(() => import("@/pages/auth/general/VerifyAccountPage")),
//     title: "Verify Account",
//   },
//   {
//     path: "reset-password/:token",
//     component: lazy(() => import("@/pages/auth/general/ResetPasswordPage")),
//     title: "Reset Password",
//   },
];

/**
 * Dashboard routes (protected - require authentication and roles)
 */
export const dashboardRoutes: RouteConfig[] = [
//   {
//     path: "dashboard",
//     component: lazy(() => import("@/pages/dashboard/DashboardPage")),
//     title: "Dashboard",
//     allowedRoles: ['Admin', 'Manager', 'User', 'Caregiver', 'Viewer'],
//     label: "Dashboard",
//     icon: "LayoutDashboard",
//     showInSidebar: true,
//   },
//   {
//     path: "profile",
//     component: lazy(() => import("@/pages/dashboard/ProfilePage")),
//     title: "Profile",
//     allowedRoles: ['Admin', 'Manager', 'User', 'Caregiver', 'Viewer'],
//     label: "Profile",
//     icon: "User",
//     showInSidebar: true,
//   },
//   {
//     path: "patients",
//     component: lazy(() => import("@/pages/dashboard/patients/PatientsPage")),
//     title: "Patients",
//     allowedRoles: ['Admin', 'Manager', 'User', 'Caregiver'],
//     label: "Patients",
//     icon: "Users",
//     showInSidebar: true,
//   },
//   {
//     path: "patients/:id",
//     component: lazy(() => import("@/pages/dashboard/patients/PatientDetailsPage")),
//     title: "Patient Details",
//     allowedRoles: ['Admin', 'Manager', 'User', 'Caregiver'],
//     showInSidebar: false,
//   },
//   {
//     path: "caregivers",
//     component: lazy(() => import("@/pages/dashboard/caregivers/CaregiversPage")),
//     title: "Caregivers",
//     allowedRoles: ['Admin', 'Manager'],
//     label: "Caregivers",
//     icon: "UserCheck",
//     showInSidebar: true,
//   },
//   {
//     path: "health-records",
//     component: lazy(() => import("@/pages/dashboard/health-records/HealthRecordsPage")),
//     title: "Health Records",
//     allowedRoles: ['Admin', 'Manager', 'User', 'Caregiver'],
//     label: "Health Records",
//     icon: "FileText",
//     showInSidebar: true,
//   },
//   {
//     path: "admin",
//     component: lazy(() => import("@/pages/dashboard/admin/AdminPanel")),
//     title: "Admin Panel",
//     allowedRoles: ['Admin'],
//     label: "Admin Panel",
//     icon: "Shield",
//     showInSidebar: true,
//   },
//   {
//     path: "organization",
//     component: lazy(() => import("@/pages/dashboard/organization/OrganizationPage")),
//     title: "Organization",
//     allowedRoles: ['Admin', 'Manager'],
//     label: "Organization",
//     icon: "Building",
//     showInSidebar: true,
//   },
//   {
//     path: "reports",
//     component: lazy(() => import("@/pages/dashboard/ReportsPage")),
//     title: "Reports",
//     allowedRoles: ['Admin', 'Manager'],
//     label: "Reports",
//     icon: "BarChart",
//     showInSidebar: true,
//   },
//   {
//     path: "settings",
//     component: lazy(() => import("@/pages/dashboard/SettingsPage")),
//     title: "Settings",
//     allowedRoles: ['Admin', 'Manager', 'User', 'Caregiver', 'Viewer'],
//     label: "Settings",
//     icon: "Settings",
//     showInSidebar: true,
//   },
];

/**
 * Get sidebar items filtered by user role
 */
export const getSidebarItemsForRole = (role: string): RouteConfig[] => {
  return dashboardRoutes.filter(
    route => route.showInSidebar && route.allowedRoles?.includes(role as UserRole)
  );
};

/**
 * Check if user can access a specific route
 */
export const canAccessRoute = (path: string, role: string): boolean => {
  const route = dashboardRoutes.find(r => r.path === path);
  return route ? route.allowedRoles?.includes(role as UserRole) ?? false : false;
};

/**
 * Get all routes accessible by a specific role
 */
export const getRoutesForRole = (role: string): RouteConfig[] => {
  return dashboardRoutes.filter(route => route.allowedRoles?.includes(role as UserRole));
};

/**
 * Get route configuration by path
 */
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return [...authRoutes, ...dashboardRoutes].find(route => route.path === path);
};

/**
 * Check if a path is an auth route
 */
export const isAuthRoute = (path: string): boolean => {
  return authRoutes.some(route => route.path === path || path.startsWith(`/${route.path}`));
};

/**
 * Check if a path is a protected route
 */
export const isProtectedRoute = (path: string): boolean => {
  return dashboardRoutes.some(route => route.path === path || path.startsWith(`/${route.path}`));
};