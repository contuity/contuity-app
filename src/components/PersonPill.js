import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { buttonText } from '../../assets/style/common.style';
import themeStyles from '../../assets/style/theme.style';

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
            size: themeStyles.fontSizeSmall,
            color: themeStyles.secondaryColor,
            onPress: this.props.onRemovePress,
          }
        }
        containerStyle={styles.pillContainer}
        contentContainerStyle={styles.pillContentContainer}
        pad={10}
      />
    );
  }
}

const styles = StyleSheet.create({
  pillContainer: {
    width: 130,
    borderColor: themeStyles.secondaryColor,
    borderWidth: 2,
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  pillContentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  personItemTitle: {
    flex: 1,
    fontFamily: themeStyles.assistantSB,
    fontSize: themeStyles.fontSizeSmall,
    color: themeStyles.secondaryColor,
  },
  personItem: {
    padding: 5,
  },
});

export default PersonPill;
