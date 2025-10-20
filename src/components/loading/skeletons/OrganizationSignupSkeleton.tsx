import Skeleton from "./Skeleton";

const OrganizationSignupSkeleton = () => {
  return (
    <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3">
      <div className="w-full max-w-md mx-auto xl:mx-0">
        {/* Logo Skeleton */}
        <Skeleton className="mb-[50px] mx-auto xl:mx-0 h-[55px] w-[120px]" />

        {/* Title Skeleton */}
        <div className="text-center xl:text-left mb-6">
          <Skeleton className="h-8 w-48 mx-auto xl:mx-0" />
        </div>

        {/* Form Fields Skeleton */}
        <div className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Acronym Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 mt-5">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Submit Button */}
          <Skeleton className="h-10 w-full mt-2" />

          {/* Login Link */}
          <div className="flex justify-center xl:justify-start mt-4">
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationSignupSkeleton; 