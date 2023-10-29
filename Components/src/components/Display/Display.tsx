import { Component } from 'react';
import NamedEndpointResponse from '../../types/namedEndpointResponse';
import NamedApiResource from '../../types/namedAPIResource';
import Pokemon from '../../types/pokemon';
import DisplayPokemon from './DisplayPokemon';
import './Display.css';

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

  render() {
    return (
      <div className="pokemons-wrapper">
        {this.props.page &&
          this.props.page.results.map((elem) => (
            <DisplayPokemon pokemon={elem} key={elem.name} />
          ))}
      </div>
    );
  }
}

export default Display;
