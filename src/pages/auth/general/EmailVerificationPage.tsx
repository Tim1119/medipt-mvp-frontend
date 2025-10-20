import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import mediptLogo from '@/assets/medipt.svg';
import { Button } from '@/components/ui/button';
import { verifyAccountService } from '@/features/auth/authService';
import EmailVerificationSkeleton from '@/components/loading/skeletons/EmailVerificationSkeleton';

const EmailVerificationPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    let mounted = true;

    const verifyEmail = async () => {
      if (!token) {
        toast.error('Invalid verification link');
        navigate('/auth/organization/signup');
        return;
      }

      try {
        const response = await verifyAccountService(token);
        if (!mounted) return;

        const data = response.data;

        // ✅ Handle success case
        if (data.success && data.data?.success) {
          setVerificationStatus('success');
          toast.success(data.data?.message || 'Email verified successfully!');
        }
        // ⚠️ Handle already active or validation error
        else if (
          data.errors &&
          Array.isArray(data.errors) &&
          data.errors[0]?.toLowerCase().includes('already active')
        ) {
          setVerificationStatus('success');
          toast.success('Your account is already active. You can log in now.');
        }
        // ❌ Handle other failures
        else {
          setVerificationStatus('error');
          toast.error(data.errors?.[0] || 'Verification failed. Please try again.');
        }

        // Redirect after short delay
        setTimeout(() => {
          if (mounted && verificationStatus === 'success') navigate('/auth/login');
        }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        if (!mounted) return;
        setVerificationStatus('error');
        toast.error('Verification failed. Please try again or request a new link.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    verifyEmail();

    return () => {
      mounted = false;
    };
  }, [token, navigate, verificationStatus]);

  if (loading) {
    return <EmailVerificationSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="col-span-7 xl:col-span-3 grid h-[90%] items-center xl:items-start xl:h-[85%] 2xl:h-[70%] my-auto justify-items-center xl:justify-self-auto w-full"
    >
      <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-full max-w-md mx-auto xl:mx-0">
          {/* Logo */}
          <img
            src={mediptLogo}
            className="mb-[50px] mx-auto xl:mx-0 2xl:h-[55px] animate-in zoom-in duration-500"
            alt="medipt-logo"
          />

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center xl:text-left mb-6"
          >
            <h2 className="text-[#009899] font-[600] text-[32px] break-all">
              {verificationStatus === 'success'
                ? 'Account Verification Complete'
                : 'Account Verification Failed'}
            </h2>
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-black font-inter text-sm font-light leading-5 md:text-center lg:text-center xl:text-left"
          >
            {verificationStatus === 'success'
              ? 'Your email has been successfully verified. You can now log in to your account.'
              : "The verification link you used is either invalid or has expired. If you've already signed up but haven't activated your account, you can request a new verification link. Otherwise, please try signing up again."}
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6"
          >
            <Button className="w-full border border-[#084F61] p-0 flex items-center justify-center rounded-sm cursor-pointer hover:bg-[#084F61] hover:text-white transition-colors">
              <Link
                to={
                  verificationStatus === 'success'
                    ? '/auth/login'
                    : '/auth/organization/signup'
                }
                className="w-full h-full flex items-center justify-center cursor-pointer py-2"
              >
                {verificationStatus === 'success'
                  ? 'Proceed to Login'
                  : 'Back to Sign Up'}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmailVerificationPage;
