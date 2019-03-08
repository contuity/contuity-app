import React, { Component } from 'react';
import AllJotsScreen from './src/screens/AllJotsScreen';
import Login from './src/screens/Login';

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(user) {
    this.setState({
      user: user
    })
  }

  render() {


    if (this.state.user == null) {
      return <Login onLogin={this.onLogin} />;
    }
    else {
      return <AllJotsScreen user={this.state.user}/>
    }
  }
}

export default App;
