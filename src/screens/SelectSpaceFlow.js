import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Jot from '../database/models/Jot';

class JotPage extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      value: value,
    };
  }

  onChangeText(event) {
    this.setState({
      content: event,
    });
  }

  onRightButtonClick() {
    if (this.state.isEditing) {
      // Save the jot and go to view jot mode
      let jot = this.saveAndGetJot();

      this.setState({
        jot: jot,
        isEditing: false,
      });
    } else {
      // Edit the existing Jot

      this.setState({
        isEditing: true,
      });
    }
  }


  render() {
    
    let content;
    if (this.state.isEditing) {
      content = [
        <Input
          key="0"
          inputStyle={jotTitleStyle}
          placeholder="Jot title"
          onChangeText={this.onJotTitleChange}
          value={this.state.title}
        />,
        <TextInput
          key="1"
          style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Jot content"
          onChangeText={this.onChangeText}
          value={this.state.content}
          multiline={true}
        />,
        <View key="3" style={buttonContainerStyle}>
          <Button
            key="0"
            title="Add Person"
            onPress = {this.onEditPersonPress}
            containerStyle={buttonRowStyle}
          />
          <Button
            key="1"
            title="Edit reminder"
            onPress = {this.onEditReminderPress}
            containerStyle={buttonRowStyle}
          />
          <Button
            key="2"
            title="Add Space"
            onPress = {this.onEditSpacesPress}
            containerStyle={buttonRowStyle}
          />
        </View>,
      ];
    } else {
      content = [
        <Text
          key="0"
          style={{ height: 100, borderColor: 'gray', borderWidth: 1 }}
        >
          Title: {this.state.title}
        </Text>,
        <Text
          key="1"
          style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
        >
          {this.state.content}
        </Text>,
        <Text
          key="2"
          style={{ height: 200, borderColor: 'gray', borderWidth: 1 }}
        >
          Spaces: {spacesButtons}
        </Text>,
      ];
    }

    return (
      <View style={styles.container}>
        <View style={navbarStyles.container}>
          <NavigationBar
            title={titleConfig}
            rightButton={rightButtonConfig}
            leftButton={leftButtonConfig}
          />
          {content}
        </View>
      </View>
    );
  }
}

export default JotPage;
