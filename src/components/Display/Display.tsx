import NamedEndpointResponse from '../../types/namedEndpointResponse';
import NamedApiResource from '../../types/namedAPIResource';
import DisplayPokemon from './DisplayPokemon';
import styles from './Display.module.css';

type Props = {
  isLoading: boolean;
  page: NamedEndpointResponse<NamedApiResource> | null;
};

const Display = ({ isLoading, page }: Props) => {
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.dispaly}>
      {page &&
        page.results.map((elem) => (
          <DisplayPokemon pokemon={elem} key={elem.name} />
        ))}
    </div>
  );
};

export default Display;
