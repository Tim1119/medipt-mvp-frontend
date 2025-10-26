import Skeleton from "./Skeleton";

const StatisticCardGenderSkeleton = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md h-[140px] grid">
        <div className="flex items-center px-3 justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    );
  };
  

  export default StatisticCardGenderSkeleton;