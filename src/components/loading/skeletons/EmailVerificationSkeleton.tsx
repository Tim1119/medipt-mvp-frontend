import Skeleton from "./Skeleton";

export default function EmailVerificationSkeleton() {
    return (
        <div className="col-span-7 xl:col-span-3 grid h-[90%] items-center xl:items-start xl:h-[85%] 2xl:h-[70%] my-auto justify-items-center xl:justify-self-auto w-full">
            <div className="w-11/12 xl:w-4/5 md:w-3/4 lg:w-2/3">
                <div className="flex flex-col items-center space-y-6">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-52" />
                    <div className="flex flex-col space-y-4 w-full">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
} 