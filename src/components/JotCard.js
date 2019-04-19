import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckBox, ListItem } from 'react-native-elements';
import { h2, h3 } from '../../assets/style/common.style';

let MAX_CONTENT_HEIGHT = 150;

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
    let dateCreated = jot.dateCreated;
    let dateFormat = dateCreated.getMonth() + 1 + '/' + dateCreated.getDate();

    // const selectionBtn = (
    //   <CheckBox
    //     containerStyle={styles.selectBtn}
    //     size={20}
    //     checkedIcon="dot-circle-o"
    //     uncheckedIcon="circle-o"
    //     onPress={() => this.onJotSelect(jot)}
    //     checked={this.state.selected}
    //   />
    // );

    let content = jot.content.slice(0, MAX_CONTENT_HEIGHT);

    if (jot.content.length > MAX_CONTENT_HEIGHT) {
      content += '...';
    }

    return (
      <View style={styles.jotContainer}>
        {/* {this.props.selectionMode && selectionBtn} */}
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
    borderWidth: 1,
    borderColor: 'gray',
    margin: 8,
  },
  selectedListItemContainer: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'pink',
    margin: 8,
  },
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
  },
  jotTitle: {
    ...h2,
    color: 'black',
  },
  jotBody: {
    ...h3,
    color: 'black',
  },
});

export default JotCard;
