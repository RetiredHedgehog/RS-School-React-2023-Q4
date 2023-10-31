import NamedApiResource from './namedAPIResource';

type Move = {
  id: number;
  name: string;
  learned_by_pokemon: NamedApiResource[];
};

export default Move;
