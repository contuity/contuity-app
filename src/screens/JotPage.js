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
    this.onCreateJobHit = this.onCreateJobHit.bind(this);

    let content = '';
    if (props.jot) {
      content = props.jot.content
    }

    this.state = {
      content: content,
      isEditing: props.isEditing,

    };
  }

  onChangeText(event) {
    this.setState({content:event})
  }

  onCreateJobHit() {
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
