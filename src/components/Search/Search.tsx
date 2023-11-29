import SearchTerms from './SearchTerms';
import SearchInput from './SearchInput';
import styles from './Search.module.css';
import { useContext, useState } from 'react';
import Context from '../../context';
import Button from './Button';

const Search = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const datalistId = 'pokemon-search-terms';
  const { searchTerms, handleInputChange, handleSearchButtonClick } =
    useContext(Context);

  if (hasError) {
    throw new Error('This is a test error');
  }
  return (
    <div className={styles.search}>
      <SearchInput id={datalistId} onInputChange={handleInputChange} />
      <Button onClick={handleSearchButtonClick}>Search</Button>
      <Button onClick={() => setHasError(true)}>Throw error</Button>
      <SearchTerms values={searchTerms} id={datalistId} />
    </div>
  );
};

export default Search;
