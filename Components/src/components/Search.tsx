import React, { Component } from 'react';
import pokemonServices from '../services/pokemon';
import SearchTerms from './SearchTerms';
import SearchTypeSelect from './SearchTypeSelect';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';

const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const getFromLocalStorage = (key: string): string => {
  return localStorage.getItem(key) || '';
};

const saveSearchText = (text: string): void => {
  saveToLocalStorage('searchText', text);
};

const saveSearchType = (text: string): void => {
  saveToLocalStorage('searchType', text);
};

const getSearchText = (): string => {
  return getFromLocalStorage('searchText');
};

const getSearchType = (): string => {
  const DEFAULT_TYPE = 'Pokemon';
  return getFromLocalStorage('searchType') || DEFAULT_TYPE;
};

const selectValues = ['Pokemon', 'Move', 'Type'];

type State = {
  searchText: string;
  searchType: string;
  searchTerms: {
    [key: string]: string[];
  };
};

class Search extends Component {
  state: State = {
    searchText: getSearchText(),
    searchType: getSearchType(),
    searchTerms: {},
  };
  datalistId = 'pokemon-search-terms';

  handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  };

  handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      searchType: e.target.value,
      searchText: '',
    });
  };

  handleSearchButtonClick = () => {
    saveSearchText(this.state.searchText || '');
    saveSearchType(this.state.searchType);
  };

  async componentDidMount(): Promise<void> {
    const [pokemons, moves] = await Promise.allSettled([
      pokemonServices.getPokemons(),
      pokemonServices.getMoves(),
    ]);

    //  TODO: refactor, if type also hase 'name' property
    const namesPokemon =
      pokemons.status === 'fulfilled'
        ? pokemons.value.results.map((pokemon) => pokemon.name)
        : [];
    const namesMoves =
      moves.status === 'fulfilled'
        ? moves.value.results.map((move) => move.name)
        : [];

    this.setState({
      searchTerms: {
        pokemon: namesPokemon,
        move: namesMoves,
      },
    });
  }

  render() {
    return (
      <div>
        <SearchTypeSelect
          searchType={this.state.searchType}
          selectValues={selectValues}
          onChange={this.handleSearchTypeChange}
        />
        <SearchInput
          datalistId={this.datalistId}
          searchText={this.state.searchText}
          onChange={this.handleSearchTextChange}
        />
        <SearchButton onClick={this.handleSearchButtonClick} />
        <SearchTerms
          values={
            this.state.searchTerms[this.state.searchType.toLowerCase()] || null
          }
          id={this.datalistId}
        />
      </div>
    );
  }
}

export default Search;
