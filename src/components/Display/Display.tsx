import { Component } from 'react';
import NamedEndpointResponse from '../../types/namedEndpointResponse';
import NamedApiResource from '../../types/namedAPIResource';
import DisplayPokemon from './DisplayPokemon';
import './Display.css';

type Props = {
  page: NamedEndpointResponse<NamedApiResource> | null;
};

class Display extends Component<Props> {
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
