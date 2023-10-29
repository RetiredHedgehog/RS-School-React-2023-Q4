import React, { Component } from 'react';

type Props = {
  searchType: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectValues: string[];
};

class SearchTypeSelect extends Component<Props> {
  render() {
    return (
      <select value={this.props.searchType} onChange={this.props.onChange}>
        {this.props.selectValues.map((value, index) => (
          <option key={index} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    );
  }
}

export default SearchTypeSelect;
