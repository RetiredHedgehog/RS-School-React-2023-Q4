import { Component, ErrorInfo } from 'react';
import helpers from '../../helpers';

type Props = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

class ErorrPopUp extends Component<Props> {
  state = {
    isVisible: true,
  };

  render() {
    return (
      <div className={`error${this.state.isVisible ? ' visible' : ''}`}>
        <h2>An error occured! Check console for more info!</h2>
        <button
          onClick={() => {
            this.setState({ isVisible: false });
            helpers.saveSearchText('');
            helpers.saveSearchType('');
          }}
        >
          Close popup
        </button>
      </div>
    );
  }
}

export default ErorrPopUp;
