import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
  Alert,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import JotService from '../database/services/JotService';
import JotList from '../components/JotList';
import JotDetailScreen from './JotDetailScreen';
import LinearGradient from 'react-native-linear-gradient';

import styleConstants from '../../assets/style/theme.style.js';
import {
  shadow,
  link,
  smallButton,
  smallButtonText,
} from '../../assets/style/common.style';

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
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
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

    this.props.setNavBarDisplay(false);
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
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
      selectedJots: [],
      listSelectionMode: false,
    });
    this.props.setNavBarDisplay(true);
  }

  onJotFinished(jot) {
    // New jot creation was cancelled
    this.props.setNavBarDisplay(true);

    if (jot == null) {
      this.setState({
        isShowingNewJotPage: false,
      });
      return;
    }

    this.setState({
      allJots: JotService.findAll(),
      todaysJots: JotService.findAllCreatedToday(),
      thisWeeksJots: JotService.findAllCreatedThisWeek(),
      isShowingNewJotPage: false,
    });
  }

  onJotPress(jot) {
    this.setState({
      isShowingNewJotPage: true,
      startWithJot: jot,
      startInEditMode: false,
    });
    this.props.setNavBarDisplay(false);
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
    this.props.setNavBarDisplay(true);
  }

  getSections() {
    return [
      { title: 'Today', data: this.state.todaysJots },
      { title: 'This week', data: this.state.thisWeeksJots },
      // TODO: Group all other jots by month
      // { title: 'This month', data: this.state.allJots },
    ];
  }

  render() {
    let topRightBtn;
    let topLeftBtn;
    let bottomRightBtn;

    if (this.state.listSelectionMode) {
      topLeftBtn = (
        <Button
          title="Cancel"
          type="clear"
          onPress={this.onCancelJotSelect}
          titleStyle={styles.link}
        />
      );
      topRightBtn = (
        //TODO: Add in language about how to delete jots
        <Button
          title={this.state.selectedJots.length === 0 ? 'Delete All' : 'Delete'}
          titleStyle={smallButtonText}
          type="clear"
          onPress={this.triggerDeleteJotsAlert}
          style={smallButton}
        />
      );
    } else {
      topRightBtn = (
        <Button
          icon={{
            name: 'delete',
            size: 24,
            color: styleConstants.primaryColor,
          }}
          type="clear"
          onPress={() => {
            this.setState({ listSelectionMode: true });
            this.props.setNavBarDisplay(false);
          }}
        />
      );
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
      <LinearGradient
        colors={[
          styleConstants.topGradient,
          styleConstants.middleGradient,
          styleConstants.lastGradient,
        ]}
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.topBtnRow}>
            {topRightBtn}
            {topLeftBtn}
          </View>
          <ScrollView style={styles.scrollContainer}>
            <JotList
              listSelectionMode={this.state.listSelectionMode}
              sections={this.getSections()}
              onJotPress={this.onJotPress}
              onJotSelect={this.onJotSelect}
            />
          </ScrollView>
          {bottomRightBtn}
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

export default AllJotsScreen;

const styles = StyleSheet.create({
  //TODO: Remove extra space for title
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  topBtnRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  createJotBtn: {
    ...shadow,
    shadowOffset: { width: 6, height: 2 },
    width: 70,
    height: 70,
    backgroundColor: styleConstants.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 52,
    right: 20,
    borderRadius: 70,
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
  link: {
    ...link,
    fontSize: styleConstants.fontSizeXSmall,
  },
});
