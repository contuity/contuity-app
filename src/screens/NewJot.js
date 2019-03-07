import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button } from 'react-native-elements';




class NewJot extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onCancelHit = this.onCancelHit.bind(this);
    this.onCreateJobHit = this.onCreateJobHit.bind(this);

    this.state = {
      text: ''
    };
  }

  onChangeText(event) {
    debugger
    this.setState({text:event})
  }

  onCreateJobHit() {
    console.log("Jot created with ", this.text);
    this.props.onJotFinished({text:this.state.text})

  }

  onCancelHit() {
    this.props.onJotFinished(null)
  }

  render() {

  let rightButtonConfig = {
    title: 'Create',
    handler: this.onCreateJobHit,
  };

  // rightButtonConfig = ( 
  //   <Button
  //     buttonStyle={{height:12, paddingTop:10, marginTop:15, marginRight:20, paddingRight:10, height: 15}}
  //     onPress={this.onCreateJobHit}
  //     title="Create jot"
  //   >HII</Button> )


  // rightButtonConfig = (
  //   )


  const leftButtonConfig = {
    title: 'Cancel',
    handler: this.onCancelHit,
  };

  const titleConfig = {
    title: 'New Jot ',
  };


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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
 
    return (
      <View style={styles.container}>
        <View style={navbarStyles.container}>
          <NavigationBar
            title={titleConfig}
            rightButton={rightButtonConfig}
            leftButton={leftButtonConfig}
          />
          
          <TextInput
            style={{height: 600, borderColor: 'gray', borderWidth: 1}}
            onChangeText={this.onChangeText}
            value={this.state.text}
            multiline={true}
          />




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

export default NewJot;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
