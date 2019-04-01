import React, { Component } from 'react';
import { SectionList, Text, View } from 'react-native';
import JotCard from './JotCard';

class JotList extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    let leftColumn = []
    let rightColumn = []

    let jots = this.props.sections[0].data

    for (var i = 0; i < jots.length; i++) {

      // Is an odd index
      if (i&1) {
        rightColumn.push(jots[i])
      }
      else {
        leftColumn.push(jots[i])
      }
    }

    let outerStyle = {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'blue',
      color: 'blue'
    }

    let style = {
      flex: 1
    }

    let secondColumnStyle = {
      flex: 1,
      marginTop: 50
    }


    return (
      <View style={outerStyle}>
        <View style={style}>
          <SectionList
            renderItem={item => {
              return (
                <JotCard
                  jot={item.item}
                  onPress={this.props.onJotPress}
                  onSelect={this.props.onJotSelect}
                  selectionMode={this.props.listSelectionMode}
                />
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles}>{title}</Text>
            )}
            sections={this.props.sections}
            keyExtractor={(item, index) => index}
          />
        </View>
        <View style={secondColumnStyle}>
          <SectionList
            renderItem={item => {
              return (
                <JotCard
                  jot={item.item}
                  onPress={this.props.onJotPress}
                  onSelect={this.props.onJotSelect}
                  selectionMode={this.props.listSelectionMode}
                />
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              null
            )}
            sections={this.props.sections}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  paddingTop: 15,
  paddingBottom: 5,
  paddingLeft: 10,
  fontSize: 18,
  fontWeight: 'bold',
  backgroundColor: 'blue',
};

export default JotList;
