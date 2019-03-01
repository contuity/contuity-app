import React from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import JotCard from './JotCard';

const JotList = ({ sections }) => {
  return (
    <SectionList
      renderItem={item => <JotCard jot={item.item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      sections={sections}
      keyExtractor={(item, index) => index}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
});

export default JotList;