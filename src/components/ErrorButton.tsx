import { useState } from 'react';

const ErrorButton = () => {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    throw new Error('This is a test error');
  }

  return (
    <button
      onClick={() => {
        setHasError(true);
      }}
    >
      Throw error
    </button>
  );
};

export default ErrorButton;
