import { Component, ComponentChild } from "preact";
import { route } from "preact-router";
import { CustomError, CustomErrorCode } from "../error/CustomError";

interface ErrorBoundaryProps {
  children: ComponentChild;
}

interface ErrorBoundaryState {
  hasError: boolean;
  status?: CustomErrorCode;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, status: undefined };
  }

  componentDidCatch(error: CustomError, info: any) {
    console.error("Error capturado:", error, info);
    this.setState({ hasError: true, status: error.getCode() });
  }

  render(
    { children }: ErrorBoundaryProps,
    { hasError, status }: ErrorBoundaryState
  ) {
    if (hasError && status !== 401) {
      route("/404");
    }
    return children;
  }
}
