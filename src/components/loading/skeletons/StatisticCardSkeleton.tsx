import Skeleton from "./Skeleton";

const StatisticCardSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[140px] grid">
      <div className="flex items-center px-3 justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="flex items-center gap-4 p-4">
        <Skeleton className="w-14 h-14 rounded-full" />
        <div>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export default StatisticCardSkeleton;
