import { Component } from 'react';
import Pokemon from '../types/pokemon';
import NamedEndpointResponse from '../types/namedEndpointResponse';

type Props = {
  page: NamedEndpointResponse<Pokemon> | null;
};

class Display extends Component<Props> {
  render() {
    return (
      <div>
        {this.props.page &&
          this.props.page.results.map((elem) => {
            return (
              <div key={elem.id}>
                <b>{elem.name}</b>
                <img
                  src={elem.sprites.front_default}
                  alt={`${elem.name}'s frontfacing sprite`}
                />
                <ul>
                  <li>Types: {elem.types.map((type) => type.type.name)}</li>
                  <li>Moves: {elem.moves.map((move) => move.move.name)}</li>
                  <li>
                    Stats:
                    <ul>
                      {elem.stats.map((stat) => (
                        <li key={stat.stat.name + stat.base_stat}>
                          {stat.stat.name}: {stat.base_stat}
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Display;
