import React, { Component } from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import PersonService from '../database/services/PersonService';
import PersonList from '../components/PersonList';
import PersonDetailScreen from './PersonDetailScreen';
import NavigationBar from 'react-native-navbar';

class PeopleScreen extends Component {
  constructor(props) {
    super(props);
    this.createNewPerson = this.createNewPerson.bind(this);
    this.onPersonPress = this.onPersonPress.bind(this);
    this.onPersonFinished = this.onPersonFinished.bind(this);

    this.state = {
      allPeople: PersonService.findAll(),
      isShowingPersonScreen: false,
      startWithPerson: null,
      startInEditMode: false,
    };
  }

  createNewPerson() {
    this.setState({
      isShowingPersonScreen: true,
      startWithPerson: null,
      startInEditMode: true,
    });
  }

  onPersonFinished(person) {
    // New person creation was cancelled
    if (person == null) {
      this.setState({
        isShowingPersonScreen: false,
      });
      return;
    }

    this.setState({
      allPeople: PersonService.findAll(),
      isShowingPersonScreen: false,
    });
  }

  onPersonPress(person) {
    this.setState({
      isShowingPersonScreen: true,
      startWithPerson: person,
      startInEditMode: false,
    });
  }

  // TODO: think further about how to store this in order to improve performance
  getAlphabatizedSections() {
    let initialToPeople = {};

    this.state.allPeople.forEach(person => {
      let initial = person.firstName.substring(0, 1).toUpperCase();
      if (!initialToPeople[initial]) {
        initialToPeople[initial] = [person];
      } else {
        initialToPeople[initial] = [...initialToPeople[initial], person];
      }
    });

    let sections = [];

    Object.keys(initialToPeople).forEach(key => {
      sections.push({ title: key, data: initialToPeople[key] });
    });

    return sections;
  }

  render() {
    const rightButtonConfig = {
      title: 'Add',
      handler: this.createNewPerson,
    };

    if (this.state.isShowingPersonScreen) {
      return (
        <PersonDetailScreen
          onPersonFinished={this.onPersonFinished}
          isEditing={this.state.startInEditMode}
          person={this.state.startWithPerson}
        />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <NavigationBar
            title={{ title: 'People' }}
            rightButton={rightButtonConfig}
          />
          <PersonList
            sections={this.getAlphabatizedSections()}
            onPersonPress={this.onPersonPress}
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
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
});
