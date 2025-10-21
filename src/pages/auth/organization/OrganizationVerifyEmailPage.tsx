import mediptLogo from '@/assets/medipt.svg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/app/hooks';

const OrganizationVerifyEmailPage = () => {
  const { signedupUser } = useAppSelector((state) => state.auth);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="col-span-7 xl:col-span-3 grid h-[90%] items-center xl:items-start xl:h-[85%] 2xl:h-[70%] my-auto justify-items-center xl:justify-self-auto w-full"
    >
      <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3">
        <div className="w-full max-w-md mx-auto xl:mx-0">
          {/* Header Section */}
          <img
            src={mediptLogo}
            className="mb-[50px] mx-auto xl:mx-0 2xl:h-[55px]"
            alt="medipt-logo"
          />

          <div className="text-center xl:text-left mb-6">
            <h2 className="text-[#009899] font-[600] text-[32px]">
              Please verify your email
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-black font-inter text-sm font-light leading-4 my-4">
              We've sent a verification link to{' '}
              <span className="text-[#009899] font-semibold text-sm break-all">
                {signedupUser?.user_email}
              </span>
              . Please check your email and click the link to verify your account.
            </p>
          </div>

          <div className="my-6">
            <p className="text-black font-inter text-sm font-light leading-4 md:text-center lg:text-center xl:text-left">
              Wrong email address?{' '}
              <Link
                to="/auth/signup"
                className="text-[#009899] font-semibold hover:underline"
              >
                Change it
              </Link>
            </p>
          </div>

          <Button className="w-full border border-[#084F61] bg-[#1786A2] p-0 flex items-center justify-center rounded-sm cursor-pointer hover:bg-[#1786A2] hover:text-white transition-colors">
            <Link
              to="/auth/login"
              className="w-full h-full flex items-center justify-center cursor-pointer py-2"
            >
              Back to Login
            </Link>
          </Button>

          <p className="text-black text-sm text-center xl:text-left mt-4 font-light">
            Did not get the link?{' '}
            <Link
              to="/auth/resend-verification"
              className="text-[#1786A2] font-semibold hover:underline"
            >
              Resend it
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OrganizationVerifyEmailPage;
