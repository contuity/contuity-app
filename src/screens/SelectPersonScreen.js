import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import PersonService from '../database/services/PersonService';
import ContuityHeader from '../components/ContuityHeader';
import PersonPill from '../components/PersonPill';
import { h3, jotText, h2 } from '../../assets/style/common.style';

class SelectPersonScreen extends Component {
  constructor(props) {
    super(props);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
    this.onDonePress = this.onDonePress.bind(this);
    this.onPersonPress = this.onPersonPress.bind(this);

    this.state = {
      searchTerm: '',
      peopleToAdd: [],
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

  onDonePress() {
    this.props.onSelectPersonFinished(this.state.peopleToAdd);
  }

  onPersonPress(person) {
    let allPeople = this.props.existingPeople.concat(this.state.peopleToAdd);
    let results = allPeople.filter(item => item.id === person.id);
    if (results.length === 0) {
      this.setState({
        peopleToAdd: [...this.state.peopleToAdd, person],
      });
    }
  }

  updatePeopleToRemove(person) {
    let peopleToAdd = this.state.peopleToAdd;
    peopleToAdd = peopleToAdd.filter(p => p.id !== person.id);

    this.setState({
      peopleToAdd,
    });
  }

  getSearchResults() {
    let results;

    if (this.state.searchTerm != '') {
      results = PersonService.findPeopleBySearchTerm(this.state.searchTerm);
    } else {
      // gets the 4 people with the most jots
      results = PersonService.findPeopleWithMostJots(4);
    }

    return results;
  }

  render() {
    const leftButtonConfig = {
      title: 'Cancel',
      onPress: this.onCancelPress,
    };

    const rightButtonConfig = {
      title: 'Done',
      onPress: this.onDonePress,
    };

    let results = (
      <View>
        <FlatList
          data={this.getSearchResults()}
          keyExtractor={(item, index) => `person-${index}`}
          renderItem={item => {
            let person = item.item;
            return (
              <ListItem
                title={person.firstName + ' ' + person.lastName}
                titleProps={{ numberOfLines: 1 }}
                titleStyle={styles.personName}
                onPress={() => this.onPersonPress(person)}
                underlayColor="transparent"
              />
            );
          }}
        />
      </View>
    );

    let peopleComponent = (
      <View style={styles.selectedPeopleContainer}>
        {this.state.peopleToAdd.map((person, index) => {
          return (
            <PersonPill
              key={index}
              person={person}
              onRemovePress={() => this.updatePeopleToRemove(person)}
              isEditing={true}
            />
          );
        })}
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <ContuityHeader
          title="Add a Person"
          leftButtonConfig={leftButtonConfig}
          rightButtonConfig={rightButtonConfig}
          rightButtonType="DONE"
        />
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.inputLabel}>People</Text>
          <TextInput
            placeholder="Add a name..."
            style={styles.input}
            containerSt
            onChangeText={this.onSearchTermChange}
            value={this.state.searchTerm}
          />
          {results}
          {peopleComponent}
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
    paddingHorizontal: 20,
  },
  inputLabel: {
    ...h3,
    marginBottom: 3,
    color: 'black',
  },
  input: {
    ...jotText,
    marginBottom: 8,
    borderBottomColor: '#C4C4C4',
    borderBottomWidth: 1,
  },
  personName: {
    ...h2,
  },
  selectedPeopleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
