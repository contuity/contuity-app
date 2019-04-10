import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';

class PersonPill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.personContainer}>
        <ListItem
          style={styles.personItem}
          key={this.props.person.id}
          title={this.props.person.firstName + ' ' + this.props.person.lastName}
          titleStyle={styles.personItemTitle}
          rightElement={{ name: 'close', close: 'material-community' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  personContainer: {
    flex: 1,
    flexDirection: 'row',
    //alignItems: 'flex-start',
  },
  personItem: {
    width: '100%',
    height: 50,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderRadius: 25,
    overflow: 'hidden',
  },
  personItemTitle: {
    fontSize: 12,
  },
});

export default PersonPill;
