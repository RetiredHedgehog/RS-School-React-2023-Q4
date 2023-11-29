import { useEffect, useState } from 'react';
import './App.module.css';
import Search from './components/Search/Search';
import Display from './components/Display/Display';
import NamedEndpointResponse from './types/namedEndpointResponse';
import pokemonService from './services/pokemon';
import NamedApiResource from './types/namedAPIResource';
import helpers from './helpers';
import Pagination from './components/Pagination';
import Context from './context';
import useSearchInput from './hooks/input';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';

const App = ({ searchTerms }: { searchTerms: string[] }) => {
  console.log(searchTerms);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [limit, setLimit] = useState(10);
  const offset = (Number(searchParams.get('p')) || 0) * limit;
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] =
    useState<NamedEndpointResponse<NamedApiResource> | null>(null);
  const { searchText, handleInputChange } = useSearchInput();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const searchText = helpers.getSearchText();
    const controller = new AbortController();
    if (!searchText) {
      pokemonService
        .getPokemons(setError, controller, offset, limit)
        .then((data) => {
          setPage(data);
          setIsLoading(false);
        });
    } else {
      const results = helpers.partialSearch(searchTerms, searchText);
      let sliced = [];

      if (results.length < limit) {
        sliced = results;
      } else if (offset >= results.length) {
        sliced = results.slice(
          results.length % limit === 0
            ? results.length - limit
            : results.length - (results.length % limit)
        );
      } else {
        sliced = results.slice(offset, offset + limit);
      }

      setPage({
        count: results.length,
        next: null,
        previous: null,
        results: sliced,
      });
      setIsLoading(false);
    }

    return () => controller.abort();
  }, [limit, offset, searchTerms]);

  const handleSearchButtonClick = async (): Promise<void> => {
    setIsLoading(true);
    helpers.saveSearchText(searchText);

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          p: '0',
        },
      },
      undefined,
      {}
    );

    if (!searchText) {
      try {
        const page = await pokemonService.getPokemons(
          setError,
          null,
          offset,
          limit
        );
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
      results: results.slice(
        offset > results.length ? results.length - 1 : offset,
        offset + limit
      ),
    });
    setIsLoading(false);
  };

  if (error) {
    throw error;
  }

  return (
    <Context.Provider
      value={{
        searchText,
        page,
        limit,
        offset,
        setLimit,
        isLoading,
        searchTerms,
        handleSearchButtonClick,
        handleInputChange,
      }}
    >
      <Search />
      <Display />
      <Pagination />
    </Context.Provider>
  );
};

export default App;
