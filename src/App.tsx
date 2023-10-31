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
  searchType: string;
  error: Error | null;
};

class App extends Component {
  state: State = {
    page: null,
    limit: 10,
    offset: 0,
    searchText: helpers.getSearchText(),
    searchType: helpers.getSearchType(),
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

  setSearchText = (text: string) => {
    this.setState({
      searchText: text,
    });
  };

  setPage = (page: NamedEndpointResponse<NamedApiResource>) => {
    this.setState({
      page,
    });
  };

  setSearchType = (type: string) => {
    this.setState({
      searchType: type,
    });
  };

  render() {
    return (
      <>
        <ErrorButton />
        <Search
          offset={this.state.offset}
          limit={this.state.limit}
          setSearchText={this.setSearchText}
          setSearchType={this.setSearchType}
          setPage={this.setPage}
          searchText={this.state.searchText}
          searchType={this.state.searchType}
        />
        <Display page={this.state.page} />
      </>
    );
  }
}

export default App;
