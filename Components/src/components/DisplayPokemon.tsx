import { Component } from 'react';
import NamedApiResource from '../types/namedAPIResource';
import Pokemon from '../types/pokemon';

type Props = {
  pokemon: NamedApiResource;
};

type State = {
  pokemon: Pokemon | null;
};

class DisplayPokemon extends Component<Props> {
  state: State = {
    pokemon: null,
  };

  async componentDidMount(): Promise<void> {
    const response = await fetch(this.props.pokemon.url);

    if (!response.ok) {
      throw new Error(`Coudn't get pokemon's data`);
    }

    const pokemon: Pokemon = await response.json();
    this.setState({ pokemon: pokemon });
  }

  render() {
    const pokemon = this.state.pokemon;

    return (
      pokemon && (
        <div key={pokemon.id}>
          <b>{pokemon.name}</b>
          <img
            src={pokemon.sprites.front_default}
            alt={`${pokemon.name}'s frontfacing sprite`}
          />
          <ul>
            <li>
              Types: {pokemon.types.map((type) => type.type.name).join(', ')}
            </li>
            <li>
              Moves: {pokemon.moves.map((move) => move.move.name).join(', ')}
            </li>
            <li>
              Stats:
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.stat.name + stat.base_stat}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )
    );
  }
}

export default DisplayPokemon;
