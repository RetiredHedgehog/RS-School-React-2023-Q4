import React, { Component } from 'react';

type Props = {
  onClick: () => void;
};

class SearchButton extends Component<Props> {
  render() {
    return <button onClick={this.props.onClick}>Search</button>;
  }
}

export default SearchButton;
