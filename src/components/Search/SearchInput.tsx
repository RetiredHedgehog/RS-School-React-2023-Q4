import React, { useContext } from 'react';
import styles from './Search.module.css';
import SearchTextContext from '../../context';
type Props = {
  id: string;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const SearchInput = ({ id, onInputChange }: Props) => {
  const searchText = useContext(SearchTextContext);
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
