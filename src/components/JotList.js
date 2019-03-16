import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import JotCard from './JotCard';

const JotList = props => {
  return (
    <SectionList
      renderItem={item => (
        <JotCard
          jot={item.item}
          onPress={props.onJotPress}
          selectionMode={props.listSelectionMode}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles}>{title}</Text>
      )}
      sections={props.sections}
      keyExtractor={(item, index) => index}
    />
  );
};

const styles = {
  paddingTop: 15,
  paddingBottom: 5,
  paddingLeft: 10,
  fontSize: 18,
  fontWeight: 'bold',
  backgroundColor: 'white',
};

export default JotList;
