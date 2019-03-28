import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';

class PersonCard extends Component {
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
          onPress={() => this.props.onPress(this.props.person)}
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
    height: 100,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default PersonCard;
