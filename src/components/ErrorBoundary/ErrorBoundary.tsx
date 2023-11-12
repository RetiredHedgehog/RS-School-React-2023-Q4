import { PropsWithChildren } from 'react';
import { Component, ErrorInfo } from 'react';
import ErorrPopUp from './ErrorPopUp';

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

const logError = (error: Error, errorInfo: ErrorInfo): void => {
  console.error(`Error occured.\n${error}\nStack: ${errorInfo.componentStack}`);
};

class ErrorBoundary extends Component<PropsWithChildren> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError(error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <ErorrPopUp
            error={this.state.error}
            errorInfo={this.state.errorInfo}
          />
          {this.props.children}
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
