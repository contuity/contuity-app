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
    this.onChangeText = this.onChangeText.bind(this);
    this.onCancelHit = this.onCancelHit.bind(this);
    this.onRightButtonClick = this.onRightButtonClick.bind(this);
    this.onJotTitleChange = this.onJotTitleChange.bind(this);

    this.onEditPersonPress = this.onEditPersonPress.bind(this);
    this.onEditReminderPress = this.onEditReminderPress.bind(this);
    this.onEditSpacesPress = this.onEditSpacesPress.bind(this);

    let content = '';
    let title = '';
    let id = null;
    let spaces = []
    if (props.jot) {
      content = props.jot.content;
      id = props.jot.id;
      title = props.jot.title;
      spaces = props.jot.spaces;
    }

    // If we started with a jot, just edit it and return it... ?
    // this violates react...
    // TODO: create a new jot with the same ID
    let jot = this.props.jot;

    this.state = {
      // Keep track of the jot, in case we are creating a new jot and it goes (null -> Jot)
      jot: jot,
      // id: id

      title: title,
      content: content,
      isEditing: props.isEditing,
      spaces: spaces,
    };
  }

  onJotTitleChange(event) {
    this.setState({
      title: event,
    });
  }

  saveAndGetJot() {
    // If the user didn't enter anything, don't save anything
    if (this.state.content == null || this.state.content === '') {
      return null;
    }

    // TODO: fix - we shouldn't be editing objects on the state
    let jot = this.state.jot;
    let newAttrs = {};
    if (jot) {
      newAttrs.content = this.state.content;
      newAttrs.title = this.state.title;
    } else {
      // Make a new jot
      jot = new Jot(this.state.title, this.state.content);
    }

    // save it
    JotService.save(jot, newAttrs);

    return jot;
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

  onEditPersonPress() {
    console.log("add person hit");

  }

  onEditReminderPress() {
    console.log("edit reminder hit");
  }


  onEditSpacesPress() {
    console.log("edit space hit");
  }

  onCancelHit() {
    let jot = this.saveAndGetJot();
    this.props.onJotFinished(jot);
  }

  render() {
    let rightButtonConfig = {
      title: 'Create',
      handler: this.onRightButtonClick,
    };

    if (this.state.isEditing) {
      rightButtonConfig.title = 'Save';
    } else {
      rightButtonConfig.title = 'Edit';
    }

    // Unfinished code for having a button
    // rightButtonConfig = (
    //   <Button
    //     buttonStyle={{height:12, paddingTop:10, marginTop:15, marginRight:20, paddingRight:10, height: 15}}
    //     onPress={this.onRightButtonClick}
    //     title="Create jot"
    //   >HII</Button> )

    // rightButtonConfig = (
    //   )

    // <Button
    //   title="Create new Jot"
    // />

    const leftButtonConfig = {
      title: 'Back',
      handler: this.onCancelHit,
    };

    let titleConfig = {
      height: 100,
    };

    if (this.state.isEditing) {
      titleConfig.title = 'Edit Jot';
    } else {
      titleConfig.title = 'View Jot';
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
    });

    const navbarStyles = {
      container: {
        flex: 1,
      },
    };

    const jotTitleStyle = StyleSheet.create({
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 25,
    });


    // Generate the add person/edit reminder/add space row of buttons
    // keeing separate for now until we know how we are going to layout these buttons (top of keyboard or bottom of content)
    // let editBar = ( 
    //   <View key="3">
    //   <Button
    //     key="0"
    //     title="Add Person"
    //     onPress = {this.onEditPersonPress}
    //     containerStyle={buttonRowStyle}
    //   />,
    //   <Button
    //     key="1"
    //     title="Edit reminder"
    //     onPress = {this.onEditReminderPress}
    //     containerStyle={buttonRowStyle}
    //   />,
    //   <Button
    //     key="2"
    //     title="Add Space"
    //     onPress = {this.onEditSpacesPress}
    //     containerStyle={buttonRowStyle}
    //   />
    // </View>

    // );


    // Generate the spaces buttons for the view mode
    let spacesButtons = [];
    if (this.state.spaces) {
      for (var i = 0; i < this.state.spaces.length; i++) {
        spacesButtons.push(
          <Button
            title={this.state.spaces[i]}
            type="outline"
          />)
      }
    }

    let buttonRowStyle = {
      // flex: 1,
      // flexDirection: 'row',
      width: 100,
      display: 'flex',
      // paddingRight: 10,
      // paddingLeft: 10
    }
    


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
        <View key="3">
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
