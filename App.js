import React, { Component } from 'react';
import NavBar from './src/screens/NavBar';
import Login from './src/screens/Login';

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
    if (this.state.user == null) {
      return <Login onLogin={this.onLogin} />;
    } 
    return <NavBar />;
  }
}

export default App;
