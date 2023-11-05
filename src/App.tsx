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
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] =
    useState<NamedEndpointResponse<NamedApiResource> | null>(null);
  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [searchText, setSearchText] = useState(helpers.getSearchText());
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const searchText = helpers.getSearchText();
    const controllers: AbortController[] = [];

    const controller = new AbortController();
    controllers.push(controller);
    pokemonService
      .getPokemons(setError, controller)
      .then((data) => {
        const names = data.results.map((pokemon) => pokemon.name).sort();
        setSearchTerms(names);
        return names;
      })
      .then((names) => {
        if (!searchText) {
          const controller = new AbortController();
          controllers.push(controller);
          controllers.push();
          pokemonService
            .getPokemons(setError, controller, offset, limit)
            .then((data) => {
              setPage(data);
              setIsLoading(false);
            });
        } else {
          const results = helpers.partialSearch(names, searchText);

          setPage({
            count: results.length,
            next: null,
            previous: null,
            results,
          });
          setIsLoading(false);
        }
      });

    return () => controllers.forEach((controller) => controller.abort());
  }, []);

  const handleSearchButtonClick = async (): Promise<void> => {
    setIsLoading(true);
    helpers.saveSearchText(searchText);
    if (!searchText) {
      try {
        const page = await pokemonService.getPokemons(setError, null, 0, 10);
        setPage(page);
        setIsLoading(false);
      } catch (error: unknown) {
        helpers.handleFetchError(error, setError);
      }
      return;
    }

    const results = helpers.partialSearch(searchTerms, searchText);

    setPage({
      count: results.length,
      next: null,
      previous: null,
      results,
    });
    setIsLoading(false);
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
        searchTerms={searchTerms}
        onClick={handleSearchButtonClick}
        onInputChange={handleInputChange}
      />
      <Display page={page} isLoading={isLoading} />
    </>
  );
};

export default App;
