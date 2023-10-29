import { Component } from 'react';
import './App.css';
import Search from './components/Search';
import Display from './components/Display';
import NamedEndpointResponse from './types/namedEndpointResponse';
import Pokemon from './types/pokemon';

type State = {
  page: NamedEndpointResponse<Pokemon> | null;
};

class App extends Component {
  state: State = {
    page: null,
  };

  render() {
    return (
      <>
        <Search />
        <Display page={this.state.page} />
      </>
    );
  }
}

export default App;
