import React, { Component } from 'react';
import { Button, ListItem } from 'react-native-elements';
import {
  View,
  ScrollView,
  SafeAreaView,
  SectionList,
  Text,
  StyleSheet,
} from 'react-native';
import JotService from '../database/services/JotService';
import NewJot from './NewJot';
import Jot from '../database/models/Jot.js';

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
    console.log(jotInfo);

    let jot = new Jot(Date.now(), 'Jot 1', jotInfo.text);

    let newJots = this.state.todaysJots.slice();
    newJots.push(jot);

    this.setState({
      todaysJots: newJots,
      isShowingNewJotPage: false,
    });
  }

  renderJotItem(item) {
    let jot = item.item;
    let dateCreated = jot.dateCreated;
    let dateFormat =
      dateCreated.getMonth() +
      1 +
      '/' +
      dateCreated.getDate() +
      '/' +
      dateCreated.getFullYear();

    return (
      <ListItem
        style={styles.jotListItem}
        key={jot.id}
        title={jot.title}
        subtitle={jot.content}
        rightSubtitle={dateFormat}
        chevron={true}
      />
    );
  }

  render() {
    let newJotPage = null;
    if (this.state.isShowingNewJotPage) {
      return <NewJot onJotFinished={this.onJotFinished} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.editBtn}>
            <Button title="Edit" type="clear" />
          </View>
          <SectionList
            style={styles.allJotsList}
            renderItem={this.renderJotItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            sections={[
              { title: 'Today', data: this.state.todaysJots },
              { title: 'This week', data: this.state.thisWeeksJots },
              { title: 'This month', data: this.state.latestJots },
            ]}
            keyExtractor={(item, index) => index}
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
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  jotListItem: {
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
  allJotsList: {
    width: '100%',
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  createJotBtn: {
    borderWidth: 1.5,
    borderColor: '#2089dc',
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
});
