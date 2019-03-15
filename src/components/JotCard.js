import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

const JotCard = props => {
  let jot = props.jot;
  let dateCreated = jot.dateCreated;
  let dateFormat = dateCreated.getMonth() + 1 + '/' + dateCreated.getDate();

  return (
    <ListItem
      style={styles}
      key={jot.id}
      title={jot.title}
      subtitle={jot.content}
      rightSubtitle={dateFormat}
      chevron={true}
      onPress={() => props.onPress(jot)}
    />
  );
};

const styles = {
  width: '100%',
  borderBottomColor: 'rgba(0, 0, 0, 0.2)',
  borderBottomWidth: 1,
};

export default JotCard;
