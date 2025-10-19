import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarLinkProps {
  title: string;
  link: string;
  icon: ReactNode;
  isComingSoon?: boolean;
  isActive: boolean;
  badge?: string;
}

const SidebarLink = ({
  title,
  link,
  icon,
  isComingSoon = false,
  isActive,
  badge,
}: SidebarLinkProps) => {
  const content = (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        "group relative",
        isActive
          ? "bg-[#009899]/10 text-[#009899]"
          : "text-[#808691] hover:bg-gray-100 hover:text-[#009899]",
        isComingSoon && "cursor-not-allowed opacity-60"
      )}
    >
      <span className="flex-shrink-0 w-6 h-6">{icon}</span>
      <span className="text-[16px] font-light leading-6 font-inter flex-1">
        {title}
      </span>

      {/* Badge (New, Beta, Soon, etc.) */}
      {badge && (
        <Badge
          variant={badge === "Soon" ? "secondary" : "default"}
          className={cn(
            "ml-auto text-xs",
            badge === "Soon" && "bg-[#F5D9A8] text-[#8B6914] hover:bg-[#F5D9A8]",
            badge === "New" && "bg-green-500 text-white hover:bg-green-600",
            badge === "Beta" && "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          {badge}
        </Badge>
      )}

      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#009899] rounded-r-full" />
      )}
    </div>
  );

  if (isComingSoon) {
    return (
      <div className="cursor-not-allowed" title="Coming soon">
        {content}
      </div>
    );
  }

  return (
    <Link to={link} className="block">
      {content}
    </Link>
  );
};

export default SidebarLink;