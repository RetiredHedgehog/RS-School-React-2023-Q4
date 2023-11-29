import { createContext } from 'react';
import helpers from './helpers';
import NamedEndpointResponse from './types/namedEndpointResponse';
import NamedApiResource from './types/namedAPIResource';
type ContextType = {
  searchText: string;
  page: NamedEndpointResponse<NamedApiResource> | null;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
  isLoading: boolean;
  searchTerms: string[];
  handleSearchButtonClick: () => Promise<void>;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
};
const Context = createContext<ContextType>({
  searchText: helpers.getSearchText(),
  page: null,
  limit: 10,
  offset: 0,
  setLimit: () => {},
  isLoading: true,
  searchTerms: [],
  handleSearchButtonClick: async () => {},
  handleInputChange: () => {},
});

export default Context;
