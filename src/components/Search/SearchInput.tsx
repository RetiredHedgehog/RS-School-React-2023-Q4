import React from 'react';
import styles from './Search.module.css';
type Props = {
  id: string;
  searchText: string;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ id, searchText, onInputChange }: Props) => {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder="Enter pokemon name..."
      list={id}
      value={searchText}
      onChange={onInputChange}
    />
  );
};

export default SearchInput;
