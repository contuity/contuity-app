import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { h2, h3 } from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

let MAX_CONTENT_HEIGHT = 75;

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

  render() {
    let jot = this.props.jot;
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
          titleStyle={styles.jotTitle}
          subtitle={content}
          subtitleStyle={styles.jotBody}
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
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.25,
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
    paddingBottom: '7%',
  },
  jotTitle: {
    ...h2,
    color: 'black',
    paddingBottom: 4,
  },
  jotBody: {
    ...h3,
    color: 'black',
  },
});

export default JotCard;
