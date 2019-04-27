import React, { Component } from 'react';
import AllJotsScreen from './src/screens/AllJotsScreen';
import PeopleScreen from './src/screens/PeopleScreen';
import Login from './src/screens/Login';
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
    if (this.state.user == null) {
      return <Login onLogin={this.onLogin} />;
    } else {
      return <NavBar user={this.state.user} />;
    }
  }
}

export default App;
