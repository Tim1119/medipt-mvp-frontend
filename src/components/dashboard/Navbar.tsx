// src/components/dashboard/Navbar.tsx
import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeftLong, FaCaretDown } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Bell } from "lucide-react";
import mediptLogo from "@/assets/medipt.svg";
import dummyElonImage from "@/assets/images/elon-musk.webp";
import { getPageTitle } from "@/utils/navigation"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar = ({ isMobileSidebarOpen, toggleSidebar }: NavbarProps) => {
  const pathname = useLocation().pathname;
  const role = "Organization"; // TODO: Get from Redux auth state

  // Get current page title using helper
  const pageTitle = useMemo(() => {
    return getPageTitle(pathname, role);
  }, [pathname, role]);

  const notificationCount = 3;

  return (
    <header
      className="
        fixed top-0 right-0 left-0 
        lg:left-[280px] 2xl:left-[350px] 
        h-[84px] bg-white border-b shadow-sm z-10
      "
      role="banner"
    >
      <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Link to="/organization/home" className="md:hidden">
            <img src={mediptLogo} alt="Medipt Logo" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <FaArrowLeftLong className="text-gray-600" />
            </button>
            <h1 className="text-xl font-medium text-[#30333b] font-inter">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm font-medium">New patient registered</p>
                    <p className="text-xs text-gray-500">John Doe was registered 5 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-sm font-medium">Health record updated</p>
                    <p className="text-xs text-gray-500">Jane Smith's record was updated</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-[#009899] font-medium">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors">
                  <Avatar className="h-10 w-10 border-2 border-[#6A78D1]">
                    <AvatarImage src={dummyElonImage} alt="User profile" />
                    <AvatarFallback>OO</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-bold font-inter text-gray-900">
                      Oluyemi Olalere
                    </p>
                    <p className="text-xs font-light font-inter text-gray-500">
                      Director
                    </p>
                  </div>
                  <FaCaretDown className="text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/organization/edit-profile" className="w-full cursor-pointer">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/organization/settings" className="w-full cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={() => console.log("Logout")}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden hover:bg-gray-100"
            aria-label={isMobileSidebarOpen ? "Close menu" : "Open menu"}
          >
            <GiHamburgerMenu className="h-6 w-6 text-[#009899]" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;