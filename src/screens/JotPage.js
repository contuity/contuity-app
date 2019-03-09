import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Jot from '../database/models/Jot'


class JotPage extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onCancelHit = this.onCancelHit.bind(this);
    this.onRightButtonClick = this.onRightButtonClick.bind(this);

    let content = '';
    let id = null;
    if (props.jot) {
      content = props.jot.content
      id = props.jot.id;
    }



    this.state = {
      id: id
      content: content,
      isEditing: props.isEditing,

    };
  }

  getJot() {

    if (this.) {}

    new 
  }

  onChangeText(event) {
    this.setState({content:event})
  }

  onRightButtonClick() {

    if (this.state.isEditing) {

      // Save the jot and go to view jot mode
      JotService.update()


      this.setState({
        isEditing: false,
      })
      return;
    }

    console.log("Jot created with ", this.state.content);

    let jot = new Jot('Jot 1', this.state.content)

    this.props.onJotFinished(jot)

  }

  onCancelHit() {
    this.props.onJotFinished(null)
  }

  render() {

    let rightButtonConfig = {
      title: 'Create',
      handler: this.onRightButtonClick,
    };


    if (this.state.isEditing) {
      rightButtonConfig.title = 'Save'
    }
    else {
      rightButtonConfig.title = 'Edit'
    }

    // rightButtonConfig = ( 
    //   <Button
    //     buttonStyle={{height:12, paddingTop:10, marginTop:15, marginRight:20, paddingRight:10, height: 15}}
    //     onPress={this.onRightButtonClick}
    //     title="Create jot"
    //   >HII</Button> )


    // rightButtonConfig = (
    //   )


    const leftButtonConfig = {
      title: 'Cancel',
      handler: this.onCancelHit,
    };




    let titleConfig = {
      height: 100
    };

    if (this.state.isEditing) {
      titleConfig.title = 'Edit Jot'
    }
    else {
      titleConfig.title = 'New Jot'
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


          // <Button
          //   title="Create new Jot"
          // />



    let content;
    if (this.state.isEditing) {
      content = (
        <TextInput
          style={{height: 600, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.onChangeText}
          value={this.state.content}
          multiline={true}
        />
      )
    }
    else {
      content = (
        <Text style={{height: 600, borderColor: 'gray', borderWidth: 1}}>
          {this.state.content}
        </Text>  
      )
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
    )

    

    


    // let textElements = [];
    // for (let item of this.state.latestJots) {
    //   textElements.push(<Text>{item.content}</Text>);
    // }

    // return <View style={styles.container}>{textElements}</View>;


    
  }
}

export default JotPage;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
