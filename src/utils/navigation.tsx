// src/utils/navigation.tsx
// src/utils/navigation.tsx
import type { ComponentType } from "react";
import { 
  BiSolidBarChartSquare,
  BiUserPlus 
} from "react-icons/bi";
import { 
  TbPencilHeart,
  TbFileDescription 
} from "react-icons/tb";
import { 
  IoDocumentTextOutline,
  IoSettingsOutline 
} from "react-icons/io5";
import { 
  RxHome 
} from "react-icons/rx";
import { 
  FaShieldVirus,
  FaUserMd,
  FaFileMedical 
} from "react-icons/fa";
import { 
  MdOutlinePayment,
  MdOutlineHistory 
} from "react-icons/md";
import { 
  CiLogout 
} from "react-icons/ci";
import { 
  Users,
  FileText,
  Calendar 
} from "lucide-react";

/**
 * Navigation item interface
 */
export interface NavigationItem {
  title: string;
  link: string;
  icon: ComponentType<{ className?: string }>;
  isComingSoon: boolean;
  roles: string[];
  badge?: string; // Optional badge text (e.g., "New", "Beta")
  children?: NavigationItem[]; // For nested navigation (future use)
}

/**
 * Organization/Admin sidebar navigation
 * Defines all available routes and their permissions
 */
export const organizationSidebarNavigation: NavigationItem[] = [
  // Main Dashboard
  {
    title: "Dashboard",
    link: "/organization/home",
    icon: BiSolidBarChartSquare,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },

  // Patient Management Section
  {
    title: "Register Patient",
    link: "/organization/register-patient",
    icon: BiUserPlus,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },
  {
    title: "Patient History",
    link: "/organization/patient-registration-history",
    icon: Users,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },

  // Health Records Section
  {
    title: "Health Records",
    link: "/organization/health-record-history",
    icon: FaFileMedical,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },
  {
    title: "Add Health Record",
    link: "/organization/create-health-record",
    icon: TbPencilHeart,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
    badge: "New",
  },

  // Caregiver Management
  {
    title: "Caregivers",
    link: "/organization/caregiver-invite-history",
    icon: FaUserMd,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },

  // Reports & Analytics
  {
    title: "Reports",
    link: "/organization/reports",
    icon: FileText,
    isComingSoon: true,
    roles: ["Organization", "Admin"],
  },

  // Appointments (Coming Soon)
  {
    title: "Appointments",
    link: "/organization/appointments",
    icon: Calendar,
    isComingSoon: true,
    roles: ["Organization", "Admin"],
    badge: "Soon",
  },

  // Pharmacy (Coming Soon)
  {
    title: "Pharmacy",
    link: "/organization/pharmacy",
    icon: RxHome,
    isComingSoon: true,
    roles: ["Organization", "Admin"],
  },

  // HMO/Insurance (Coming Soon)
  {
    title: "HMO",
    link: "/organization/hmo",
    icon: FaShieldVirus,
    isComingSoon: true,
    roles: ["Organization", "Admin"],
  },

  // Payments (Coming Soon)
  {
    title: "Payments",
    link: "/organization/payments",
    icon: MdOutlinePayment,
    isComingSoon: true,
    roles: ["Organization", "Admin"],
  },

  // Settings
  {
    title: "Settings",
    link: "/organization/settings",
    icon: IoSettingsOutline,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },

  // Logout (Always last)
  {
    title: "Logout",
    link: "/logout",
    icon: CiLogout,
    isComingSoon: false,
    roles: ["Organization", "Admin", "Caregiver", "Patient"],
  },
];

/**
 * Caregiver-specific navigation
 * (For future implementation when you add caregiver portal)
 */
