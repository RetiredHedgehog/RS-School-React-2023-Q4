import SearchTerms from './SearchTerms';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import ErrorButton from './ErrorButton';
import styles from './Search.module.css';

type Props = {
  searchText: string;
  searchTerms: string[];
  onClick: () => Promise<void>;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Search = ({ searchTerms, searchText, onClick, onInputChange }: Props) => {
  const datalistId = 'pokemon-search-terms';

  return (
    <div className={styles.search}>
      <SearchInput
        id={datalistId}
        searchText={searchText}
        onInputChange={onInputChange}
      />
      <SearchButton onClick={onClick} />
      <ErrorButton />
      <SearchTerms values={searchTerms} id={datalistId} />
    </div>
  );
};

export default Search;
