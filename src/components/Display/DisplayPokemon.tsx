import { Component } from 'react';
import NamedApiResource from '../../types/namedAPIResource';
import Pokemon from '../../types/pokemon';
import styles from './Display.module.css';

type Props = {
  pokemon: NamedApiResource;
};

type State = {
  pokemon: Pokemon | null;
  error: Error | null;
};

class DisplayPokemon extends Component<Props> {
  state: State = {
    pokemon: null,
    error: null,
  };

  async componentDidMount(): Promise<void> {
    try {
      const response = await fetch(this.props.pokemon.url);

      if (!response.ok) {
        throw new Error(
          `Coudn't get pokemon's data. Status code: ${response.status}`
        );
      }

      const pokemon: Pokemon = await response.json();
      this.setState({ pokemon: pokemon });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    const pokemon = this.state.pokemon;

    return (
      pokemon && (
        <div key={pokemon.id} className={styles.pokemon}>
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
