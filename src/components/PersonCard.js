import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import InitialsAvatar from '../components/InitialsAvatar';
import { h3, shadow } from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

class PersonCard extends Component {
  render() {
    let firstName = this.props.person.firstName;
    let lastName = this.props.person.lastName;

    return (
      <ListItem
        style={styles.personItem}
        key={this.props.person.id}
        title={firstName + ' ' + lastName}
        titleStyle={styles.personName}
        titleProps={{ numberOfLines: 1 }}
        subtitle={`${this.props.person.jots.length} jots`}
        subtitleStyle={styles.personSubtitle}
        leftAvatar={
          <InitialsAvatar
            firstName={firstName}
            lastName={lastName}
            size={100}
          />
        }
        onPress={() => this.props.onPress(this.props.person)}
        contentContainerStyle={styles.contentContainer}
        containerStyle={styles.listItemContainer}
        underlayColor="transparent"
      />
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: styleConstants.lightBlue,
    padding: 0,
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 11,
    backgroundColor: 'rgba(45, 51, 83, 0.75)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  personItem: {
    ...shadow,
    margin: 18,
  },
  personName: {
    ...h3,
    fontFamily: styleConstants.assistantSB,
    color: 'white',
  },
  personSubtitle: {
    ...h3,
    color: 'white',
  },
});

export default PersonCard;
