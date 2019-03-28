import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import {
  Alert,
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import PersonService from '../database/services/PersonService';
import PersonList from '../components/PersonList';
import PersonDetailScreen from './PersonDetailScreen';

class PeopleScreen extends Component {
  constructor(props) {
    super(props);
    this.onPersonPress = this.onPersonPress.bind(this);
    this.onPersonFinished = this.onPersonFinished.bind(this);

    this.state = {
      allPeople: PersonService.findAll(),
      isShowingPersonScreen: false,
      startWithPerson: null,
    };
  }

  onPersonFinished() {
    this.setState({
      isShowingPersonScreen: false,
    });
  }

  onPersonPress(person) {
    this.setState({
      isShowingPersonScreen: true,
      startWithPerson: person,
    });
  }

  // TODO: think further about how to store this in order to improve performance
  getAlphabatizedSections() {
    let initialToPeople = {};

    this.state.allPeople.forEach(person => {
      let initial = person.firstName.substring(0, 1).toUpperCase();
      if (!initialToPeople.initial) {
        initialToPeople[initial] = [person];
      } else {
        initialToPeople[initial] = [...initialToPeople.get(initial), person];
      }
    });

    let sections = [];

    Object.keys(initialToPeople).forEach(key => {
      sections.push({ title: key, data: initialToPeople[key] });
    });

    return sections;
  }

  render() {
    if (this.state.isShowingPersonScreen) {
      return (
        <PersonDetailScreen
          person={this.state.startWithPerson}
          onPersonFinished={this.onPersonFinished}
        />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <PersonList
            listSelectionMode={this.state.listSelectionMode}
            sections={this.getAlphabatizedSections()}
            onPersonPress={this.onPersonPress}
            numColumns={2}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PeopleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
});
