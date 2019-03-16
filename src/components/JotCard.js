import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import JotService from '../database/services/JotService';

const JotCard = props => {
  let jot = props.jot;
  let dateCreated = jot.dateCreated;
  let dateFormat = dateCreated.getMonth() + 1 + '/' + dateCreated.getDate();

  const selectionBtn = (
    <Button
      title="Delete"
      type="clear"
      onPress={() => JotService.delete(jot)}
    />
  );

  return (
    <View style={styles.jotContainer}>
      {props.selectionMode && selectionBtn}
      <ListItem
        style={styles.jotItem}
        key={jot.id}
        title={jot.title}
        subtitle={jot.content}
        rightSubtitle={dateFormat}
        chevron={true}
        onPress={() => props.onPress(jot)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  jotContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  jotItem: {
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1
  },
});

export default JotCard;
