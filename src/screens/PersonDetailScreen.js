import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import Person from '../database/models/Person';
import PersonService from '../database/services/PersonService';
import JotList from '../components/JotList';

class PersonDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.saveAndGetPerson = this.saveAndGetPerson.bind(this);
    this.onCancelHit = this.onCancelHit.bind(this);
    this.onRightButtonClick = this.onRightButtonClick.bind(this);

    let firstName = '';
    let lastName = '';

    if (props.person) {
      firstName = props.person.firstName;
      lastName = props.person.lastName;
    }

    let person = props.person;

    this.state = {
      person: person,
      firstName: firstName,
      lastName: lastName,
      isEditing: props.isEditing,
    };
  }

  onFirstNameChange(event) {
    this.setState({
      firstName: event,
    });
  }

  onLastNameChange(event) {
    this.setState({
      lastName: event,
    });
  }

  saveAndGetPerson() {
    if (
      this.state.firstName == null ||
      this.state.firstName === '' ||
      this.state.lastName == null ||
      this.state.lastName === ''
    ) {
      return null;
    }

    let person = this.state.person;
    let newAttrs = {};
    if (person) {
      newAttrs.firstName = this.state.firstName;
      newAttrs.lastName = this.state.lastName;
    } else {
      person = new Person(this.state.firstName, this.state.lastName);
    }

    PersonService.save(person, newAttrs);

    return person;
  }

  onCancelHit(person) {
    this.setState({
      isEditing: false,
    });
    this.props.onPersonFinished(person);
  }

  onRightButtonClick() {
    if (this.state.isEditing) {
      let person = this.saveAndGetPerson();

      // tempoarary fix for lack of disabling nav buttons
      if (!person) {
        this.props.onPersonFinished(null);
      }

      this.setState({
        person: person,
        isEditing: false,
      });
    } else {
      PersonService.deletePeople([this.state.person]);
      this.props.onPersonFinished(null);
    }
  }

  getJotSections() {
    let allJotsForPerson = [];

    if (this.state.person.jots) {
      allJotsForPerson = this.state.person.jots;
    }

    return [{ title: 'Jots', data: allJotsForPerson }];
  }

  render() {
    const titleConfig = {
      title: `${this.state.firstName} ${this.state.lastName}`,
    };

    const leftButtonConfig = {
      title: 'Back',
      handler: () => this.onCancelHit(this.state.person),
    };

    const rightButtonConfig = {
      title: 'Delete',
      handler: this.onRightButtonClick,
    };

    if (this.state.isEditing) {
      if (this.state.person) {
        titleConfig.title = 'Edit';
      } else {
        titleConfig.title = 'Create Person';
      }

      leftButtonConfig.title = 'Cancel';
      rightButtonConfig.title = 'Done';
    }

    let content;
    if (this.state.isEditing) {
      content = [
        <Input
          key="0"
          placeholder="First name"
          onChangeText={this.onFirstNameChange}
          value={this.state.firstName}
        />,
        <Input
          key="1"
          placeholder="Last name"
          onChangeText={this.onLastNameChange}
          value={this.state.lastName}
        />,
      ];
    } else {
      content = [<JotList sections={this.getJotSections()} />];
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <NavigationBar
            title={titleConfig}
            leftButton={leftButtonConfig}
            rightButton={rightButtonConfig}
          />
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default PersonDetailScreen;

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
