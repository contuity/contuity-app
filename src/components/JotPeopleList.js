import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import PersonPill from './PersonPill';

class JotPeopleList extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    if (item.index % 2 !== 0) {
      return null;
    }

    const items = [];

    for (let i = item.index; i < item.index + 2; i++) {
      if (i >= item.section.data.length) {
        break;
      }

      let itemToAdd = item.section.data[i];

      items.push(
        <PersonPill person={itemToAdd} onPress={this.props.onPersonPress} />
      );
    }

    return <View style={styles.itemsContainer}>{items}</View>;
  }

  render() {
    return (
      <SectionList
        renderItem={this.renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        sections={this.props.sections}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  itemsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default JotPeopleList;
