// import { lazy, type ComponentType } from 'react';
// import { UserRole } from '@/app/store';

// export interface RouteConfig {
//   path: string;
//   component: React.LazyExoticComponent<ComponentType<any>>;
//   title: string;
//   allowedRoles?: UserRole[]; // Optional for auth routes, required for protected routes
//   label?: string; // For sidebar display
//   icon?: string;
//   showInSidebar?: boolean;
// }

// // Auth routes (public)
// export const authRoutes: RouteConfig[] = [
//   {
//     path: "login",
//     component: lazy(() => import("@/pages/auth/general/LoginPage")),
//     title: "Login",
//   },
// //   {
// //     path: "signup",
// //     component: lazy(() => import("@/pages/auth/general/SignupPage")),
// //     title: "Sign Up",
// //   },
// //   {
// //     path: "forgot-password",
// //     component: lazy(() => import("@/pages/auth/general/ForgotPasswordPage")),
// //     title: "Forgot Password",
// //   },
// //   {
// //     path: "verify-account",
// //     component: lazy(() => import("@/pages/auth/general/VerifyAccountPage")),
// //     title: "Verify Account",
// //   },
// //   {
// //     path: "reset-password/:token",
// //     component: lazy(() => import("@/pages/auth/general/ResetPasswordPage")),
// //     title: "Reset Password",
// //   },
// ];

// // Dashboard routes (protected with roles)
// export const dashboardRoutes: RouteConfig[] = [
// //   {
// //     path: "dashboard",
// //     component: lazy(() => import("@/pages/dashboard/DashboardPage")),
// //     title: "Dashboard",
// //     allowedRoles: ['admin', 'manager', 'user', 'viewer'],
// //     label: "Dashboard",
// //     icon: "LayoutDashboard",
// //     showInSidebar: true,
// //   },
// //   {
// //     path: "profile",
// //     component: lazy(() => import("@/pages/dashboard/ProfilePage")),
// //     title: "Profile",
// //     allowedRoles: ['admin', 'manager', 'user', 'viewer'],
// //     label: "Profile",
// //     icon: "User",
// //     showInSidebar: true,
// //   },
// //   {
// //     path: "admin",
// //     component: lazy(() => import("@/pages/dashboard/admin/AdminPanel")),
// //     title: "Admin Panel",
// //     allowedRoles: ['admin'],
// //     label: "Admin Panel",
// //     icon: "Shield",
// //     showInSidebar: true,
// //   },
// //   {
// //     path: "users",
// //     component: lazy(() => import("@/pages/dashboard/admin/UsersPage")),
// //     title: "Manage Users",
// //     allowedRoles: ['admin', 'manager'],
// //     label: "Manage Users",
// //     icon: "Users",
// //     showInSidebar: true,
// //   },
// //   {
// //     path: "create",
// //     component: lazy(() => import("@/pages/dashboard/CreatePage")),
// //     title: "Create New",
// //     allowedRoles: ['admin', 'manager', 'user'],
// //     label: "Create New",
// //     icon: "Plus",
// //     showInSidebar: true,
// //   },
// //   {
// //     path: "reports",
// //     component: lazy(() => import("@/pages/dashboard/ReportsPage")),
// //     title: "Reports",
// //     allowedRoles: ['admin', 'manager'],
// //     label: "Reports",
// //     icon: "FileText",
// //     showInSidebar: true,
// //   },
// //   {
// //     path: "settings",
// //     component: lazy(() => import("@/pages/dashboard/SettingsPage")),
// //     title: "Settings",
// //     allowedRoles: ['admin', 'manager', 'user', 'viewer'],
// //     label: "Settings",
// //     icon: "Settings",
// //     showInSidebar: true,
// //   },
// ];

// // Helper functions
// export const getSidebarItemsForRole = (role: UserRole): RouteConfig[] => {
//   return dashboardRoutes.filter(
//     route => route.showInSidebar && route.allowedRoles?.includes(role)
//   );
// };

// export const canAccessRoute = (path: string, role: UserRole): boolean => {
//   const route = dashboardRoutes.find(r => r.path === path);
//   return route ? route.allowedRoles?.includes(role) ?? false : false;
// };

// export const getRoutesForRole = (role: UserRole): RouteConfig[] => {
//   return dashboardRoutes.filter(route => route.allowedRoles?.includes(role));
// };