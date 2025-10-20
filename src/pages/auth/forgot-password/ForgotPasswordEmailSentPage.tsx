import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import mediptLogo from "@/assets/medipt.svg";
import type { RootState } from "@/app/store";
import { selectAuthLoading } from "@/features/auth/authSlice";

const ForgotPasswordEmailSentPage = () => {
  const navigate = useNavigate();
  const resetEmail = useSelector((state: RootState) => state.auth.resetEmail);
   const loading = useSelector(selectAuthLoading);
  

  useEffect(() => {
    if (!loading && !resetEmail) {
      toast.error("Email is missing. Please go back and enter it again.");
      navigate("/auth/forgot-password", { replace: true });
    }
  }, [loading, resetEmail, navigate]);

  return (
    <motion.div
      className="col-span-7 xl:col-span-3 grid h-[90%] items-center xl:items-start xl:h-[85%] 2xl:h-[70%] my-auto justify-items-center xl:justify-self-auto w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="w-full max-w-md mx-auto xl:mx-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo */}
          <img
            src={mediptLogo}
            className="mb-[50px] mx-auto xl:mx-0 2xl:h-[55px]"
            alt="medipt-logo"
          />

          {/* Heading */}
          <div className="text-center xl:text-left mb-6">
            <h2 className="text-[#009899] font-[600] text-[32px]">
              Please check your email
            </h2>
          </div>

          {/* Description */}
          <p className="text-black font-inter text-sm font-light leading-5 my-4 text-center xl:text-left">
            We sent a password reset link to
            <span className="text-[#009899] font-semibold break-all ml-1">
              {resetEmail}
            </span>{" "}
            to reset your password.
          </p>

          {/* Button */}
          <Button
            asChild
            className="w-full border border-[#084F61] mt-6 hover:bg-[#009899] transition-all duration-300"
          >
            <Link to="/auth/login">Login</Link>
          </Button>

          {/* Resend Link */}
          <p className="text-black text-sm text-center xl:text-left mt-4">
            Didn’t get the link?{" "}
            <Link
              to="/auth/forgot-password"
              className="text-[#1786A2] font-medium hover:underline"
            >
              Resend it
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordEmailSentPage;
