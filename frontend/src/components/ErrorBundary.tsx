import { Component, ComponentChild } from "preact";

interface ErrorBoundaryProps {
  children: ComponentChild;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: any) {
    console.error('Error capturado:', error, info);
    this.setState({ hasError: true });
  }

  render({ children }: ErrorBoundaryProps, { hasError }: ErrorBoundaryState) {
    if (hasError) {
      return <div>Lo sentimos, algo salió mal.</div>;
    }
    return children;
  }
}