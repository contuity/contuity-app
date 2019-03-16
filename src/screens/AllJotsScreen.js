import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import JotList from '../components/JotList';
import JotPage from './JotPage';

class AllJotsScreen extends Component {
  constructor(props) {
    super(props);
    this.createNewJot = this.createNewJot.bind(this);
    this.onJotFinished = this.onJotFinished.bind(this);
    this.onJotSelect = this.onJotSelect.bind(this);

    this.state = {
      latestJots: [],
      todaysJots: [],
      thisWeeksJots: [],
      // These variables keep track of how and when to show a Jot detail page.
      isShowingNewJotPage: false,
      startWithJot: null,
      startInEditMode: false,
      listSelectionMode: false,
    };
  }

  componentWillMount() {
    this.setState({
      latestJots: JotService.findAll(),
      todaysJots: JotService.findAllCreatedToday(),
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
    });
  }

  createNewJot() {
    this.setState({
      isShowingNewJotPage: true,
      startWithJot: null,
      startInEditMode: true,
    });
  }

  onJotFinished(jot) {
    // New jot creation was cancelled
    if (jot == null) {
      this.setState({
        isShowingNewJotPage: false,
      });
      return;
    }

    let newJots = this.state.todaysJots.slice();
    if (!newJots.includes(jot)) {
      newJots.push(jot);
    }

    this.setState({
      todaysJots: newJots,
      isShowingNewJotPage: false,
    });
  }

  getSections() {
    return [
      { title: 'Today', data: this.state.todaysJots },
      { title: 'This week', data: this.state.thisWeeksJots },
      // TODO: Group all other jots by month
      // { title: 'This month', data: this.state.latestJots },
    ];
  }

  onJotSelect(jot) {
    this.setState({
      isShowingNewJotPage: true,
      startWithJot: jot,
      startInEditMode: false,
    });
  }

  render() {
    let newJotPage = null;
    if (this.state.isShowingNewJotPage) {
      return (
        <JotPage
          onJotFinished={this.onJotFinished}
          isEditing={this.state.startInEditMode}
          jot={this.state.startWithJot}
        />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.editBtn}>
            <Button
              title="Edit"
              type="clear"
              onPress={() => this.setState({ listSelectionMode: true })}
            />
          </View>
          <JotList
            listSelectionMode={this.state.listSelectionMode}
            sections={this.getSections()}
            onJotPress={this.onJotSelect}
          />
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
          onPress={this.createNewJot}
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
