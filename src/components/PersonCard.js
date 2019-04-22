import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { h3 } from '../../assets/style/common.style';
import themeStyles from '../../assets/style/theme.style';

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
          subtitle={`${this.props.person.jots.length} jots`}
          subtitleStyle={styles.personSubtitle}
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
    aspectRatio: 1,
    width: '100%',
  },
  personContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  personItem: {
    margin: 18,
  },
  personName: {
    ...h3,
    fontFamily: themeStyles.assistantSB,
  },
  personSubtitle: {
    ...h3,
  },
});

export default PersonCard;
