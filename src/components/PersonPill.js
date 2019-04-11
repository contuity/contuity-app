import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { buttonText } from '../../assets/style/common.style';
import theme from '../../assets/style/theme.style';

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
        leftIcon={{
          name: 'close',
          close: 'material-community',
          size: theme.fontSizeSmall,
        }}
        containerStyle={styles.pillContainer}
        contentContainerStyle={styles.pillContentContainer}
        pad={10}
      />
    );
  }
}

const styles = StyleSheet.create({
  pillContainer: {
    width: 160,
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 25,
    paddingTop: 0,
    paddingBottom: 0,
  },
  pillContentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  personItemTitle: {
    ...buttonText,
    flex: 1,
  },
  personItem: {
    padding: 5,
  },
});

export default PersonPill;
