import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
};
const Button = ({ children, onClick }: Props) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
