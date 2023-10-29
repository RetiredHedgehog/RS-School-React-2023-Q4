import { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Display from './components/Display';
import NamedEndpointResponse from './types/namedEndpointResponse';
import pokemonService from './services/pokemon';
import NamedApiResource from './types/namedAPIResource';

type State = {
  page: NamedEndpointResponse<NamedApiResource> | null;
};

class App extends Component {
  state: State = {
    page: null,
  };

  async componentDidMount(): Promise<void> {
    const page = await pokemonService.getPokemons(0, 10);

    console.log(page);
    this.setState({ page });
  }

  render() {
    return (
      <>
        <Search />
        <Display page={this.state.page} />
      </>
    );
  }
}

export default App;
