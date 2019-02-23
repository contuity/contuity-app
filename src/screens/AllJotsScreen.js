import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';

class AllJotsScreen extends Component {
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
    let textElements = [];
    for (let item of this.state.latestJots) {
      textElements.push(<Text>{item.content}</Text>);
    }

    return <View style={styles.container}>{textElements}</View>;
  }
}

export default AllJotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
