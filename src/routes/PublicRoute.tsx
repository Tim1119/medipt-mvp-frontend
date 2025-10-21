// import { Navigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// import { useAppSelector } from '@/app/hooks'; 
// import PageLoader from "@/components/loading/PageLoader";

// interface PublicRouteProps {
//   children: React.ReactNode;
// }

// const PublicRoute = ({ children }: PublicRouteProps) => {
//   // const { user, loading } = useSelector((state: RootState) => state.auth);
//    const { user,loading } = useAppSelector((state) => state.auth);

//   // Show loader while checking authentication
//   if (loading) {
//     return <PageLoader />;
//   }

//   // Redirect to dashboard if already authenticated
//   if (user) {
//     return <Navigate to="/organization/home" replace />;
//   }

//   return <>{children}</>;
// };

// export default PublicRoute;



import { Navigate } from "react-router-dom";
import { useAppSelector } from '@/app/hooks'; 
import PageLoader from "@/components/loading/PageLoader";
import { useRef } from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const hasMounted = useRef(false);

  // Show loader only on very first render
  if (loading && !hasMounted.current) {
    hasMounted.current = true;
    return <PageLoader />;
  }

  // Mark as mounted after first render
  if (!hasMounted.current) {
    hasMounted.current = true;
  }

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/organization/home" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;