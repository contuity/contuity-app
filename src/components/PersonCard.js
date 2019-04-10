import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { h2 } from '../../assets/style/common.style';

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
          titleStyle={styles.personName}
          onPress={() => this.props.onPress(this.props.person)}
          containerStyle={styles.listItemContainer}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    margin: 8,
    aspectRatio: 1,
    width: '90%',
  },
  personContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  personItem: {
    width: '100%',
  },
  personName: {
    ...h2,
    textAlign: 'center',
  },
});

export default PersonCard;
