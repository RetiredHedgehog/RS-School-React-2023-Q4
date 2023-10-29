import { Component } from 'react';

type State = {
  hasError: boolean;
};

class ErrorButton extends Component {
  state: State = {
    hasError: false,
  };

  render() {
    if (this.state.hasError) {
      throw new Error('This is a test');
    }
    return (
      <button
        onClick={() => {
          this.setState({ hasError: true });
        }}
      >
        Throw error
      </button>
    );
  }
}

export default ErrorButton;
