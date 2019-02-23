import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import { SafeAreaView, SectionList, Text, StyleSheet } from 'react-native';
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
        style={styles.listItem}
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
        <SectionList
          style={styles.sectionList}
          renderItem={this.renderJotItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          )}
          sections={[
            { title: 'Today', data: this.state.latestJots },
            { title: 'This week', data: this.state.latestJots },
            { title: 'This month', data: this.state.latestJots },
          ]}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    );
  }
}

export default AllJotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    width: '100%',
  },
  sectionList: {
    width: '100%',
  },
});
