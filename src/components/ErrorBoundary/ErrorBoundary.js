import React from "react";

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oups, something is not working...</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
