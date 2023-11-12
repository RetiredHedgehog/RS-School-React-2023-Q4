import { useEffect, useState } from 'react';
import NamedApiResource from '../../types/namedAPIResource';
import Pokemon from '../../types/pokemon';
import styles from './Display.module.css';
import helpers from '../../helpers';

type Props = {
  pokemon: NamedApiResource;
};

const DisplayPokemon = ({ pokemon }: Props) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(pokemon.url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setPokemonData(data))
      .catch((error: unknown) => helpers.handleFetchError(error, setError));
    return () => controller.abort();
  }, []);

  if (error) {
    throw error;
  }

  return (
    pokemonData && (
      <div key={pokemonData.id} className={styles.pokemon}>
        <b>{pokemonData.name}</b>
        <img
          src={pokemonData.sprites.front_default}
          alt={`${pokemonData.name}'s frontfacing sprite`}
        />
        <ul>
          <li>
            Types: {pokemonData.types.map((type) => type.type.name).join(', ')}
          </li>
          <li>
            Moves: {pokemonData.moves.map((move) => move.move.name).join(', ')}
          </li>
          <li>
            Stats:
            <ul>
              {pokemonData.stats.map((stat) => (
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
};

export default DisplayPokemon;
