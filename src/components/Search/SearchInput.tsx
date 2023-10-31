import React from 'react';

type Props = {
  id: string;
  searchText: string;
  setSearchText: (text: string) => void;
  setSearchType: (text: string) => void;
};

const SearchInput = ({
  id,
  searchText,
  setSearchText,
  setSearchType,
}: Props) => {
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchText(e.currentTarget.value);
    setSearchType('pokemon');
  };

  return (
    <input
      type="text"
      placeholder="Enter pokemon name..."
      list={id}
      value={searchText}
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
