import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import mediptLogo from '@/assets/medipt.svg';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import FormPasswordInput from '@/components/forms/FormPasswordInput';
import FormInput from '@/components/forms/FormInput';
import type { AppDispatch } from '@/app/store'; 
import { useDispatch } from 'react-redux';
import { type LoginData, LoginSchema } from '@/schemas/auth/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { login } from '@/features/auth/authSlice';
import LoginSkeleton from '@/components/loading/skeletons/LoginSkeleton';
import { useSelector } from "react-redux";
import { selectAuthLoading } from "@/features/auth/authSlice";

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
    const loading = useSelector(selectAuthLoading);

    useEffect(() => {
        if (!loading && !initialLoadCompleted) {
            setInitialLoadCompleted(true);
        }
    }, [loading, initialLoadCompleted]);

    const formMethods = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = formMethods;

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        try {
            setIsSubmitting(true);
            const result = await dispatch(login(data)).unwrap();
            toast.success('Login successful!');

            localStorage.setItem("access_token", result.access_token);
            localStorage.setItem("refresh_token", result.refresh_token);
        } catch {
            // Error is handled by the auth slice
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!initialLoadCompleted && loading) {
        return <LoginSkeleton />;
    }

    return (
        <FormProvider {...formMethods}>
            {/* <div className="bg-blue-400 w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3 animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto"> */}
            <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3 animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto">
                <div className="w-full max-w-md mx-auto xl:mx-0">
                {/* <div className="w-full max-w-md mx-auto xl:mx-0"> */}

                    {/* Header Section */}
                    <img
                        src={mediptLogo}
                        className="mb-[50px] mx-auto xl:mx-0 2xl:h-[55px] animate-in zoom-in duration-500"
                        alt="medipt-logo"
                    />

                    <div className="text-center xl:text-left mb-6 animate-in slide-in-from-left duration-700" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-[#009899] font-[600] text-[32px] mb-2">
                            Welcome back
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Put in your account details to continue <br />
                            the Medisrupt experience
                        </p>
                    </div>

                    {/* Login Form */}
                    <form 
                        className="space-y-3 animate-in slide-in-from-bottom-3 duration-700" 
                        style={{ animationDelay: '400ms' }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                            <div className="animate-in slide-in-from-right duration-500" style={{ animationDelay: '500ms' }}>
                                <FormInput
                                    register={register}
                                    fieldName="email"
                                    labelText="Email address"
                                    inputType="email"
                                    placeholder="Enter your email address"
                                    errors={errors}
                                    validationRules={{
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/,
                                            message: "Invalid email format",
                                        },
                                    }}
                                />
                            </div>

                            <div className="animate-in slide-in-from-right duration-500" style={{ animationDelay: '600ms' }}>
                                <FormPasswordInput
                                    register={register}
                                    fieldName="password"
                                    labelText="Password"
                                    placeholder="Enter your password"
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <div className="animate-in slide-in-from-bottom-2 duration-500 pt-2" style={{ animationDelay: '700ms' }}>
                            <Button
                                type="submit"
                                className={`w-full border border-[#084F61] transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </span>
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Forgot Password Link */}
                    <p className="text-black text-sm text-center xl:text-left mt-4 font-semibold animate-in fade-in duration-500" style={{ animationDelay: '800ms' }}>
                        <Link
                            to="/auth/forgot-password"
                            className="font-medium text-[#1786A2] hover:text-[#009899] transition-colors duration-200 hover:underline underline-offset-2"
                        >
                            Forgot Password
                        </Link>
                    </p>
                </div>
            </div>
        </FormProvider>
    );
};

export default LoginPage;