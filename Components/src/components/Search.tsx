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

  setNames = async () => {
    const methods = [
      pokemonServices.getPokemons,
      pokemonServices.getMoves,
      pokemonServices.getTypes,
    ];

    for (let i = 0; i < methods.length; i++) {
      const response = await methods[i]();
      const names = response.results.map((elem) => elem.name);

      this.setState({
        searchTerms: {
          ...this.state.searchTerms,
          [selectValues[i].toLowerCase()]: names,
        },
      });
    }
  };

  async componentDidMount(): Promise<void> {
    this.setNames();
  }

  render() {
    const searchTerms =
      this.state.searchTerms[this.state.searchType.toLowerCase()] || null;

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
        <SearchTerms values={searchTerms} id={this.datalistId} />
      </div>
    );
  }
}

export default Search;
