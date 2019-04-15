import React, { Component } from 'react';
import AllJotsScreen from './AllJotsScreen';
import PeopleScreen from './PeopleScreen';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // user: null,
    };

    // this.onLogin = this.onLogin.bind(this);
  }

  render() {

    let viewStyle = {
      // height: 100
    }


    let navBarStyle = {};

    return (
      
      <View style={viewStyle}>
          <AllJotsScreen user={this.state.user} />
          <View style={navBarStyle} />


      </View>


      );


      return 
    // }
    // // return <AllJotsScreen user={this.state.user} />;
    // return <PeopleScreen />;
  }
}

export default NavBar;
