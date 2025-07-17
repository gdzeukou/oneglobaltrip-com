import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class LoadingBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error) {
    console.error('Loading error caught:', error);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Loading Error
            </h2>
            <p className="text-muted-foreground mb-4">
              Something went wrong while loading. Please refresh the page.
            </p>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default LoadingBoundary;