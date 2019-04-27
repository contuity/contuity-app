import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import styleConstants from '../../assets/style/theme.style';

class PersonPill extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListItem
        style={styles.personItem}
        key={this.props.person.id}
        title={this.props.person.firstName + ' ' + this.props.person.lastName}
        titleStyle={styles.personItemTitle}
        titleProps={{ numberOfLines: 1 }}
        leftIcon={
          this.props.isEditing && {
            name: 'close',
            close: 'material-community',
            size: styleConstants.fontSizeSmall,
            color: styleConstants.secondaryColor,
            onPress: this.props.onRemovePress,
          }
        }
        containerStyle={styles.pillContainer}
        contentContainerStyle={{ flex: 0 }}
        pad={10}
      />
    );
  }
}

const styles = StyleSheet.create({
  pillContainer: {
    borderColor: styleConstants.secondaryColor,
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 10,
  },
  personItemTitle: {
    fontFamily: styleConstants.assistantSB,
    fontSize: styleConstants.fontSizeSmall,
    color: styleConstants.secondaryColor,
    textAlign: 'center',
  },
  personItem: {
    padding: 5,
  },
});

export default PersonPill;
