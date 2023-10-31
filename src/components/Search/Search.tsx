import { useEffect, useState } from 'react';
import SearchTerms from './SearchTerms';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import NamedEndpointResponse from '../../types/namedEndpointResponse';
import Pokemon from '../../types/pokemon';
import helpers from '../../helpers';
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
    const DEFAULT_OFFSET = 0;
    const DEFAULT_LIMIT = Number.MAX_SAFE_INTEGER;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?${new URLSearchParams({
            offset: DEFAULT_OFFSET.toString(),
            limit: DEFAULT_LIMIT.toString(),
          })}`,

          {
            signal: controller.signal,
          }
        );
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        const data: NamedEndpointResponse<Pokemon> = await response.json();

        setSearchTerms(data.results.map((pokemon) => pokemon.name));
      } catch (error: unknown) {
        helpers.handleFetchError(error, setError);
      }
    };

    fetchData();

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
