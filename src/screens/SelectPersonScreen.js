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
import { h3, jotText, h2 } from '../../assets/style/common.style';

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

    return (
      <SafeAreaView style={styles.container}>
        <ContuityHeader
          title="Add a Person"
          leftButtonConfig={leftButtonConfig}
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
});
