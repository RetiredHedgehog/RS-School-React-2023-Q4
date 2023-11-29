import DisplayPokemon from './DisplayPokemon';
import styles from './Display.module.css';
import Context from '../../context';
import { useContext } from 'react';

const Display = () => {
  const { page, isLoading } = useContext(Context);
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
