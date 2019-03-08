import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Realm from 'realm';


const AUTH_URL = 'https://contuity-2.us1a.cloud.realm.io'


class Login extends Component {
  constructor(props) {
    super(props);
    // this.onChangeText = this.onChangeText.bind(this);
    // this.onCancelHit = this.onCancelHit.bind(this);
    // this.onCreateJobHit = this.onCreateJobHit.bind(this);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordVerification = this.onChangePasswordVerification.bind(this);

    this.signIn = this.signIn.bind(this);
    this.onCreateAnAccountClick = this.onCreateAnAccountClick.bind(this);

    this.backToSignIn = this.backToSignIn.bind(this);
    this.signUpForAccount = this.signUpForAccount.bind(this);

    
    // this.onCreateJobHit = this.onCreateJobHit.bind(this);

    this.state = {
      email: '',
      password: '',
      passwordVerification: '',
      isShowingSignup: false
    };
  }

  onChangeEmail(event) {
    
    this.setState({email:event})
  }

  onChangePassword(event) {
    
    this.setState({password:event})
  }

  onChangePasswordVerification(event) {
    
    this.setState({passwordVerification: event})
  }

  backToSignIn() {

    this.setState({
      email: '',
      password: '',
      isShowingSignup: false
    })
  }


  async signUpForAccount() {
    if (this.state.password == '') {
      console.error('Password is empty')
      return;
    }

    if (this.state.password !== this.state.passwordVerification) {
      console.error("Passwords do not match")
      return;
    }


    let creds = Realm.Sync.Credentials.usernamePassword(this.state.email, this.state.password, true) // createUser = true


    let user = await Realm.Sync.User.login(AUTH_URL, creds)

    console.log(user)



    // Attempt to sign up for a new account 


  }



  async signIn() {
    if (this.state.email == '') {
      console.error('Email is empty')
      return;
    }

    if (this.state.password == '') {
      console.error('Password is empty')
      return;
    }



    // Attempt to sign in 

    let creds = Realm.Sync.Credentials.usernamePassword(this.state.email, this.state.password, false) // createUser = true


    let user = await Realm.Sync.User.login(AUTH_URL, creds)

    console.log(user)


  }

  onCreateAnAccountClick() {
    this.setState({
      email: '',
      password: '',
      isShowingSignup: true
    })
  }



  onCreateJobHit() {
    console.log("Jot created with ", this.text);
    this.props.onJotFinished({text:this.state.text})

  }

  onCancelHit() {
    this.props.onJotFinished(null)
  }

  // let creds = Realm.Sync.Credentials.usernamePassword('username', 'password', true) // createUser = true

  render() {





    // let rightButtonConfig = {
    //   title: 'Create',
    //   handler: this.onCreateJobHit,
    // };


    // const leftButtonConfig = {
    //   title: 'Cancel',
    //   handler: this.onCancelHit,
    // };

    // const titleConfig = {
    //   title: 'New Jot ',
    // };


    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     // justifyContent: 'center',
    //     // alignItems: 'center',
    //     backgroundColor: '#F5FCFF',
    //   },
    // });


    const navbarStyles = {
        container: {
          flex: 1,
          marginTop: 200
        },
        
      };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    });

    const userNameInputStyle = StyleSheet.create({
        marginTop: 10,  
        marginBottom: 10,
        marginLeft: 25  
      // display: 'flex',
      
    });

    const passwordInputStyle = StyleSheet.create({
        marginTop: 10,  
        marginBottom: 10,
        marginLeft: 25    
      // marginBottom: 'auto'
    });

    // let buttonC

    const createAccountButton = StyleSheet.create({
      width: 150,
      marginLeft: 120,
      marginTop: 20,
      // marginLeft: 'auto',
      // marginRight: 'auto',
      // alignSelf: 'center',
      // flex: 1,
      // justifyContent: 'center',


      // headline: {
      //   textAlign: 'center'  
      // }
      



    })



    let buttons;
    if (this.state.isShowingSignup) {

      buttons = [

          <Input
            key="0"
            inputStyle={passwordInputStyle}
            placeholder='Password again'
            onChangeText={this.onChangePasswordVerification}
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            secureTextEntry={true}
          />,
          <Button
            key="1"
            buttonStyle={createAccountButton}
            onPress={this.signUpForAccount}
            title="Sign Up"
          />,
          <Button
            key="2"
            buttonStyle={createAccountButton}
            onPress={this.backToSignIn}
            title="Back"
          />]
    }
    else {
      buttons = [
          <Button
            key="0"
            buttonStyle={createAccountButton}
            onPress={this.signIn}
            title="Login"
          />,
          <Button
            key="1"
            buttonStyle={createAccountButton}
            onPress={this.onCreateAnAccountClick}
            title="Create an account"
          />]
    }


    return (
      <View style={styles.container}>
        <View style={navbarStyles.container}>
          
          

          <Input
            inputStyle={userNameInputStyle}
            placeholder='Email'
            onChangeText={this.onChangeEmail}
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          />

          <Input
            inputStyle={passwordInputStyle}
            placeholder='Password'
            onChangeText={this.onChangePassword}
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            secureTextEntry={true}
          />
          {buttons}

        </View>
      </View>
    )
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
