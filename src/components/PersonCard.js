import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { h3, shadow } from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

class PersonCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let firstName = this.props.person.firstName;
    let lastName = this.props.person.lastName;

    let firstInitial = firstName.charAt(0);
    let lastInitial = lastName.charAt(0);

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
          <Avatar
            rounded
            title={firstInitial + lastInitial}
            titleStyle={styles.photoTitle}
            avatarStyle={styles.photo}
            containerStyle={styles.photoContainer}
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
    borderRadius: 10,
    aspectRatio: 1,
    width: '100%',
    backgroundColor: styleConstants.lightBlue,
    padding: 0,
  },
  contentContainer: {
    backgroundColor: '#2D3353',
    opacity: 0.75,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 11,
    width: '100%',
  },
  photo: {
    backgroundColor: styleConstants.lightBlue,
  },
  photoTitle: {
    color: styleConstants.primaryColor,
    fontFamily: styleConstants.assistantNorm,
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
