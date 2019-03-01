import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

const JotCard = ({ jot }) => {
  let dateCreated = jot.dateCreated;
  let dateFormat = dateCreated.getMonth() + 1 + '/' + dateCreated.getDate();

  return (
    <ListItem
      style={styles.jotCard}
      key={jot.id}
      title={jot.title}
      subtitle={jot.content}
      rightSubtitle={dateFormat}
      chevron={true}
    />
  );
};

const styles = StyleSheet.create({
  jotCard: {
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
});

export default JotCard;
