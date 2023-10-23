import React, { Component } from 'react';

type State = {
  searchText: string;
};

const saveSearchText = (text: string): void => {
  localStorage.setItem('searchText', text);
};

const getSearchText = (): string => {
  return localStorage.getItem('searchText') || '';
};

class Search extends Component {
  state: State = {
    searchText: getSearchText(),
  };

  handleSearchTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  };

  handleSearchButtonClick = () => {
    saveSearchText(this.state.searchText || '');
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter pokemon, ability or type..."
          list="pokemon-search-terms"
          value={this.state.searchText}
          onChange={(e) => this.handleSearchTextChange(e)}
        />
        <button onClick={this.handleSearchButtonClick}>Search</button>
        <datalist id="pokemon-search-terms" />
      </div>
    );
  }
}

export default Search;
