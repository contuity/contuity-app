import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, CheckBox, ListItem } from 'react-native-elements';
import JotService from '../database/services/JotService';

class JotCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  onJotSelect(jot) {
    this.props.onSelect(jot);
    this.setState({
      selected: !this.state.selected,
    });
  }

  render() {
    let jot = this.props.jot;
    let dateCreated = jot.dateCreated;
    let dateFormat = dateCreated.getMonth() + 1 + '/' + dateCreated.getDate();

    const selectionBtn = (
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        onPress={() => this.onJotSelect(jot)}
        checked={this.state.selected}
      />
    );
    return (
      <View style={styles.jotContainer}>
        {this.props.selectionMode && selectionBtn}
        <ListItem
          style={styles.jotItem}
          key={jot.id}
          title={jot.title}
          subtitle={jot.content}
          rightSubtitle={dateFormat}
          chevron={true}
          onPress={() => this.props.onPress(jot)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  jotContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  jotItem: {
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
});

export default JotCard;
