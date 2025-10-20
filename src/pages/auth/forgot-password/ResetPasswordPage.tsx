import {type  SetNewPasswordData, SetNewPasswordSchema } from '@/schemas/auth/auth-schema';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { selectAuthLoading } from "@/features/auth/authSlice";
import { Button } from '@/components/ui/button';
import FormPasswordInput from '@/components/forms/FormPasswordInput';
import { setNewPassword } from '@/features/auth/authSlice';
import type { AppDispatch } from '@/app/store';
import mediptLogo from '@/assets/medipt.svg';
import ResetPasswordSkeleton from '@/components/loading/skeletons/ResetPasswordSkeleton';

const ResetPasswordPage = () => {
  const { uidb64, token } = useParams<{ uidb64: string; token: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
  const loading = useSelector(selectAuthLoading);

  


  useEffect(() => {
    if (!loading && !initialLoadCompleted) {
      setInitialLoadCompleted(true);

      if (!uidb64 || !token) {
        toast.error('Reset token is required.');
        navigate('/auth/forgot-password');
      }
    }
  }, [initialLoadCompleted, navigate, loading, uidb64, token]);

  const formMethods = useForm<SetNewPasswordData>({
    resolver: zodResolver(SetNewPasswordSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const onSubmit: SubmitHandler<SetNewPasswordData> = async (data) => {
  setIsSubmitting(true);
  try {
    if (data.new_password !== data.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }

    if (!uidb64 || !token) {
      toast.error('Invalid reset link.');
      return;
    }

    const payload = {
      uidb64,
      token,
      new_password: data.new_password,
      confirm_password: data.confirm_password,
    };

    await dispatch(setNewPassword(payload)).unwrap();

    toast.success('Password reset successful. Kindly login.');
    reset();
    navigate('/auth/login');
  } catch {
    // Error handled by slice
  } finally {
    setIsSubmitting(false);
  }
};


  if (!initialLoadCompleted && loading) {
    return <ResetPasswordSkeleton />;
  }

  return (
    <FormProvider {...formMethods}>
      <motion.div
        className="col-span-7 xl:col-span-3 grid h-[90%] items-center xl:items-start xl:h-[85%] 2xl:h-[70%] my-auto justify-items-center xl:justify-self-auto w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full max-w-md mx-auto xl:mx-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
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
                Set your new password
              </h2>
              <p className="text-gray-500 mt-2">
                The new password must be different from your previous password.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormPasswordInput
                register={register}
                fieldName="new_password"
                labelText="Password"
                placeholder="Enter your new password"
                errors={errors}
              />
              <FormPasswordInput
                register={register}
                fieldName="confirm_password"
                labelText="Confirm Password"
                placeholder="Confirm your new password"
                errors={errors}
              />

              <Button
                type="submit"
                className={`w-full border border-[#084F61] transition-all duration-300 bg-[#1786A2] hover:bg-[#1786A2] cursor-pointer ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 
                          0 5.373 0 12h4zm2 5.291A7.962 7.962 0 
                          014 12H0c0 3.042 1.135 5.824 3 
                          7.938l3-2.647z"
                      ></path>
                    </svg>
                    Resetting Password...
                  </span>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-black text-sm text-center xl:text-left mt-4 font-semibold">
              <Link
                to="/auth/login"
                className="font-medium text-brand-primary-3 hover:underline"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </FormProvider>
  );
};

export default ResetPasswordPage;
