import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { selectAuthLoading } from "@/features/auth/authSlice";
import mediptLogo from '@/assets/medipt.svg';
import FormInput from '@/components/forms/FormInput';
import { Button } from '@/components/ui/button';
import type { AppDispatch } from '@/app/store';
import ForgotPasswordSkeleton from '@/components/loading/skeletons/ForgotPasswordSkeleton';
import { type ForgotPasswordData, ForgotPasswordSchema } from '@/schemas/auth/auth-schema';
import { forgotPassword } from '@/features/auth/authSlice';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (!loading && !initialLoadCompleted) {
      setInitialLoadCompleted(true);
    }
  }, [loading, initialLoadCompleted]);

  const formMethods = useForm<ForgotPasswordData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = formMethods;

  const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
    try {
      setIsSubmitting(true);
      await dispatch(forgotPassword(data)).unwrap();
      toast.success('Email sent. Please check your mail to proceed');
      reset();
      navigate('/auth/password-link-sent');
    } catch {
      // handled in slice
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialLoadCompleted && loading) {
    return <ForgotPasswordSkeleton />;
  }

  return (
    <>
      <FormProvider {...formMethods}>
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
              {/* Logo */}
              <motion.img
                src={mediptLogo}
                alt="medipt-logo"
                className="mb-[50px] mx-auto xl:mx-0 2xl:h-[55px]"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />

              {/* Header */}
              <motion.div
                className="text-center xl:text-left mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h2 className="text-[#009899] font-[600] text-[32px]">
                  Forgot password?
                </h2>
                <p className="text-gray-500 mt-2">
                  No worries — we’ll send you reset instructions.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                className="space-y-4"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <FormInput
                  register={register}
                  fieldName="email"
                  labelText="Email address"
                  inputType="email"
                  placeholder="Enter your email address"
                  errors={errors}
                  validationRules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: 'Invalid email format',
                    },
                  }}
                />

                <motion.div
                  className="w-full mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  <Button
                    type="submit"
                    className={`w-full border border-[#084F61] transition-all duration-300 ${
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
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Proceeding...
                      </span>
                    ) : (
                      'Proceed to Login'
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              {/* Footer Link */}
              <motion.p
                className="text-black text-sm text-center xl:text-left mt-4 font-semibold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  to="/auth/login"
                  className="text-brand-primary font-medium text-[#1786A2]"
                >
                  Back to login
                </Link>
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </FormProvider>
    </>
  );
};

export default ForgotPasswordPage;
