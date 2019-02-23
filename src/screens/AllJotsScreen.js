import React, { Component } from 'react';
import { Button, ListItem } from 'react-native-elements';
import { ScrollView, SafeAreaView, SectionList, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';

class AllJotsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestJots: [],
    };
  }

  componentWillMount() {
    this.setState({ latestJots: JotService.findAll() });
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
