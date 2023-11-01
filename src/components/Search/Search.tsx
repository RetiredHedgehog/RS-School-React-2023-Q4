import { useEffect, useState } from 'react';
import SearchTerms from './SearchTerms';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import pokemonService from '../../services/pokemon';
import ErrorButton from './ErrorButton';
import styles from './Search.module.css';

type Props = {
  searchText: string;
  onClick: () => Promise<void>;
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Search = ({ searchText, onClick, onInputChange }: Props) => {
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    pokemonService
      .getPokemons(setError, controller)
      .then((data) =>
        setSearchTerms(data.results.map((pokemon) => pokemon.name).sort())
      );

    return () => controller.abort();
  }, []);

  if (error) {
    throw error;
  }

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
