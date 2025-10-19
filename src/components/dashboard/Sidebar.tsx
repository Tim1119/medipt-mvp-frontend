// src/components/dashboard/Sidebar.tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { useAuth } from '@/hooks/useAuth';
import SidebarLink from "./SidebarLink";
import mediptLogo from "@/assets/medipt.svg";
import { getNavigationByRole } from "@/utils/navigation"; // ✅ NEW HELPER
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (value: boolean) => void;
}

const Sidebar = ({ isMobileSidebarOpen, setIsMobileSidebarOpen }: SidebarProps) => {
  const pathname = useLocation().pathname;
  // const { userRole } = useAuth();

  //  if (!userRole) return null;
  const role = "Organization"; // TODO: Get from Redux auth state

  // Get navigation items based on role
  const navigation = getNavigationByRole(role);
  const navigationLinks = navigation.slice(0, -1);
  const logoutLink = navigation[navigation.length - 1];

  useEffect(() => {
    if (isMobileSidebarOpen && window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false);
    }
  };

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] 2xl:w-[350px]",
          "bg-white border-r shadow-lg z-20",
          "transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 flex flex-col",
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Main navigation"
      >
        <div className="h-[84px] flex items-center px-6 border-b shrink-0">
          <img src={mediptLogo} alt="Medipt Logo" className="h-10 w-auto" />
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="px-2 space-y-1" aria-label="Primary navigation">
            {navigationLinks.map((item) => (
              <div key={item.link} onClick={handleLinkClick}>
                <SidebarLink
                  title={item.title}
                  icon={
                    <item.icon
                      className={cn(
                        "sidebar-icon",
                        pathname === item.link && "active-sidebar-icon"
                      )}
                    />
                  }
                  link={item.link}
                  isComingSoon={item.isComingSoon}
                  isActive={pathname === item.link}
                //   badge={item.badge}
                />
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t p-2 shrink-0" onClick={handleLinkClick}>
          <SidebarLink
            title={logoutLink.title}
            icon={
              <logoutLink.icon
                className={cn(
                  "sidebar-icon",
                  pathname === logoutLink.link && "active-sidebar-icon"
                )}
              />
            }
            link={logoutLink.link}
            isComingSoon={false}
            isActive={pathname === logoutLink.link}
          />
        </div>
      </aside>

      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[15] lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;