import PokemonMove from './pokemonMove';
import PokemonType from './pokemonType';
import PokemonStat from './pokemonStat';
import PokemonSprites from './pokemonSprites';

type Pokemon = {
  id: number;
  name: string;
  moves: PokemonMove[];
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
};

export default Pokemon;
