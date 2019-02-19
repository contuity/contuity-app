import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import JotService from './src/database/services/JotService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestJots: [],
    };
  }

  componentWillMount() {
    this.setState({ latestJots: JotService.findAll() });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Number of jots: {this.state.latestJots.length}</Text>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderColor: 'red',
    borderWidth: 1,
  },

  flatList: {
    flex: 1,
    textAlign: 'center',
  },
});
