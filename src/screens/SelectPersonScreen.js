import React, { Component } from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import PersonService from '../database/services/PersonService';
import PersonList from '../components/PersonList';
import NavigationBar from 'react-native-navbar';

class SelectPersonScreen extends Component {
  constructor(props) {
    super(props);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
    this.onPersonPress = this.onPersonPress.bind(this);

    this.state = {
      searchTerm: '',
    };
  }

  onSearchTermChange(event) {
    this.setState({
      searchTerm: event,
    });
  }

  onCancelPress() {
    this.props.onSelectPersonFinished(null);
  }

  onPersonPress(person) {
    this.props.onSelectPersonFinished(person);
  }

  getSearchResults() {
    let sections = [];
    let results;

    if (this.state.searchTerm != '') {
      results = PersonService.findPeopleBySearchTerm(this.state.searchTerm);
    } else {
      // gets the 4 people with the most jots
      results = PersonService.findPeopleWithMostJots(4);
    }

    sections.push({ title: 'Results', data: results });
    return sections;
  }

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      handler: this.onCancelPress,
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <NavigationBar
            title={{ title: 'Select a Person' }}
            leftButton={leftButtonConfig}
          />
          <Input
            placeholder="Search People"
            containerStyle={styles.fullInputContainerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={this.onSearchTermChange}
            value={this.state.searchTerm}
          />
          <PersonList
            sections={this.getSearchResults()}
            onPersonPress={this.onPersonPress}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SelectPersonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  fullInputContainerStyle: {
    marginTop: 15,
  },
  inputContainerStyle: {
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
});
