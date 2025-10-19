import Skeleton from "./Skeleton";

export default function LoginSkeleton() {
    return (
        <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3 animate-in fade-in duration-500">
            <div className="w-full max-w-md mx-auto xl:mx-0">
                {/* Logo Skeleton */}
                <Skeleton className="h-[55px] w-[120px] mb-[50px] mx-auto xl:mx-0 animate-pulse" />

                {/* Welcome Text Skeleton */}
                <div className="text-center xl:text-left mb-6 space-y-3">
                    <Skeleton className="h-8 w-48 mx-auto xl:mx-0 animate-pulse" style={{ animationDelay: '100ms' }} />
                    <Skeleton className="h-4 w-64 mx-auto xl:mx-0 animate-pulse" style={{ animationDelay: '200ms' }} />
                    <Skeleton className="h-4 w-56 mx-auto xl:mx-0 animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>

                {/* Form Fields Skeleton */}
                <div className="space-y-4">
                    {/* Email Input Skeleton */}
                    <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '400ms' }}>
                        <Skeleton className="h-4 w-24 animate-pulse" />
                        <Skeleton className="h-10 w-full animate-pulse" />
                    </div>

                    {/* Password Input Skeleton */}
                    <div className="space-y-2 animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '500ms' }}>
                        <Skeleton className="h-4 w-20 animate-pulse" />
                        <Skeleton className="h-10 w-full animate-pulse" />
                    </div>

                    {/* Login Button Skeleton */}
                    <div className="animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '600ms' }}>
                        <Skeleton className="h-10 w-full mt-4 animate-pulse" />
                    </div>

                    {/* Forgot Password Link Skeleton */}
                    <div className="animate-in fade-in duration-500" style={{ animationDelay: '700ms' }}>
                        <Skeleton className="h-4 w-32 mx-auto xl:mx-0 mt-4 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}