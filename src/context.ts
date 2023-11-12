import { createContext } from 'react';
import helpers from './helpers';
import NamedEndpointResponse from './types/namedEndpointResponse';
import NamedApiResource from './types/namedAPIResource';
type ContextType = {
  searchText: string;
  page: NamedEndpointResponse<NamedApiResource> | null;
};
const Context = createContext<ContextType>({
  searchText: helpers.getSearchText(),
  page: null,
});

export default Context;
