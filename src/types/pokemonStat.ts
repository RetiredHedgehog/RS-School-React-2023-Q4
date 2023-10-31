import NamedApiResource from './namedAPIResource';

type PokemonStat = {
  stat: NamedApiResource;
  effort: number;
  base_stat: number;
};

export default PokemonStat;
