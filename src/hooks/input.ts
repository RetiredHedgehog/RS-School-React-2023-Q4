import React, { useState } from 'react';
import helpers from '../helpers';

type UseSearchInput = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const useSearchInput = (
  str: string = helpers.getSearchText()
): UseSearchInput => {
  const [searchText, setSearchText] = useState(str);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  return {
    searchText,
    setSearchText,
    handleInputChange,
  };
};

export default useSearchInput;
