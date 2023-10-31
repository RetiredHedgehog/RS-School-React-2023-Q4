import { useEffect, useState } from 'react';
import SearchTerms from './SearchTerms';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import NamedEndpointResponse from '../../types/namedEndpointResponse';
import NamedApiResource from '../../types/namedAPIResource';
import Pokemon from '../../types/pokemon';

type Props = {
  setSearchText: (text: string) => void;
  setSearchType: (type: string) => void;
  setPage: (page: NamedEndpointResponse<NamedApiResource>) => void;
  searchText: string;
  searchType: string;
};

const Search = ({
  setSearchText,
  setSearchType,
  setPage,
  searchText,
  searchType = 'pokemon',
}: Props) => {
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
        if (typeof error === 'string') {
          setError(new Error(error));
          return;
        }

        if (error instanceof Error && error.name !== 'AbortError') {
          setError(error);
          return;
        }
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
    <div>
      <SearchInput
        id={datalistId}
        searchText={searchText}
        setSearchText={setSearchText}
        setSearchType={setSearchType}
      />
      <SearchButton
        setPage={setPage}
        searchText={searchText}
        searchType={searchType}
      />
      <SearchTerms values={searchTerms} id={datalistId} />
    </div>
  );
};

export default Search;
