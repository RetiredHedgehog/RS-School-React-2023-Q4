import { Component } from 'react';

type Props = {
  datalistId: string;
  searchText: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

class SearchInput extends Component<Props> {
  render() {
    return (
      <input
        type="text"
        placeholder="Enter pokemon, move or type..."
        list={this.props.datalistId}
        value={this.props.searchText}
        onChange={this.props.onChange}
      />
    );
  }
}

export default SearchInput;
