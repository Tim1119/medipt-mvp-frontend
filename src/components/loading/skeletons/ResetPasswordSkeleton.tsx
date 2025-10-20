import Skeleton from "./Skeleton";

const ResetPasswordSkeleton = () => {
  return (
    <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3">
      <div className="w-full max-w-md mx-auto xl:mx-0">
        
        {/* Logo */}
        <div className="flex justify-center mb-[50px] xl:justify-start">
          <Skeleton className="h-[55px] w-[120px] rounded-md" />
        </div>

        {/* Heading */}
        <div className="mb-6">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Password Input */}
          <Skeleton className="h-12 w-full rounded-md" />
          {/* Confirm Password Input */}
          <Skeleton className="h-12 w-full rounded-md" />
          {/* Submit Button */}
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        {/* Login Link */}
        <div className="mt-4">
          <Skeleton className="h-4 w-1/4 mx-auto xl:mx-0" />
        </div>

      </div>
    </div>
  );
};

export default ResetPasswordSkeleton;
