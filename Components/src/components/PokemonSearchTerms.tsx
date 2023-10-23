import { Component } from 'react';

type Props = {
  names: string[] | null;
  id: string;
};

class PokemonSearchTerms extends Component<Props> {
  render() {
    return (
      <datalist id={this.props.id}>
        {this.props.names?.map((name, index) => {
          return <option key={index} value={name} />;
        })}
      </datalist>
    );
  }
}

export default PokemonSearchTerms;
