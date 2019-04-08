import React, { Component } from 'react';
import { SectionList,StyleSheet, Text, View } from 'react-native';
import JotCard from './JotCard';
import {h1} from '../../assets/style/common.style';


class JotList extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    let newSectionsLeftColumn = [];
    let newSectionsRightColumn = [];


    for (let [sectionIndex, section] of this.props.sections.entries()) {

      newSectionsLeftColumn.push({
        title: section.title,
        data: []
      })

      newSectionsRightColumn.push({
        title: section.title,
        data: []
      })

      if (!section.data) {
        continue;
      }

      let entries = section.data.slice().reverse()

      for (let [index, jot] of entries.entries()) {

        // Is an odd index
        if (index & 1) {
          newSectionsRightColumn[sectionIndex].data.push(jot);
        }
        else {
          newSectionsLeftColumn[sectionIndex].data.push(jot);
        }
      }
    }

    let outerStyle = {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'white',
      color: 'blue'
    }

    let firstColumnStyle = {
      flex: 1
    }

    let secondColumnStyle = {
      flex: 1,
      marginTop: 50
    }

    return (
      <View style={outerStyle}>
        <View style={firstColumnStyle}>
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
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            sections={newSectionsLeftColumn}
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
            sections={newSectionsRightColumn}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  sectionHeader: {
   ...h1,

   // Ryan added this - does it look good?
   marginLeft: 3
  }
});

export default JotList;
