import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
nprogress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
});

const useRouteProgress = () => {
  const location = useLocation();

  useEffect(() => {
    nprogress.start();

    // Simulate loading completion
    const timer = setTimeout(() => {
      nprogress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      nprogress.done();
    };
  }, [location.pathname]);
};

export default useRouteProgress;