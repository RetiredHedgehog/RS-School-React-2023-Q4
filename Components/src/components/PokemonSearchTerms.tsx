import { Component } from 'react';

type Props = {
  values: string[] | null;
  id: string;
};

class PokemonSearchTerms extends Component<Props> {
  render() {
    return (
      <datalist id={this.props.id}>
        {this.props.values?.map((value, index) => {
          return <option key={index} value={value} />;
        })}
      </datalist>
    );
  }
}

export default PokemonSearchTerms;
