import React, { Component } from 'react';

type Props = {
  datalistId: string;
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearchTypeChange: (text: string) => void;
};

class SearchInput extends Component<Props> {
  handleTextChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.props.setSearchText(e.currentTarget.value);
    this.props.handleSearchTypeChange(e.currentTarget.value);
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Enter pokemon name..."
        list={this.props.datalistId}
        value={this.props.searchText}
        onChange={this.handleTextChange}
      />
    );
  }
}

export default SearchInput;
