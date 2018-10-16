import React, { Component } from 'react';
import './App.css';

import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="d-flex flex-wrap justify-content-left position-absolute  w-100 h-100 align-items-left align-content-left">
        <Home />
      </div>
    );
  }
}

export default App;
