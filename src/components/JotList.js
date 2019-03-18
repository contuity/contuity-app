import React, { Component } from 'react';
import { SectionList, Text } from 'react-native';
import JotCard from './JotCard';

class JotList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SectionList
        renderItem={item => {
          return (
            <JotCard
              jot={item.item}
              onPress={this.props.onJotPress}
              onSelect={this.props.onJotSelect}
              selectionMode={this.props.listSelectionMode}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles}>{title}</Text>
        )}
        sections={this.props.sections}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

const styles = {
  paddingTop: 15,
  paddingBottom: 5,
  paddingLeft: 10,
  fontSize: 18,
  fontWeight: 'bold',
  backgroundColor: 'white',
};

export default JotList;
