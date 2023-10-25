import NamedEndpointResponse from '../types/namedEndpointResponse';
import Pokemon from '../types/pokemon';
import Move from '../types/move';

const baseUrl = 'https://pokeapi.co/api/v2';
const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = Number.MAX_SAFE_INTEGER;

const getPokemons = async (
  offset = DEFAULT_OFFSET,
  limit = DEFAULT_LIMIT
): Promise<NamedEndpointResponse<Pokemon>> => {
  const response: Response = await fetch(
    `${baseUrl}/pokemon/?${new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    })}`
  );

  // TODO: custom error, log to console, ErrorBoundary
  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return await response.json();
};

const getMoves = async (
  offset = DEFAULT_OFFSET,
  limit = DEFAULT_LIMIT
): Promise<NamedEndpointResponse<Move>> => {
  const response: Response = await fetch(
    `${baseUrl}/move/?${new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
    })}`
  );

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return await response.json();
};

export default {
  getPokemons,
  getMoves,
};
