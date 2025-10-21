import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectAuthLoading } from "@/features/auth/authSlice";
import mediptLogo from '@/assets/medipt.svg';

const ForgotPasswordEmailSentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loading = useSelector(selectAuthLoading);
  const resetEmail = location.state?.email;

  useEffect(() => {
    if (!loading && !resetEmail) {
      toast.error('Session expired. Please request a new password reset link.');
      navigate('/auth/login', { replace: true });
    }
  }, [resetEmail, navigate, loading]);

  // Don't render content if no email
  if (!resetEmail) {
    return null;
  }

  return (
    <motion.div
      className="col-span-7 xl:col-span-3 grid h-[90%] items-center xl:items-start xl:h-[85%] 2xl:h-[70%] my-auto justify-items-center xl:justify-self-auto w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
      >
        <div className="w-full max-w-md mx-auto xl:mx-0">
          {/* Logo Animation */}
          <motion.img
            src={mediptLogo}
            alt="medipt-logo"
            className="mb-[50px] mx-auto xl:mx-0 2xl:h-[55px]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          />

          {/* Header Section */}
          <motion.div
            className="text-center xl:text-left mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-[#009899] font-[600] text-[32px]">
              Please check your email
            </h2>
          </motion.div>

          {/* Email Info */}
          <motion.p
            className="text-black font-inter text-sm font-light leading-4 my-4 md:text-center lg:text-center xl:text-left"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            We sent a password reset link to
            <span className="text-[#009899] font-semibold break-all ml-2">
              {resetEmail}
            </span>{' '}
            to verify your account.
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button className="w-full border border-brand-primary-2 p-0 flex items-center justify-center border-[#084F61] bg-[#1786A2] hover:bg-[#1786A2]">
              <Link
                to="/auth/login"
                className="w-full h-full flex items-center justify-center"
              >
                Login
              </Link>
            </Button>
          </motion.div>

          {/* Footer Link */}
          <motion.p
            className="text-black text-sm text-center xl:text-left mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Didn't get the link?{' '}
            <Link
              to="/auth/forgot-password"
              className="text-[#1786A2] font-medium text-brand-primary-3"
            >
              Resend it
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordEmailSentPage;