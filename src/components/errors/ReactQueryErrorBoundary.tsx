import { Component, type ReactNode, type ErrorInfo } from "react";
import { ReactQueryErrorState } from "./ReactQueryErrorState";

export interface ReactQueryErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ReactQueryErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ReactQueryErrorBoundary extends Component<
  ReactQueryErrorBoundaryProps,
  ReactQueryErrorBoundaryState
> {
  constructor(props: ReactQueryErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ReactQueryErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ReactQueryErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ReactQueryErrorState
          error={this.state.error}
          retry={this.handleRetry}
          fullscreen
        />
      );
    }

    return this.props.children;
  }
}

export { ReactQueryErrorBoundary };
