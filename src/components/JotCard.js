import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import {
  h2,
  h3,
  shadow,
  photo,
  photoTitle,
} from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style.js';

let MAX_CONTENT_HEIGHT = 120;

class JotCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  componentDidUpdate(prevProps) {
    // reset selected flag whenever mode changes
    if (prevProps.selectionMode != this.props.selectionMode) {
      this.setState({
        selected: false,
      });
    }
  }

  onJotSelect(jot) {
    if (!this.props.selectionMode) {
      this.props.onPress(jot);
      return;
    }
    this.props.onSelect(jot);
    this.setState({
      selected: !this.state.selected,
    });
  }

  getAllPeople() {
    let jot = this.props.jot;
    let allPeopleForJot = [];

    if (jot && jot.people) {
      allPeopleForJot = jot.people.slice(0);
    }

    return allPeopleForJot;
  }

  render() {
    let jot = this.props.jot;

    let peopleComponent = (
      <View style={styles.peopleContainer}>
        {this.getAllPeople().map((person, index) => {
          const firstInitial = person.firstName.charAt(0);
          const lastInitial = person.lastName.charAt(0);
          return (
            <Avatar
              rounded
              title={firstInitial + lastInitial}
              titleStyle={photoTitle}
              avatarStyle={photo}
              containerStyle={styles.photoContainer}
              size="small"
            />
          );
        })}
      </View>
    );

    let content = jot.content.slice(0, MAX_CONTENT_HEIGHT);

    if (jot.content.length > MAX_CONTENT_HEIGHT) {
      content += '...';
    }

    return (
      <View style={styles.jotContainer}>
        <ListItem
          style={styles.jotItem}
          key={jot.id}
          title={jot.title}
          titleStyle={jot.title == '' ? styles.jotTitleEmpty : styles.jotTitle}
          subtitle={content}
          subtitleStyle={styles.jotBody}
          // TODO
          /* currently a jot can properly handle displaying two people, if there are more than two people, another circle would be added displaying a plus sign (+) and how many more people there are */
          leftElement={peopleComponent}
          containerStyle={
            this.state.selected
              ? styles.selectedListItemContainer
              : styles.listItemContainer
          }
          onPress={() => this.onJotSelect(jot)}
          underlayColor="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    ...shadow,
    borderRadius: 10,
    flexDirection: 'column-reverse',
    alignItems: 'flex-start',
  },
  selectedListItemContainer: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: styleConstants.selectedColor,
  },
  jotContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', //cant get proper spacing between cards
  },
  jotItem: {
    width: '94%',
    marginBottom: '7%',
  },
  jotTitle: {
    ...h2,
    color: 'black',
    paddingBottom: 4,
    height: 'auto',
  },
  jotTitleEmpty: {
    height: 0,
  },
  jotBody: {
    ...h3,
    color: 'black',
    height: 'auto',
  },
  peopleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  photoContainer: {
    marginTop: 12,
    marginBottom: 4,
    marginRight: 8,
  },
});

export default JotCard;
