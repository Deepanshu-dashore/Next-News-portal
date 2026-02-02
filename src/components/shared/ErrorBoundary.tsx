'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Icon } from '@iconify/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Update state with error details
    this.setState({
      error,
      errorInfo,
    });

    // Here you could also log the error to an error reporting service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Icon icon="heroicons:exclamation-triangle-20-solid" className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Oops! Something went wrong</h1>
                  <p className="text-red-100 mt-1">
                    We encountered an unexpected error
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">Error Details</h2>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <p className="font-mono text-sm mb-2">
                      <span className="text-red-400">Error:</span> {this.state.error.message}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="font-mono text-xs text-gray-400 mt-4">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <p className="text-gray-600">
                  Don't worry, this happens sometimes. You can try one of the following:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={this.handleReset}
                    className="flex items-center gap-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition group"
                  >
                    <Icon icon="heroicons:arrow-path-20-solid" className="w-5 h-5 text-blue-600" />
                    <div className="text-left">
                      <p className="font-bold text-gray-900">Try Again</p>
                      <p className="text-sm text-gray-600">Attempt to recover from the error</p>
                    </div>
                  </button>

                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
                  >
                    <Icon icon="heroicons:arrow-path-rounded-square-20-solid" className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-bold text-gray-900">Refresh Page</p>
                      <p className="text-sm text-gray-600">Reload the entire page</p>
                    </div>
                  </button>

                  <a
                    href="/"
                    className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
                  >
                    <Icon icon="heroicons:home-20-solid" className="w-5 h-5 text-gray-600" />
                    <div className="text-left">
                      <p className="font-bold text-gray-900">Go to Homepage</p>
                      <p className="text-sm text-gray-600">Return to the main page</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  If this problem persists, please contact support with the error details above.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

/**
 * Hook-based wrapper for functional components
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
