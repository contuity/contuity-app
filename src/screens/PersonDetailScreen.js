import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import Person from '../database/models/Person';
import PersonService from '../database/services/PersonService';
import JotList from '../components/JotList';
import JotDetailScreen from './JotDetailScreen';
import ContuityGradient from '../components/ContuityGradient';
import ContuityHeader from '../components/ContuityHeader';
import ContuityInput from '../components/ContuityInput';
import { callNumber, email } from '../Util.js';

import { h1, h3 } from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

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
    let title;
    const leftButtonConfig = {
      title: 'Back',
      onPress: () => this.onCancelPress(this.state.person),
    };
    const rightButtonConfig = {
      title: 'Delete',
      onPress: this.onRightButtonPress,
    };
    const firstInitial = this.state.firstName.charAt(0);
    const lastInitial = this.state.lastName.charAt(0);
    const numJots = this.props.person ? this.props.person.jots.length : 0;

    if (this.state.isShowingJotDetail) {
      return (
        <JotDetailScreen
          onJotFinished={this.onJotFinished}
          isEditing={false}
          jot={this.state.startWithJot}
        />
      );
    }

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
    }

    let content;
    if (this.state.isEditing) {
      content = (
        <View style={styles.contentContainer}>
          <ContuityInput
            label="First Name (required)"
            onChangeText={this.onFirstNameChange}
            value={this.state.firstName}
            textContentType="name"
          />
          <ContuityInput
            label="Last Name"
            onChangeText={this.onLastNameChange}
            value={this.state.lastName}
            textContentType="name"
          />
          <ContuityInput
            label="Email"
            onChangeText={this.onEmailChange}
            value={this.state.email}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <ContuityInput
            label="Phone"
            onChangeText={this.onPhoneNumberChange}
            value={this.state.phoneNumber}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
          />
        </View>
      );
    } else {
      content = (
        <View>
          <View style={styles.contentContainer}>
            <View style={styles.personHeader}>
              <Avatar
                rounded
                title={firstInitial + lastInitial}
                titleStyle={styles.photoTitle}
                avatarStyle={styles.photo}
                containerStyle={styles.photoContainer}
                size="xlarge"
              />
              <Text style={{ ...h1 }}>{`${this.state.firstName} ${
                this.state.lastName
              }`}</Text>
              <Text style={{ ...h3 }}>{`${numJots} jots`}</Text>
            </View>
            <ActionButtons person={this.state.person} />
          </View>
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
              leftButtonType={this.state.isEditing ? 'CANCEL' : 'BACK'}
              rightButtonType={this.state.isEditing ? 'DONE' : 'EDIT'}
              // tintColor="white"
            />
            {content}
          </ScrollView>
        </SafeAreaView>
      </ContuityGradient>
    );
  }
}

const ActionButtons = props => {
  return (
    <View style={styles.actionBtnRow}>
      <Button
        buttonStyle={styles.actionBtn}
        icon={{
          name: 'phone',
          type: 'material',
          size: 30,
          color: 'white',
        }}
        disabled={!props.person.phoneNumber}
        disabledStyle={styles.actionBtnDisabled}
        onPress={() => callNumber(props.person.phoneNumber)}
      />
      <Button
        buttonStyle={styles.actionBtn}
        icon={{
          name: 'message',
          type: 'material',
          size: 30,
          color: 'white',
        }}
        disabled={!props.person.phoneNumber}
        disabledStyle={styles.actionBtnDisabled}
      />
      <Button
        buttonStyle={styles.actionBtn}
        icon={{
          name: 'email',
          type: 'material',
          size: 30,
          color: 'white',
        }}
        disabled={!props.person.email}
        disabledStyle={styles.actionBtnDisabled}
        onPress={() => email(props.person.email)}
      />
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
  personHeader: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 32,
  },
  photo: {
    backgroundColor: styleConstants.lightBlue,
  },
  photoTitle: {
    color: styleConstants.primaryColor,
    fontFamily: styleConstants.assistantNorm,
  },
  photoContainer: {
    marginBottom: 13,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
  },
  actionBtnRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 35,
  },
  actionBtn: {
    width: 56,
    aspectRatio: 1,
    backgroundColor: styleConstants.primaryColor,
    borderRadius: 56 / 2,
  },
  actionBtnDisabled: {
    backgroundColor: styleConstants.primaryDisabled,
  },
});
