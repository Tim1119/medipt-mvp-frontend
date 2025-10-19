// src/pages/general/PageNotFound.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * 404 Page Not Found Component
 * Features:
 * - Animated illustration
 * - Search functionality
 * - Navigation options (Home, Back, Search)
 * - Auto-redirect countdown (optional)
 * - Responsive design
 */

interface PageNotFoundProps {
  message?: string;
}


const PageNotFound: React.FC<PageNotFoundProps>  = ({ message }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [countdown, setCountdown] = useState(10); // Auto-redirect after 10 seconds
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Auto-redirect countdown (optional - remove if not needed)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          navigate("/organization/home");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search logic here
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FBFF] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Large 404 Text */}
          <motion.h1
            className="text-[150px] sm:text-[200px] font-bold text-[#009899] leading-none"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            404
          </motion.h1>

          {/* Floating Elements Animation */}
          <div className="relative h-32 mb-8">
            <motion.div
              className="absolute top-0 left-1/4 w-16 h-16 bg-[#009899]/20 rounded-full"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-10 right-1/4 w-12 h-12 bg-[#1786A2]/20 rounded-full"
              animate={{
                y: [0, 20, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 w-20 h-20 bg-[#009899]/10 rounded-full"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {message || "Oops! Page Not Found"}
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track!
          </p>

          {/* Auto-redirect countdown */}
          {countdown > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500"
            >
              {isRedirecting ? (
                "Redirecting..."
              ) : (
                <>
                  Redirecting to home in{" "}
                  <span className="font-bold text-[#009899]">{countdown}</span>{" "}
                  seconds...
                </>
              )}
            </motion.p>
          )}
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for a page..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-[#009899] focus:ring-[#009899]"
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-6 bg-[#009899] hover:bg-[#007c7c]"
            >
              Search
            </Button>
          </form>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => navigate("/organization/home")}
            className="w-full sm:w-auto h-12 px-8 bg-[#009899] hover:bg-[#007c7c] text-white font-medium"
          >
            <Home className="mr-2 h-5 w-5" />
            Go to Home
          </Button>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full sm:w-auto h-12 px-8 border-2 border-[#009899] text-[#009899] hover:bg-[#009899] hover:text-white font-medium"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/organization/home"
              className="text-sm text-[#009899] hover:underline font-medium"
            >
              Dashboard
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/organization/patient-registration-history"
              className="text-sm text-[#009899] hover:underline font-medium"
            >
              Patients
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/organization/health-record-history"
              className="text-sm text-[#009899] hover:underline font-medium"
            >
              Health Records
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/organization/settings"
              className="text-sm text-[#009899] hover:underline font-medium"
            >
              Settings
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm text-gray-500"
        >
          Need help?{" "}
          <Link
            to="/organization/contact-us"
            className="text-[#009899] hover:underline font-medium"
          >
            Contact Support
          </Link>
        </motion.footer>
      </div>
    </div>
  );
};

export default PageNotFound;