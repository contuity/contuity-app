import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Alert, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import JotList from '../components/JotList';
import JotDetailScreen from './JotDetailScreen';
import moment from 'moment';
import ContuityHeader from '../components/ContuityHeader';
import ContuityGradient from '../components/ContuityGradient';

class AllJotsScreen extends Component {
  constructor(props) {
    super(props);
    this.createNewJot = this.createNewJot.bind(this);
    this.triggerDeleteJotsAlert = this.triggerDeleteJotsAlert.bind(this);
    this.deleteSelectedJots = this.deleteSelectedJots.bind(this);
    this.onJotFinished = this.onJotFinished.bind(this);
    this.onJotPress = this.onJotPress.bind(this);
    this.onJotSelect = this.onJotSelect.bind(this);
    this.onCancelJotSelect = this.onCancelJotSelect.bind(this);

    this.state = {
      allJots: JotService.findAll(),
      todaysJots: JotService.findAllCreatedToday(),
      yesterdaysJots: JotService.findAllCreatedYesterday(),
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
      allOtherJots: JotService.findAllOtherJots(),
      selectedJots: [],
      // These variables keep track of how and when to show a Jot detail page.
      isShowingNewJotPage: false,
      startWithJot: null,
      startInEditMode: false,
      listSelectionMode: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }

    // do not re-render if when selecting multiple jots
    if (!this.state.listSelectionMode || !nextState.listSelectionMode) {
      return true;
    }

    if (
      this.state.selectedJots.length === 0 &&
      nextState.selectedJots.length !== 1
    ) {
      return false;
    }

    if (
      this.state.selectedJots.length === 1 &&
      nextState.selectedJots.length !== 0
    ) {
      return false;
    }

    return true;
  }

  createNewJot() {
    this.setState({
      isShowingNewJotPage: true,
      startWithJot: null,
      startInEditMode: true,
    });
  }

  triggerDeleteJotsAlert() {
    let msg;
    if (this.state.selectedJots.length === 0) {
      msg = `Delete all ${this.state.allJots.length} jots?`;
    } else if (this.state.selectedJots.length === 1) {
      msg = `Delete 1 jot?`;
    } else {
      msg = `Delete ${this.state.selectedJots.length} jots?`;
    }

    Alert.alert(
      'Are you sure?',
      msg,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Delete', onPress: this.deleteSelectedJots },
      ],
      { cancelable: true }
    );
  }

  deleteSelectedJots() {
    if (this.state.selectedJots.length === 0) {
      JotService.deleteJots(this.state.allJots);
    } else {
      JotService.deleteJots(this.state.selectedJots);
    }

    this.setState({
      allJots: JotService.findAll(),
      todaysJots: JotService.findAllCreatedToday(),
      yesterdaysJots: JotService.findAllCreatedYesterday(),
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
      allOtherJots: JotService.findAllOtherJots(),
      selectedJots: [],
      listSelectionMode: false,
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

    this.setState({
      allJots: JotService.findAll(),
      todaysJots: JotService.findAllCreatedToday(),
      yesterdaysJots: JotService.findAllCreatedYesterday(),
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
      allOtherJots: JotService.findAllOtherJots(),
      isShowingNewJotPage: false,
    });
  }

  onJotPress(jot) {
    this.setState({
      isShowingNewJotPage: true,
      startWithJot: jot,
      startInEditMode: false,
    });
  }

  onJotSelect(jot) {
    // un-select jot if jot is already selected
    let newSelected = this.state.selectedJots.filter(selectedJot => {
      return selectedJot.id !== jot.id;
    });

    if (newSelected.length < this.state.selectedJots.length) {
      this.setState({ selectedJots: newSelected });
    } else {
      this.setState({ selectedJots: [...this.state.selectedJots, jot] });
    }
  }

  onCancelJotSelect() {
    this.setState({ selectedJots: [], listSelectionMode: false });
  }

  getSections() {
    return [
      { title: 'Today', data: this.state.todaysJots },
      { title: 'Yesterday', data: this.state.yesterdaysJots },
      { title: 'This week', data: this.state.thisWeeksJots },
    ].concat(this.getAllOtherJotsByMonth());
  }

  getAllOtherJotsByMonth() {
    let monthToJots = {};

    this.state.allOtherJots.forEach(jot => {
      let key = moment(jot.findAllCreatedThisWeek).format('MMMM YYYY');

      if (!monthToJots[key]) {
        monthToJots[key] = [jot];
      } else {
        monthToJots[key] = [...monthToJots[key], jot];
      }
    });

    let sections = [];
    Object.keys(monthToJots).forEach(key => {
      sections.push({ title: key, data: monthToJots[key] });
    });

    return sections;
  }

  render() {
    let rightButtonConfig;
    let bottomRightBtn;

    if (this.state.listSelectionMode) {
      rightButtonConfig = {
        title: 'Cancel',
        onPress: this.onCancelJotSelect,
      };
      bottomRightBtn = (
        <Button
          style={styles.deleteJotsBtn}
          title={this.state.selectedJots.length === 0 ? 'Delete All' : 'Delete'}
          icon={{
            name: 'delete',
            type: 'material-community',
            size: 18,
            color: '#2089dc',
          }}
          type="clear"
          onPress={this.triggerDeleteJotsAlert}
        />
      );
    } else {
      rightButtonConfig = {
        title: 'Edit',
        onPress: () => this.setState({ listSelectionMode: true }),
      };
      bottomRightBtn = (
        <Button
          style={styles.createJotBtn}
          icon={{
            name: 'pencil',
            type: 'material-community',
            size: 36,
            color: 'white',
          }}
          type="clear"
          onPress={this.createNewJot}
        />
      );
    }

    if (this.state.isShowingNewJotPage) {
      return (
        <JotDetailScreen
          onJotFinished={this.onJotFinished}
          isEditing={this.state.startInEditMode}
          jot={this.state.startWithJot}
        />
      );
    }

    return (
      <ContuityGradient>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollContainer}>
            <ContuityHeader rightButtonConfig={rightButtonConfig} />
            <JotList
              listSelectionMode={this.state.listSelectionMode}
              sections={this.getSections()}
              onJotPress={this.onJotPress}
              onJotSelect={this.onJotSelect}
            />
          </ScrollView>
          {bottomRightBtn}
        </SafeAreaView>
      </ContuityGradient>
    );
  }
}

export default AllJotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  topBtnRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  createJotBtn: {
    width: 70,
    height: 70,
    backgroundColor: '#D97A7C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
    borderRadius: 70,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
  },
  deleteJotsBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
    borderWidth: 1.5,
    borderColor: '#2089dc',
    borderRadius: 10,
  },
});
