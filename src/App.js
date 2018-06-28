import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'

import WatsonForm from './components/Form.js'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Watson Text Analyzer</h1>
          </header>
          <WatsonForm />
        </div>
      </Router>
    );
  }
}

export default App;
