import NamedEndpointResponse from '../types/namedEndpointResponse';
import Pokemon from '../types/pokemon';
import Move from '../types/move';

const baseUrl = 'https://pokeapi.co/api/v2';

const getAllPokemons = async (): Promise<NamedEndpointResponse<Pokemon>> => {
  const response: Response = await fetch(
    `${baseUrl}/pokemon/?${new URLSearchParams({
      offset: '0',
      limit: Number.MAX_SAFE_INTEGER.toString(),
    })}`
  );

  // TODO: custom error, log to console, ErrorBoundary
  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return await response.json();
};

const getAllMoves = async (): Promise<NamedEndpointResponse<Move>> => {
  const response: Response = await fetch(
    `${baseUrl}/move/?${new URLSearchParams({
      offset: '0',
      limit: Number.MAX_SAFE_INTEGER.toString(),
    })}`
  );

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return await response.json();
};

export default {
  getAllPokemons,
  getAllMoves,
};
