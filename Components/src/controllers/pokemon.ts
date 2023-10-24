import NamedEndpointResponse from '../types/namedEndpointResponse';
import Pokemon from '../types/pokemon';

const baseUrl = 'https://pokeapi.co/api/v2';

const getAllPokemons = async (): Promise<NamedEndpointResponse<Pokemon>> => {
  const response: Response = await fetch(
    `${baseUrl}/pokemon/?${new URLSearchParams({
      offset: '0',
      limit: '99999',
    })}`
  );

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return await response.json();
};

export default {
  getAllPokemons,
};
