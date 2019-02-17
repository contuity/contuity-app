/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import realm from './src/database/realm';

const Realm = require('realm');

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Jot from './src/database/models/Jot';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    realm.write(() => {
      realm.create('Jot', {
        id: 4,
        content: 'This is my fourth jot',
        dateCreated: new Date(),
        dateModified: new Date(),
      });
    });
    this.setState({ realm });
  }

  render() {
    const info = this.state.realm
      ? 'Number of jots in this Realm: ' +
      this.state.realm.objects('Jot').length
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{info}</Text>
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
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});
