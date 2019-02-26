import React, { Component } from 'react';
import { Button, ListItem } from 'react-native-elements';
import { ScrollView, SafeAreaView, SectionList, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import NewJot from './NewJot';
import Jot from '../database/models/Jot.js';


class AllJotsScreen extends Component {
  constructor(props) {
    super(props);
    this.showNewJotPage = this.showNewJotPage.bind(this);
    this.onJotFinished = this.onJotFinished.bind(this);
    this.state = {
      latestJots: [],
      isShowingNewJotPage: false,
    };
  }

  componentWillMount() {
    this.setState({ latestJots: JotService.findAll() });
  }

  showNewJotPage() {
    this.setState({
      isShowingNewJotPage: true
    })
  }


  onJotFinished(jotInfo) {
    console.log(jotInfo)

    // New jot creation was cancelled
    if (jotInfo == null) {
      return;
    }

    let jot = new Jot(Date.now(), 'Jot 1', jotInfo.text)

    let newJots = this.state.latestJots.slice();
    newJots.push(jot)


    this.setState({
      latestJots: newJots,
      isShowingNewJotPage: false
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
      />
    );
  }

  render() {

    let newJotPage = null;
    if (this.state.isShowingNewJotPage) {
      return <NewJot onJotFinished={this.onJotFinished}/>
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
            onPress={this.showNewJotPage}
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
