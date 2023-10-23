import React, { Component } from 'react';
import pokemonController from '../controllers/pokemon';
import PokemonSearchTerms from './PokemonSearchTerms';

const saveSearchText = (text: string): void => {
  localStorage.setItem('searchText', text);
};

const getSearchText = (): string => {
  return localStorage.getItem('searchText') || '';
};

type State = {
  searchText: string;
  pokemonNames: string[] | null;
};

class Search extends Component {
  state: State = {
    searchText: getSearchText(),
    pokemonNames: null,
  };
  datalistId = 'pokemon-search-terms';

  handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      searchText: e.currentTarget.value,
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
