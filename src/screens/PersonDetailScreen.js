import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import Person from '../database/models/Person';
import PersonService from '../database/services/PersonService';
import JotList from '../components/JotList';
import JotDetailScreen from './JotDetailScreen';

class PersonDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.saveAndGetPerson = this.saveAndGetPerson.bind(this);
    this.onCancelHit = this.onCancelHit.bind(this);
    this.onRightButtonClick = this.onRightButtonClick.bind(this);
    this.onJotFinished = this.onJotFinished.bind(this);
    this.onJotPress = this.onJotPress.bind(this);

    let firstName = '';
    let lastName = '';
    let phoneNumber = '';
    let email = '';

    if (props.person) {
      firstName = props.person.firstName;
      lastName = props.person.lastName;
      phoneNumber = props.person.phoneNumber;
      email = props.person.email;
    }

    let person = props.person;

    this.state = {
      person: person,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      isEditing: props.isEditing,
      isShowingJotDetail: false,
      startWithJot: null,
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

  // TODO: make sure phone number is valid
  onPhoneNumberChange(event) {
    this.setState({
      phoneNumber: event,
    });
  }

  // TODO: make sure email is valid
  onEmailChange(event) {
    this.setState({
      email: event,
    });
  }

  saveAndGetPerson() {
    if (this.state.firstName == null || this.state.firstName === '') {
      return null;
    }

    let person = this.state.person;
    let newAttrs = {};
    if (person) {
      newAttrs.firstName = this.state.firstName;
      newAttrs.lastName = this.state.lastName;
    } else {
      person = new Person(
        this.state.firstName,
        this.state.lastName,
        this.state.phoneNumber,
        this.state.email
      );
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

  onJotFinished() {
    this.setState({
      isShowingJotDetail: false,
    });
  }

  onJotPress(jot) {
    this.setState({
      isShowingJotDetail: true,
      startWithJot: jot,
    });
  }

  getJotSections() {
    let allJotsForPerson = [];

    if (this.state.person.jots) {
      allJotsForPerson = this.state.person.jots;
    }

    return [{ data: allJotsForPerson }];
  }

  render() {
    if (this.state.isShowingJotDetail) {
      return (
        <JotDetailScreen
          onJotFinished={this.onJotFinished}
          isEditing={false}
          jot={this.state.startWithJot}
        />
      );
    }

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
      // editing an existing person
      if (this.state.person) {
        titleConfig.title = 'Edit';
      } else {
        titleConfig.title = 'Add Person';
      }

      leftButtonConfig.title = 'Cancel';
      rightButtonConfig.title = 'Done';
      rightButtonConfig.tintColor = '#FFFFFF';
      rightButtonConfig.style = styles.doneBtn;
    }

    if (!this.state.firstName) {
      rightButtonConfig.disabled = true;
      rightButtonConfig.style = {
        ...styles.doneBtn,
        backgroundColor: '#686868',
      };
    }

    let content;
    if (this.state.isEditing) {
      content = (
        <View style={styles.contentContainer}>
          <View style={styles.photo} />
          <Input
            placeholder="First name (required)"
            containerStyle={styles.fullInputContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={this.onFirstNameChange}
            value={this.state.firstName}
          />
          <Input
            placeholder="Last name"
            containerStyle={styles.fullInputContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={this.onLastNameChange}
            value={this.state.lastName}
          />
          <Input
            placeholder="Phone number"
            containerStyle={styles.fullInputContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={this.onPhoneNumberChange}
            value={this.state.phoneNumber}
          />
          <Input
            placeholder="Email"
            containerStyle={styles.fullInputContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={this.onEmailChange}
            value={this.state.email}
          />
        </View>
      );
    } else {
      content = (
        <View>
          <View style={styles.contentContainer}>
            <View style={styles.photo} />
            <Field name="Phone" value={this.state.person.phoneNumber} />
            <Field name="Email" value={this.state.person.email} />
          </View>
          <JotTabs />
          <JotList
            sections={this.getJotSections()}
            onJotPress={this.onJotPress}
          />
        </View>
      );
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

const Field = props => {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldName}>{props.name}</Text>
      <Text style={styles.fieldValue}>{props.value}</Text>
    </View>
  );
};

const JotTabs = props => {
  return (
    <View style={styles.tabRow}>
      <Text style={styles.tabName}>All Jots</Text>
    </View>
  );
};

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
  contentContainer: {
    paddingHorizontal: 10,
  },
  fullInputContainerStyle: {
    marginTop: 15,
  },
  inputContainerStyle: {
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#E5E5E5',
  },
  doneBtn: {
    backgroundColor: '#2267B7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  doneBtnDisabled: {
    backgroundColor: '#686868',
  },
  field: {
    marginTop: 10,
  },
  fieldName: {
    textTransform: 'lowercase',
    color: 'grey',
  },
  fieldValue: {
    color: 'blue',
  },
  tabRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 10,
    marginTop: 20,
  },
  tabName: {
    fontWeight: '700',
  },
});
