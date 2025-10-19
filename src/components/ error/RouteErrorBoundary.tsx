import React, { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Route Error:", error, errorInfo);
    // Log to error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-6xl font-bold text-[#009899] mb-4">Oops!</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-8">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#009899] text-white rounded-lg hover:bg-[#007c7c] transition-colors"
              >
                Reload Page
              </button>
              <Link
                to="/"
                className="px-6 py-3 border border-[#009899] text-[#009899] rounded-lg hover:bg-[#009899] hover:text-white transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;