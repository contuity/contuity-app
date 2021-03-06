import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

class TwoColumnList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let leftColumn = [];
    let rightColumn = [];
    let data = this.props.section.data;

    data.forEach((item, index) => {
      if (index % 2 === 1) {
        rightColumn.push(item);
      } else {
        leftColumn.push(item);
      }
    });

    return (
      <View style={styles.outerStyle}>
        <View style={styles.firstColumnStyle}>
          <FlatList
            renderItem={this.props.renderItem}
            data={leftColumn}
            keyExtractor={(item, index) => `jot-${index}`}
          />
        </View>
        <View style={styles.secondColumnStyle}>
          <FlatList
            renderItem={this.props.renderItem}
            data={rightColumn}
            keyExtractor={(item, index) => `jot-${index}`}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerStyle: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  firstColumnStyle: {
    flex: 1,
  },
  secondColumnStyle: {
    flex: 1,
  },
});

export default TwoColumnList;
