import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PersonCard from './PersonCard';
import TwoColumnList from './TwoColumnList';
import { h1 } from '../../assets/style/common.style';

class PersonList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = this.props.sections.map((section, index) => {
      return (
        <View key={index}>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          <TwoColumnList
            section={section}
            renderItem={item => (
              <PersonCard
                person={item.item}
                onPress={this.props.onPersonPress}
              />
            )}
          />
        </View>
      );
    });

    return <View>{content}</View>;
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    ...h1,
    marginLeft: 18,
  },
});

export default PersonList;
