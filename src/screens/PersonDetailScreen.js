import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

class PersonDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.onCancelHit = this.onCancelHit.bind(this);

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
    };
  }

  onCancelHit() {
    this.props.onPersonFinished();
  }

  render() {
    let fullName = `${this.state.firstName} ${this.state.lastName}`;

    const leftButtonConfig = {
      title: 'Back',
      handler: this.onCancelHit,
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <NavigationBar
            title={{ title: fullName }}
            leftButton={leftButtonConfig}
          />
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
