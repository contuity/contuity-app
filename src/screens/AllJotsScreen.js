import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import NewJot from './NewJot';
import Jot from '../database/models/Jot.js';
import JotService from '../database/services/JotService';
import JotList from '../components/JotList';

class AllJotsScreen extends Component {
  constructor(props) {
    super(props);
    this.showNewJotPage = this.showNewJotPage.bind(this);
    this.onJotFinished = this.onJotFinished.bind(this);
    this.state = {
      latestJots: [],
      todaysJots: [],
      thisWeeksJots: [],
      isShowingNewJotPage: false,
    };
  }

  componentWillMount() {
    this.setState({
      latestJots: JotService.findAll(),
      todaysJots: JotService.findAllCreatedToday(),
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
    });
  }

  showNewJotPage() {
    this.setState({
      isShowingNewJotPage: true,
    });
  }

  onJotFinished(jotInfo) {
    // New jot creation was cancelled
    if (jotInfo == null) {
      return;
    }

    let jot = new Jot(Date.now(), 'Jot 1', jotInfo.text);

    let newJots = this.state.latestJots.slice();
    newJots.push(jot);

    this.setState({
      todaysJots: newJots,
      isShowingNewJotPage: false,
    });
  }

  getSections() {
    return [
      { title: 'Today', data: this.state.todaysJots },
      { title: 'This week', data: this.state.thisWeeksJots },
      { title: 'This month', data: this.state.latestJots },
    ];
  }

  render() {
    let newJotPage = null;
    if (this.state.isShowingNewJotPage) {
      return <NewJot onJotFinished={this.onJotFinished} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.editBtn}>
            <Button title="Edit" type="clear" />
          </View>
          <JotList sections={this.getSections()} />
        </ScrollView>
        <Button
          style={styles.createJotBtn}
          icon={{
            name: 'pencil',
            type: 'material-community',
            size: 36,
            color: '#2089dc',
          }}
          type="clear"
          onPress={this.showNewJotPage}
        />
      </SafeAreaView>
    );
  }
}

export default AllJotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  createJotBtn: {
    width: 70,
    height: 70,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
    borderWidth: 1.5,
    borderColor: '#2089dc',
    borderRadius: 70,
  },
});
