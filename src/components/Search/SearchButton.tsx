type Props = {
  onClick: () => Promise<void>;
};

const SearchButton = ({ onClick }: Props) => {
  return <button onClick={onClick}>Search</button>;
};

export default SearchButton;
