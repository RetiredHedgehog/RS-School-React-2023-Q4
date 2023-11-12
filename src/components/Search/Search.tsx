import SearchTerms from './SearchTerms';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import ErrorButton from './ErrorButton';
import styles from './Search.module.css';

type Props = {
  searchTerms: string[];
  onClick: () => Promise<void>;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Search = ({ searchTerms, onClick, onInputChange }: Props) => {
  const datalistId = 'pokemon-search-terms';

  return (
    <div className={styles.search}>
      <SearchInput id={datalistId} onInputChange={onInputChange} />
      <SearchButton onClick={onClick} />
      <ErrorButton />
      <SearchTerms values={searchTerms} id={datalistId} />
    </div>
  );
};

export default Search;
