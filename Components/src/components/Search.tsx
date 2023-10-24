import React, { Component } from 'react';
import pokemonController from '../services/pokemon';
import PokemonSearchTerms from './PokemonSearchTerms';

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
  pokemonNames: string[] | null;
};

class Search extends Component {
  state: State = {
    searchText: getSearchText(),
    searchType: getSearchType(),
    pokemonNames: null,
  };
  datalistId = 'pokemon-search-terms';

  handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  };

  handleSearchTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    saveSearchText('');
    saveSearchType(e.target.value);

    this.setState({
      searchType: e.target.value,
      searchText: '',
    });
  };

  handleSearchButtonClick = () => {
    saveSearchText(this.state.searchText || '');
  };

  async componentDidMount(): Promise<void> {
    const pokemons = await pokemonController.getAllPokemons();
    const names = pokemons.results.map((pokemon) => pokemon.name);
    this.setState({
      pokemonNames: names || null,
    });
  }

  render() {
    return (
      <div>
        <select
          value={this.state.searchType}
          onChange={this.handleSearchTypeChange}
        >
          {selectValues.map((value, index) => (
            <option key={index} value={value.toLowerCase()}>
              {value}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter pokemon, move or type..."
          list={this.datalistId}
          value={this.state.searchText}
          onChange={(e) => this.handleSearchTextChange(e)}
        />
        <button onClick={this.handleSearchButtonClick}>Search</button>
        <PokemonSearchTerms
          names={this.state.pokemonNames}
          id={this.datalistId}
        />
      </div>
    );
  }
}

export default Search;
