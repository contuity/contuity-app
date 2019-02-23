import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button } from 'react-native-elements';




class NewJob extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.state = {
      latestJots: [],
    };
  }

  componentWillMount() {
    // this.setState({ latestJots: JotService.findAll() });
  }

  onChangeText() {
    this.setState({text:text})
  }

  render() {



  const rightButtonConfig = {
    title: 'Next',
    handler: () => alert('hello!'),
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

    // return <View style={styles.container}><Text>hiiii</Text></View>;


    const navbarStyles = {
        container: {
          flex: 1,
        },
      };


// // <Text>hi there</Text>
    return (
      <View style={styles.container}>
        <View style={navbarStyles.container}>
          <NavigationBar
            title={titleConfig}
            rightButton={rightButtonConfig}
          />
          
          <TextInput
            style={{height: 600, borderColor: 'gray', borderWidth: 1}}
            onChangeText={this.onChangeText}
            value={this.state.text}
            multiline={true}
          />


          <Button
            title="Create new Jot"
            
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

export default NewJob;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
