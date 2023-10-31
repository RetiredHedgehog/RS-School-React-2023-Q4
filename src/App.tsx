import { Component } from 'react';
import './App.css';
import Search from './components/Search/Search';
import Display from './components/Display/Display';
import NamedEndpointResponse from './types/namedEndpointResponse';
import pokemonService from './services/pokemon';
import NamedApiResource from './types/namedAPIResource';
import helpers from './helpers';
import ErrorButton from './components/ErrorButton';

type State = {
  page: NamedEndpointResponse<NamedApiResource> | null;
  limit: number;
  offset: number;
  searchText: string;
  error: Error | null;
};

class App extends Component {
  state: State = {
    page: null,
    limit: 10,
    offset: 0,
    searchText: helpers.getSearchText(),
    error: null,
  };

  async componentDidMount(): Promise<void> {
    const text = helpers.getSearchText();
    if (!text) {
      const page = await pokemonService.getPokemons(0, 10);
      this.setState({ page });
      return;
    }

    this.setState({
      page: {
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: text,
            url: `https://pokeapi.co/api/v2/pokemon/${text}`,
          },
        ],
      },
    });
  }

  handleSearchButtonClick = async (): Promise<void> => {
    const searchText = this?.state.searchText || '';

    helpers.saveSearchText(searchText);

    if (searchText === '') {
      const page = await pokemonService.getPokemons(0, 10);
      this.setState({ page: page });
    } else {
      this.setState({
        page: {
          count: 1,
          next: null,
          previous: null,
          results: [
            {
              name: searchText,
              url: helpers.getPokemonUrl(searchText),
            },
          ],
        },
      });
    }
  };

  onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  };

  setPage = (page: NamedEndpointResponse<NamedApiResource>) => {
    this.setState({
      page,
    });
  };

  render() {
    return (
      <>
        <ErrorButton />
        <Search
          searchText={this.state.searchText}
          onClick={this.handleSearchButtonClick}
          onInputChange={this.onInputChange}
        />
        <Display page={this.state.page} />
      </>
    );
  }
}

export default App;
