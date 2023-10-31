import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Display from './components/Display/Display';
import NamedEndpointResponse from './types/namedEndpointResponse';
import pokemonService from './services/pokemon';
import NamedApiResource from './types/namedAPIResource';
import helpers from './helpers';
import ErrorButton from './components/ErrorButton';

const App = () => {
  const [limit] = useState(10);
  const [offset] = useState(0);
  const [page, setPage] =
    useState<NamedEndpointResponse<NamedApiResource> | null>(null);
  const [searchText, setSearchText] = useState(helpers.getSearchText());
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const searchText = helpers.getSearchText();
    const controller = new AbortController();

    if (!searchText) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?${new URLSearchParams({
              offset: offset.toString(),
              limit: limit.toString(),
            })}`,
            {
              signal: controller.signal,
            }
          );
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          const page: NamedEndpointResponse<NamedApiResource> =
            await response.json();

          setPage(page);
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
      return;
    }

    setPage({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: searchText,
          url: `https://pokeapi.co/api/v2/pokemon/${searchText}`,
        },
      ],
    });

    return () => controller.abort();
  }, [offset, limit]);

  const handleSearchButtonClick = async (): Promise<void> => {
    helpers.saveSearchText(searchText);

    if (searchText === '') {
      const page = await pokemonService.getPokemons(0, 10);
      setPage(page);
    } else {
      setPage({
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: searchText,
            url: helpers.getPokemonUrl(searchText),
          },
        ],
      });
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  if (error) {
    throw error;
  }

  return (
    <>
      <ErrorButton />
      <Search
        searchText={searchText}
        onClick={handleSearchButtonClick}
        onInputChange={handleInputChange}
      />
      <Display page={page} />
    </>
  );
};

export default App;
