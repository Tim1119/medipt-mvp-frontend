import { Outlet } from "react-router-dom";
import authIllustrationImage from "@/assets/images/auth-illustration.png";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-7 w-full min-h-screen bg-[#F2FBFF] font-inter">
      {/* Left Sidebar Image (Hidden on mobile/tablet) */}
      <div className="hidden xl:flex items-center justify-center col-span-3">
        <div className="w-full h-full flex items-center justify-center p-8">
          <img
            src={authIllustrationImage}
            alt="Authentication Illustration"
             className=" w-[80%] h-full rounded-[50px] max-h-[90%]"
            loading="eager" // Load immediately since it's above the fold
          />
        </div>
      </div>

      {/* Right Content Area */}
      <div className="col-span-7 xl:col-span-3 flex items-center justify-center px-4 py-8 h-[90%] xl:items-start  xl:h-[85%] 2xl:h-[70%] my-auto justify-items-center xl:justify-self-auto">
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;