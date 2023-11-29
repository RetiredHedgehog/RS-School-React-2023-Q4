import App from '../src/App';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';
import pokemonService from '../src/services/pokemon';
export const getServerSideProps = async () => {
  const controller = new AbortController();
  const data = await pokemonService.getPokemons(() => {}, controller);
  const names = data.results.map((pokemon) => pokemon.name).sort();
  return {
    props: {
      searchTerms: names,
    },
  };
};

const Index = ({ searchTerms = [] }: { searchTerms: string[] }) => {
  return (
    <ErrorBoundary>
      <div id="root">
        <App searchTerms={searchTerms} />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
