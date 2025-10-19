import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { useAppSelector } from '@/app/hooks'; 
import PageLoader from "@/components/loading/PageLoader";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  // const { user, loading } = useSelector((state: RootState) => state.auth);
   const { user,loading } = useAppSelector((state) => state.auth);

  // Show loader while checking authentication
  if (loading) {
    return <PageLoader />;
  }

  // Redirect to dashboard if already authenticated
  if (user) {
    return <Navigate to="/organization/home" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;