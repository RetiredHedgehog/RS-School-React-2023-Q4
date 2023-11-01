import { useEffect, useState } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Display from './components/Display/Display';
import NamedEndpointResponse from './types/namedEndpointResponse';
import pokemonService from './services/pokemon';
import NamedApiResource from './types/namedAPIResource';
import helpers from './helpers';

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
      pokemonService
        .getPokemons(setError, controller, offset, limit)
        .then((data) => setPage(data));
    } else {
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
    }
    return () => controller.abort();
  }, []);

  const handleSearchButtonClick = async (): Promise<void> => {
    helpers.saveSearchText(searchText);

    if (searchText === '') {
      try {
        const page = await pokemonService.getPokemons(setError, null, 0, 10);
        setPage(page);
      } catch (error: unknown) {
        helpers.handleFetchError(error, setError);
      }
      return;
    }

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
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  if (error) {
    throw error;
  }

  return (
    <>
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
