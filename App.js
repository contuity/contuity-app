import React, { Component } from 'react';
import NavBar from './src/screens/NavBar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(user) {
    this.setState({
      user: user,
    });
  }

  render() {
    return <NavBar />;
  }
}

export default App;
