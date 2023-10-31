import React from 'react';

type Props = {
  id: string;
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearchTypeChange: (text: string) => void;
};

const SearchInput = ({
  id,
  searchText,
  setSearchText,
  handleSearchTypeChange,
}: Props) => {
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchText(e.currentTarget.value);
    handleSearchTypeChange(e.currentTarget.value);
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
