import React from 'react';

type Props = {
  name: string;
  labelText: string;
  children?: React.ReactNode;
};

const InputText = ({
  name,
  labelText,
  children,
  ...props
}: Props & React.ComponentProps<'input'>) => {
  return (
    <div>
      <label htmlFor={name}>{labelText}</label>
      <input {...props} id={name} name={name} type="text" />
      {children}
    </div>
  );
};

export default InputText;
