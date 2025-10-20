import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import mediptLogo from '@/assets/medipt.svg';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import FormInput from '@/components/forms/FormInput';
import FormPasswordInput from '@/components/forms/FormPasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { organizationSignup, selectAuthLoading } from '@/features/auth/authSlice';
import type { AppDispatch } from '@/app/store';
import { type OrganizationSignupData, OrganizationSignupSchema } from '@/schemas/auth/auth-schema';
import OrganizationSignupSkeleton from '@/components/loading/skeletons/OrganizationSignupSkeleton';

const OrganizationSignupPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const loading = useSelector(selectAuthLoading);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);

    useEffect(() => {
        if (!loading && !initialLoadCompleted) {
            setInitialLoadCompleted(true);
        }
    }, [loading, initialLoadCompleted]);

    const formMethods = useForm<OrganizationSignupData>({
        resolver: zodResolver(OrganizationSignupSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = formMethods;

    const onSubmit: SubmitHandler<OrganizationSignupData> = async (data) => {
        try {
            setIsSubmitting(true);
            await dispatch(organizationSignup(data)).unwrap();

            toast.success('Signup successful! Please check your email to verify your account.');
            reset();
            navigate('/auth/organization/verify-email');
        } catch {
            // Error handled in slice
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!initialLoadCompleted && loading) {
        return <OrganizationSignupSkeleton />;
    }

    return (
        <FormProvider {...formMethods}>
            <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3 animate-in fade-in slide-in-from-bottom-4 duration-700 mx-auto h-full">
                <div className="w-full max-w-md mx-auto xl:mx-0">
                    {/* Header Section */}
                    <img
                        src={mediptLogo}
                        className="mb-[50px] mx-auto xl:mx-0 2xl:h-[55px] animate-in zoom-in duration-700"
                        alt="medipt-logo"
                    />

                    <div className="text-center xl:text-left mb-6 animate-in slide-in-from-top duration-500" style={{ animationDelay: '200ms' }}>
                        <h2 className="text-[#009899] font-[600] text-[32px] mb-2">
                            Create your account
                        </h2>
                        {/* <p className="text-gray-500 mt-2">
                            Join Medisrupt and get started with your organization’s workspace.
                        </p> */}
                    </div>

                    {/* Signup Form */}
                    <form
                        className="space-y-2 animate-in slide-in-from-bottom-3 duration-700"
                        style={{ animationDelay: '400ms' }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="space-y-3">
                            <div className="animate-in slide-in-from-right duration-500" style={{ animationDelay: '500ms' }}>
                                <FormInput
                                    register={register}
                                    fieldName="name"
                                    labelText="Organization Name"
                                    placeholder="Enter organization name"
                                    errors={errors}
                                    validationRules={{ required: 'Organization name is required' }}
                                />
                            </div>

                            <div className="animate-in slide-in-from-right duration-500" style={{ animationDelay: '550ms' }}>
                                <FormInput
                                    register={register}
                                    fieldName="acronym"
                                    labelText="Organization Acronym"
                                    placeholder="Enter organization acronym"
                                    errors={errors}
                                    validationRules={{ required: 'Organization acronym is required' }}
                                />
                            </div>

                            <div className="animate-in slide-in-from-right duration-500" style={{ animationDelay: '600ms' }}>
                                <FormInput
                                    register={register}
                                    fieldName="email"
                                    labelText="Email Address"
                                    inputType="email"
                                    placeholder="Enter your email"
                                    errors={errors}
                                    validationRules={{
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/,
                                            message: 'Invalid email format',
                                        },
                                    }}
                                />
                            </div>

                            <div className="animate-in slide-in-from-right duration-500" style={{ animationDelay: '650ms' }}>
                                <FormPasswordInput
                                    register={register}
                                    fieldName="password"
                                    labelText="Password"
                                    placeholder="Enter your password"
                                    errors={errors}
                                />
                            </div>

                            <div className="flex items-center gap-2 text-[#333238] text-sm font-light font-inter mt-5 animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '700ms' }}>
                                <input type="checkbox" name="agree" id="agree" />
                                <p>I agree to all Terms and Privacy</p>
                            </div>
                        </div>

                        <div className="animate-in slide-in-from-bottom-2 duration-500 pt-2" style={{ animationDelay: '750ms' }}>
                            <Button
                                type="submit"
                                className={`w-full border border-[#084F61] bg-[#1786A2] hover:bg-[#1786A2] cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
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
                                        Signing up...
                                    </span>
                                ) : (
                                    'Sign Up'
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <p className="text-black text-sm text-center xl:text-left mt-4 font-semibold animate-in fade-in duration-500" style={{ animationDelay: '800ms' }}>
                        Already have an account?{' '}
                        <Link
                            to="/auth/login"
                            className="font-medium text-[#1786A2] hover:text-[#009899] transition-colors duration-200 hover:underline underline-offset-2"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </FormProvider>
    );
};

export default OrganizationSignupPage;
