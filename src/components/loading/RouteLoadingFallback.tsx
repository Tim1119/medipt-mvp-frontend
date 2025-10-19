import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const RouteLoadingFallback = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-[#009899]" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-600 font-inter"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default RouteLoadingFallback;