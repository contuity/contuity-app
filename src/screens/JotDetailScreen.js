import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Jot from '../database/models/Jot';

class JotDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onCancelHit = this.onCancelHit.bind(this);
    this.onRightButtonClick = this.onRightButtonClick.bind(this);
    this.onJotTitleChange = this.onJotTitleChange.bind(this);

    let content = '';
    let title = '';
    let id = null;
    if (props.jot) {
      content = props.jot.content;
      id = props.jot.id;
      title = props.jot.title;
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
      jotTitleStyle: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
      },
    });

    const navbarStyles = {
      container: {
        flex: 1,
      },
    };

    let content;
    if (this.state.isEditing) {
      content = [
        <Input
          key="0"
          inputStyle={styles.jotTitleStyle}
          placeholder="Jot title"
          onChangeText={this.onJotTitleChange}
          value={this.state.title}
        />,
        <TextInput
          key="1"
          style={{ height: 600, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Jot content"
          onChangeText={this.onChangeText}
          value={this.state.content}
          multiline={true}
        />,
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
          style={{ height: 600, borderColor: 'gray', borderWidth: 1 }}
        >
          {this.state.content}
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

export default JotDetailScreen;
