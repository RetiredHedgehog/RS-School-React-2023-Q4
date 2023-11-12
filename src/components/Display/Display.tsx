import DisplayPokemon from './DisplayPokemon';
import styles from './Display.module.css';
import Context from '../../context';
import { useContext } from 'react';

type Props = {
  isLoading: boolean;
};

const Display = ({ isLoading }: Props) => {
  const { page } = useContext(Context);
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
