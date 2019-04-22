import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import JotCard from './JotCard';
import TwoColumnList from './TwoColumnList';
import { h1 } from '../../assets/style/common.style';

import styleConstants from '../../assets/style/theme.style.js';

class JotList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.sections.map((section, index) => {
      return (
        <View style={styles.container} key={index}>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          <TwoColumnList
            section={section}
            renderItem={item => (
              <JotCard
                jot={item.item}
                onPress={this.props.onJotPress}
                onSelect={this.props.onJotSelect}
                selectionMode={this.props.listSelectionMode}
              />
            )}
          />
        </View>
      );
    });

    return (
      <View>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginVertical: 20,
  },

  sectionHeader: {
    ...h1,
    marginBottom: 16,
  },

  background: {
    height: '100%',
  },
});

export default JotList;
