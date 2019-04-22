import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import Person from '../database/models/Person';
import PersonService from '../database/services/PersonService';
import JotList from '../components/JotList';
import JotDetailScreen from './JotDetailScreen';
import ContuityGradient from '../components/ContuityGradient';
import styleConstants from '../../assets/style/theme.style';
import ContuityHeader from '../components/ContuityHeader';

class PersonDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.onFirstNameChange = this.onFirstNameChange.bind(this);
    this.onLastNameChange = this.onLastNameChange.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.savePerson = this.savePerson.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
    this.onRightButtonPress = this.onRightButtonPress.bind(this);
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

  savePerson() {
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

  onCancelPress(person) {
    this.setState({
      isEditing: false,
    });
    this.props.onPersonFinished(person);
  }

  onRightButtonPress() {
    if (this.state.isEditing) {
      let person = this.savePerson();

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

    let title = `${this.state.firstName} ${this.state.lastName}`;

    const leftButtonConfig = {
      title: 'Back',
      onPress: () => this.onCancelPress(this.state.person),
    };

    const rightButtonConfig = {
      title: 'Delete',
      onPress: this.onRightButtonPress,
    };

    if (this.state.isEditing) {
      // editing an existing person
      if (this.state.person) {
        title = 'Edit';
      } else {
        title = 'Create a Person';
      }

      leftButtonConfig.title = 'Cancel';
      rightButtonConfig.title = 'Done';
    }

    if (!this.state.firstName) {
      rightButtonConfig.disabled = true;
      rightButtonConfig.style = {
        backgroundColor: styleConstants.primaryDisabled,
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
            // inputContainerStyle={styles.inputContainerStyle}
            style={styles.inputStyle}
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
      <ContuityGradient>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollContainer}>
            <ContuityHeader
              title={title}
              leftButtonConfig={leftButtonConfig}
              rightButtonConfig={rightButtonConfig}
              rightButtonType="DONE"
              tintColor="white"
            />
            {content}
          </ScrollView>
        </SafeAreaView>
      </ContuityGradient>
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
  inputStyle: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 24,
    // ...h3,
    color: styleConstants.lightGray,
    paddingLeft: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#E5E5E5',
  },
  doneBtn: {
    backgroundColor: styleConstants.primaryColor,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 18,
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
