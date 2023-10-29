import { Component } from 'react';
import pokemonServices from '../services/pokemon';
import SearchTerms from './SearchTerms';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import NamedEndpointResponse from '../types/namedEndpointResponse';
import NamedApiResource from '../types/namedAPIResource';

const selectValues = ['Pokemon'];
const datalistId = 'pokemon-search-terms';

const findType = (searchTerms: { [key: string]: string[] }, text: string) => {
  for (const term in searchTerms) {
    if (Object.hasOwn(searchTerms, term)) {
      if (searchTerms[term].find((string) => string.includes(text))) {
        return term;
      }
    }
  }

  return 'pokemon';
};

type Props = {
  limit: number;
  offset: number;
  setSearchText: (text: string) => void;
  setSearchType: (type: string) => void;
  setPage: (page: NamedEndpointResponse<NamedApiResource>) => void;
  searchText: string;
  searchType: string;
};

type State = {
  searchTerms: {
    [key: string]: string[];
  };
  error: Error | null;
};

class Search extends Component<Props> {
  state: State = {
    searchTerms: {},
    error: null,
  };

  setNames = async () => {
    const methods = [
      pokemonServices.getPokemons,
      pokemonServices.getMoves,
      pokemonServices.getTypes,
    ];

    for (let i = 0; i < methods.length; i++) {
      const response = await methods[i]();
      const names = response.results.map((elem) => elem.name);

      if (selectValues[i] !== undefined) {
        this.setState({
          searchTerms: {
            ...this.state.searchTerms,
            [selectValues[i].toLowerCase()]: names,
          },
        });
      }
    }
  };

  handleSearchTypeChange = (text: string) => {
    this.props.setSearchType(findType(this.state.searchTerms, text));
  };

  async componentDidMount(): Promise<void> {
    try {
      this.setNames();
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    const searchTerms = Object.values(this.state.searchTerms).reduce(
      (acc, arr) => [...acc, ...arr],
      []
    );

    return (
      <div>
        <SearchInput
          datalistId={datalistId}
          searchText={this.props.searchText}
          setSearchText={this.props.setSearchText}
          handleSearchTypeChange={this.handleSearchTypeChange}
        />
        <SearchButton
          setPage={this.props.setPage}
          searchText={this.props.searchText}
          searchType={this.props.searchType}
        />
        <SearchTerms values={searchTerms} id={datalistId} />
      </div>
    );
  }
}

export default Search;
