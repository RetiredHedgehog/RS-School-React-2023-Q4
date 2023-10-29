import { Component } from 'react';
import NamedEndpointResponse from '../types/namedEndpointResponse';
import NamedApiResource from '../types/namedAPIResource';
import pokemonServise from '../services/pokemon';
import Pokemon from '../types/pokemon';
import DisplayPokemon from './DisplayPokemon';

type Props = {
  page: NamedEndpointResponse<NamedApiResource> | null;
};

type State = {
  pokemonData: NamedEndpointResponse<Pokemon> | null;
};

class Display extends Component<Props, State> {
  state = {
    pokemonData: null,
  };

  async getpokemonData(name: string) {
    return await pokemonServise.getPokemon(name);
  }

  render() {
    return (
      <div>
        {this.props.page &&
          this.props.page.results.map((elem) => (
            <DisplayPokemon pokemon={elem} key={elem.name} />
          ))}
      </div>
    );
  }
}

export default Display;
