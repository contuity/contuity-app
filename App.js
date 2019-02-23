import React, { Component } from 'react';
import AllJotsScreen from './src/screens/AllJotsScreen';
import NewJot from './src/screens/NewJot';

class App extends Component {
  render() {
    return <NewJot />;
    return <AllJotsScreen />;
  }
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });
