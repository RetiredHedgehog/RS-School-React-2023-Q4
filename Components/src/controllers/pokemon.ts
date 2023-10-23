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

  return await response.json();
};

export default {
  getAllPokemons,
};
