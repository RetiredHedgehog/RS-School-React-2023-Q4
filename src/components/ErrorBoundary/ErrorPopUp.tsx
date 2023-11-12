import { ErrorInfo, useState } from 'react';
import helpers from '../../helpers';
import './ErrorPopUp.css';

type Props = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};

const ErorrPopUp = ({ error }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  helpers.saveSearchText('');
  return (
    <div className={`error${isVisible ? ' visible' : ''}`}>
      <h2>An error occured!</h2>
      {error instanceof Error && (
        <>
          <p>{`Name: ${error.name}`}</p>
          <p>{`Message: ${error.message}`}</p>
        </>
      )}
      <button
        onClick={() => {
          setIsVisible(false);
        }}
      >
        Close popup
      </button>
    </div>
  );
};

export default ErorrPopUp;
