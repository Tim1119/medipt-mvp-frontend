import { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import { useAppDispatch } from "@/app/hooks";

// Error Boundary
import RouteErrorBoundary from "@/components/ error/RouteErrorBoundary";

// Loading Components
import RouteLoadingFallback from "@/components/loading/RouteLoadingFallback";
import PageTransition from "@/components/loading/PageTransition";

// Route Guards
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicRoute from "@/routes/PublicRoute";

// Layouts (not lazy - needed immediately)
import AuthLayout from "@/layout/auth-layout";
import DashboardLayout from "@/layout/dashboard-layout";

// Lazy-loaded pages
import { authRoutes, dashboardRoutes } from "@/routes/routes";

// Hooks
import useRouteProgress from "@/hooks/useRouteProgress";
import PageNotFound from "./pages/error/PageNotFound";
import SignupRoute from "./routes/SignUpRoute";
import OrganizationVerifyEmailPage from "./pages/auth/organization/OrganizationVerifyEmailPage";

// Redux
// import { restoreAuth } from "@/features/auth/authSlice";


function App() {
  const location = useLocation();
  // const dispatch = useDispatch();

  // const dispatch = useAppDispatch();
  useRouteProgress(); // NProgress integration

  // // Restore auth state on app load
  // useEffect(() => {
  //   dispatch(restoreAuth());
  // }, [dispatch]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <RouteErrorBoundary>
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes location={location} key={location.pathname}>
            {/* Root redirect */}
            <Route 
              path="/" 
              element={<Navigate to="/auth/login" replace />} 
            />

            {/* Public Auth Routes */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              {authRoutes.map(({ path, component: Component}) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PageTransition>                    
                        <Component />
                    </PageTransition>
                  }
                />
              ))}
            </Route>


            <Route
              path="/organization/verify-email"
              element={
                <PublicRoute>
                  <SignupRoute>
                  <AuthLayout />
                  </SignupRoute>
                </PublicRoute>
              }
            >
              {/* {authRoutes.map(({ path, component: Component}) => ( */}
                <Route
                 
                  path={"/organization/verify-email/"}
                  element={
                    <PageTransition>
                      <OrganizationVerifyEmailPage />
                    </PageTransition>
                  }
                />
              {/* ))} */}
            </Route>

            

          

            

            {/* Protected Dashboard Routes with RBAC */}
            <Route
              path="/organization"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {dashboardRoutes.map(({ path, component: Component, allowedRoles }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute allowedRoles={allowedRoles}>
                      <PageTransition>
                        <Component />
                      </PageTransition>
                    </ProtectedRoute>
                  }
                />
              ))}
            </Route>

             

            {/* Unauthorized page */}
            <Route 
              path="/unauthorized" 
              element={
                <PageTransition>
                  <PageNotFound message="You don't have permission to access this page" />
                </PageTransition>
              } 
            />

            {/* 404 catch-all */}
            <Route 
              path="*" 
              element={
                <PageTransition>
                  <PageNotFound />
                </PageTransition>
              } 
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </RouteErrorBoundary>
  );
}

export default App;