export const caregiverSidebarNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    link: "/caregiver/home",
    icon: BiSolidBarChartSquare,
    isComingSoon: false,
    roles: ["Caregiver"],
  },
  {
    title: "My Patients",
    link: "/caregiver/patients",
    icon: Users,
    isComingSoon: false,
    roles: ["Caregiver"],
  },
  {
    title: "Health Records",
    link: "/caregiver/health-records",
    icon: IoDocumentTextOutline,
    isComingSoon: false,
    roles: ["Caregiver"],
  },
  {
    title: "Appointments",
    link: "/caregiver/appointments",
    icon: Calendar,
    isComingSoon: true,
    roles: ["Caregiver"],
  },
  {
    title: "Profile",
    link: "/caregiver/profile",
    icon: IoSettingsOutline,
    isComingSoon: false,
    roles: ["Caregiver"],
  },
  {
    title: "Logout",
    link: "/logout",
    icon: CiLogout,
    isComingSoon: false,
    roles: ["Caregiver"],
  },
];

/**
 * Patient-specific navigation
 * (For future implementation when you add patient portal)
 */
export const patientSidebarNavigation: NavigationItem[] = [
  {
    title: "Dashboard",
    link: "/patient/home",
    icon: BiSolidBarChartSquare,
    isComingSoon: false,
    roles: ["Patient"],
  },
  {
    title: "My Health Records",
    link: "/patient/health-records",
    icon: TbFileDescription,
    isComingSoon: false,
    roles: ["Patient"],
  },
  {
    title: "Appointments",
    link: "/patient/appointments",
    icon: Calendar,
    isComingSoon: true,
    roles: ["Patient"],
  },
  {
    title: "Prescriptions",
    link: "/patient/prescriptions",
    icon: RxHome,
    isComingSoon: true,
    roles: ["Patient"],
  },
  {
    title: "Profile",
    link: "/patient/profile",
    icon: IoSettingsOutline,
    isComingSoon: false,
    roles: ["Patient"],
  },
  {
    title: "Logout",
    link: "/logout",
    icon: CiLogout,
    isComingSoon: false,
    roles: ["Patient"],
  },
];

/**
 * Settings sub-navigation
 * Used in the settings section for nested navigation
 */
export const settingsNavigation: NavigationItem[] = [
  {
    title: "Edit Profile",
    link: "/organization/edit-profile",
    icon: BiUserPlus,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },
  {
    title: "Privacy & Security",
    link: "/organization/privacy-and-security",
    icon: FaShieldVirus,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },
  {
    title: "Notifications",
    link: "/organization/notifications",
    icon: IoDocumentTextOutline,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },
  {
    title: "Contact Us",
    link: "/organization/contact-us",
    icon: MdOutlineHistory,
    isComingSoon: false,
    roles: ["Organization", "Admin"],
  },
];

/**
 * Helper function to get navigation based on user role
 * @param role - User role ("Organization", "Caregiver", "Patient", etc.)
 * @returns Filtered navigation items for the role
 */
export const getNavigationByRole = (role: string): NavigationItem[] => {
  switch (role) {
    case "Caregiver":
      return caregiverSidebarNavigation;
    case "Patient":
      return patientSidebarNavigation;
    case "Organization":
    case "Admin":
    default:
      return organizationSidebarNavigation;
  }
};

/**
 * Helper function to get page title from pathname
 * @param pathname - Current route pathname
 * @param role - User role
 * @returns Page title or "Dashboard" as fallback
 */
export const getPageTitle = (pathname: string, role: string): string => {
  const navigation = getNavigationByRole(role);
  const currentPage = navigation.find((item) => item.link === pathname);
  return currentPage?.title || "Dashboard";
};

/**
 * Helper function to check if a route is accessible by role
 * @param pathname - Route to check
 * @param userRole - Current user role
 * @returns Boolean indicating if route is accessible
 */
export const isRouteAccessible = (pathname: string, userRole: string): boolean => {
  const navigation = getNavigationByRole(userRole);
  const route = navigation.find((item) => item.link === pathname);
  return route ? route.roles.includes(userRole) : false;
};

/**
 * Export all navigation configurations
 */
export default {
  organizationSidebarNavigation,
  caregiverSidebarNavigation,
  patientSidebarNavigation,
  settingsNavigation,
  getNavigationByRole,
  getPageTitle,
  isRouteAccessible,
};