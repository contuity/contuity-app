import React, { Component } from 'react';
import { Button, ListItem } from 'react-native-elements';
import { ScrollView, SafeAreaView, SectionList, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import JotPage from './JotPage';
import Jot from '../database/models/Jot.js';


class AllJotsScreen extends Component {
  constructor(props) {
    super(props);
    this.createNewJot = this.createNewJot.bind(this);
    this.onJotFinished = this.onJotFinished.bind(this);
    this.onJotSelect = this.onJotSelect.bind(this);
    this.renderJotItem = this.renderJotItem.bind(this);
    this.state = {
      latestJots: [],

      // These variables keep track of how and when to show a Jot detail page. 
      isShowingNewJotPage: false,
      startWithJot: null,
      startInEditMode: false

    };
  }

  componentWillMount() {
    this.setState({ latestJots: JotService.findAll() });
  }

  createNewJot() {
    this.setState({
      isShowingNewJotPage: true,
      startWithJot: null,
      startInEditMode: true
    })
  }


  onJotFinished(jot) {
    console.log(jot)

    // New jot creation was cancelled
    if (jot == null) {
      this.setState({
        isShowingNewJotPage: false
      })
      return;
    }

    let newJots = this.state.latestJots.slice();
    if (!newJots.includes(jot)) {
      newJots.push(jot);  
    }


    this.setState({
      latestJots: newJots,
      isShowingNewJotPage: false
    })
  }

  onJotSelect(jot) {
    console.log(jot)

    this.setState({
      isShowingNewJotPage: true,
      startWithJot: jot,
      startInEditMode: false,
    })
  }



  renderJotItem(item) {
    let jot = item.item;

    return (
      <ListItem
        style={styles.jotListItem}
        key={jot.id}
        title={jot.title}
        subtitle={jot.content}
        rightSubtitle={jot.dateCreated.toDateString()}
        chevron={true}
        onPress={this.onJotSelect.bind(null, jot)}
      />
    );
  }

  render() {

    let newJotPage = null;
    if (this.state.isShowingNewJotPage) {
      return <JotPage onJotFinished={this.onJotFinished} isEditing={this.state.startInEditMode} jot={this.state.startWithJot} />
    }



    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
          <Button
            buttonStyle={styles.editButton}
            type="clear"
            title="Edit"
          />
          <SectionList
            style={styles.allJotsList}
            renderItem={this.renderJotItem}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            sections={[
              { title: 'Today', data: this.state.latestJots },
              { title: 'This week', data: this.state.latestJots },
              { title: 'This month', data: this.state.latestJots },
            ]}
            keyExtractor={(item, index) => index}
          />
          <Button
            icon={{
              name: "pencil",
              type: "material-community",
              size: 15,
              color: "black"
            }}
            onPress={this.createNewJot}
            title="Create jot"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default AllJotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: 'bold'
  },
  jotListItem: {
    width: '100%',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  allJotsList: {
    width: '100%',
  },
});
