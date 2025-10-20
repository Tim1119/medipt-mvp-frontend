import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import PageLoader from "@/components/loading/PageLoader";

interface SignupGuardProps {
  children: React.ReactNode;
}

const SignupRoute = ({ children }: SignupGuardProps) => {
  const { signedupUser, loading } = useAppSelector((state) => state.auth);

  // While checking the state, show loader
  if (loading) {
    return <PageLoader />;
  }

  // If no signedupUser, redirect back to signup
  if (!signedupUser) {
    return <Navigate to="/auth/organization/signup" replace />;
  }

  // Otherwise, allow access
  return <>{children}</>;
};

export default SignupRoute;
