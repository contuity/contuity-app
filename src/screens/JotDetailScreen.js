import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import JotService from '../database/services/JotService';
import PersonService from '../database/services/PersonService';
import Jot from '../database/models/Jot';
import PersonPill from '../components/PersonPill';

class JotDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.onJotTitleChange = this.onJotTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCancelHit = this.onCancelHit.bind(this);
    this.onRightButtonClick = this.onRightButtonClick.bind(this);
    this.addPersonToJot = this.addPersonToJot.bind(this);
    this.addJotToSelectedPeople = this.addJotToSelectedPeople.bind(this);

    let content = '';
    let title = '';
    let id = null;

    if (props.jot) {
      content = props.jot.content;
      id = props.jot.id;
      title = props.jot.title;
    }

    // If we started with a jot, just edit it and return it... ?
    // this violates react...
    // TODO: create a new jot with the same ID
    let jot = this.props.jot;

    this.state = {
      // Keep track of the jot, in case we are creating a new jot and it goes (null -> Jot)
      // id: id
      jot: jot,
      title: title,
      content: content,
      peopleToAdd: [],
      isEditing: props.isEditing,
    };
  }

  onJotTitleChange(event) {
    this.setState({
      title: event,
    });
  }

  onContentChange(event) {
    this.setState({
      content: event,
    });
  }

  saveAndGetJot() {
    // If the user didn't enter anything, don't save anything
    if (this.state.content == null || this.state.content === '') {
      return null;
    }

    // TODO: fix - we shouldn't be editing objects on the state
    let jot = this.state.jot;
    let people = this.state.peopleToAdd;
    let newAttrs = {};
    if (jot) {
      newAttrs.content = this.state.content;
      newAttrs.title = this.state.title;
    } else {
      // Make a new jot
      jot = new Jot(this.state.title, this.state.content);
    }

    this.addJotToSelectedPeople(jot);

    JotService.save(jot, newAttrs);
    return jot;
  }

  addJotToSelectedPeople(jot) {
    let people = this.state.peopleToAdd;

    if (people.length > 0) {
      let personAttr = {};
      people.forEach(person => {
        personAttr = { jots: [...person.jots, jot] };
        PersonService.save(person, personAttr);
      });
    }
  }

  onCancelHit() {
    if (this.state.isEditing && this.state.jot) {
      this.setState({ isEditing: false, peopleToAdd: [] });
    } else {
      this.props.onJotFinished(this.state.jot);
    }
  }

  onRightButtonClick() {
    if (this.state.isEditing) {
      // Save the jot and go to view jot mode
      let jot = this.saveAndGetJot();
      this.setState({
        jot: jot,
        isEditing: false,
      });
    } else {
      // Edit the existing Jot
      this.setState({
        isEditing: true,
      });
    }
  }

  addPersonToJot() {
    let person = PersonService.findAll()[0];

    this.setState({
      peopleToAdd: [...this.state.peopleToAdd, person],
    });
  }

  getPeople() {
    let jot = this.state.jot;
    let allPeopleForJot = [];

    if (jot && jot.people) {
      allPeopleForJot = jot.people.slice(0);
    }
    if (this.state.isEditing) {
      allPeopleForJot = allPeopleForJot.concat(this.state.peopleToAdd);
    }

    return allPeopleForJot;
  }

  render() {
    const titleConfig = {
      title: 'View Jot',
    };

    const leftButtonConfig = {
      title: 'Back',
      handler: this.onCancelHit,
    };

    const rightButtonConfig = {
      title: 'Edit',
      handler: this.onRightButtonClick,
    };

    if (this.state.isEditing) {
      if (this.state.person) {
        titleConfig.title = 'Edit Jot';
      } else {
        titleConfig.title = 'Create Jot';
      }

      leftButtonConfig.title = 'Cancel';
      rightButtonConfig.title = 'Done';
    }

    let peopleComponent = (
      <View key="2" style={styles.peopleContainer}>
        {this.getPeople().map((person, index) => {
          return <PersonPill key={index} person={person} />;
        })}
      </View>
    );

    let content;
    if (this.state.isEditing) {
      content = [
        <Input
          key="0"
          inputStyle={styles.jotTitleInput}
          placeholder="Title"
          onChangeText={this.onJotTitleChange}
          value={this.state.title}
        />,
        <TextInput
          key="1"
          style={styles.jotContentInput}
          placeholder="Jot"
          onChangeText={this.onContentChange}
          value={this.state.content}
          multiline={true}
        />,
        peopleComponent,
        <Button
          key="3"
          title="Add Person"
          type="clear"
          onPress={this.addPersonToJot}
        />,
      ];
    } else {
      content = [
        <Text key="0" style={styles.jotTitle}>
          Title: {this.state.title}
        </Text>,
        <Text key="1" style={styles.jotContent}>
          {this.state.content}
        </Text>,
        peopleComponent,
      ];
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <NavigationBar
            title={titleConfig}
            rightButton={rightButtonConfig}
            leftButton={leftButtonConfig}
          />
          {content}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default JotDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  jotTitleInput: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
  },
  jotContentInput: {
    height: 400,
    borderColor: 'gray',
    borderWidth: 1,
  },
  jotTitle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
  },
  jotContent: {
    height: 400,
    borderColor: 'gray',
    borderWidth: 1,
  },
  peopleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});
