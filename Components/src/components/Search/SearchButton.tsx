import React, { Component } from 'react';
import NamedEndpointResponse from '../../types/namedEndpointResponse';
import NamedApiResource from '../../types/namedAPIResource';
import helpers from '../../helpers';

type Props = {
  searchText: string;
  searchType: string;
  setPage: (page: NamedEndpointResponse<NamedApiResource>) => void;
};

class SearchButton extends Component<Props> {
  handleSearchClick = async (text: string, type: string) => {
    helpers.saveSearchText(text);
    helpers.saveSearchType(type);

    switch (type) {
      case 'pokemon':
        this.props.setPage({
          count: 1,
          next: null,
          previous: null,
          results: [
            {
              name: text,
              url: `https://pokeapi.co/api/v2/pokemon/${text}`,
            },
          ],
        });
        break;
      case 'move':
        break;
      case 'type':
        break;
    }
  };

  render() {
    return (
      <button
        onClick={() =>
          this.handleSearchClick(this.props.searchText, this.props.searchType)
        }
      >
        Search
      </button>
    );
  }
}

export default SearchButton;
