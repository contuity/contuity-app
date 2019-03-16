import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';

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
        containerStyle={styles.selectBtn}
        size={20}
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
          style={
            this.props.selectionMode ? styles.jotItemSelectMode : styles.jotItem
          }
          key={jot.id}
          title={jot.title}
          subtitle={jot.content}
          rightSubtitle={dateFormat}
          chevron={true}
          onPress={
            this.props.selectionMode
              ? () => this.onJotSelect(jot)
              : () => this.props.onPress(jot)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  jotContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  selectBtn: {
    width: 10,
  },
  jotItem: {
    width: '100%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
  jotItemSelectMode: {
    width: '90%',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
  },
});

export default JotCard;
