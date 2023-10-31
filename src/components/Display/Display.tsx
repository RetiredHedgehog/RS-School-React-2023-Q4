import { Component } from 'react';
import NamedEndpointResponse from '../../types/namedEndpointResponse';
import NamedApiResource from '../../types/namedAPIResource';
import DisplayPokemon from './DisplayPokemon';
import styles from './Display.module.css';

type Props = {
  page: NamedEndpointResponse<NamedApiResource> | null;
};

class Display extends Component<Props> {
  render() {
    return (
      <div className={styles.dispaly}>
        {this.props.page &&
          this.props.page.results.map((elem) => (
            <DisplayPokemon pokemon={elem} key={elem.name} />
          ))}
      </div>
    );
  }
}

export default Display;
