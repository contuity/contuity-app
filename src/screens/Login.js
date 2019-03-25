import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginService from '../database/services/LoginService';
// import logo from '../resources/logo.svg'

// Enum of different pages to show
const showingScreen = {
  choose: 'CHOOSE',
  login: 'LOGIN',
  signup: 'SIGNUP',
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordVerification = this.onChangePasswordVerification.bind(
      this
    );

    this.signIn = this.signIn.bind(this);
    this.onCreateAnAccountPress = this.onCreateAnAccountPress.bind(this);

    // this.backToSignIn = this.backToSignIn.bind(this);
    this.signUpForAccount = this.signUpForAccount.bind(this);
    this.onLoginPress = this.onLoginPress.bind(this);

    this.state = {
      email: '',
      password: '',
      passwordVerification: '',
      currentScreen: showingScreen.choose,
      // isShowingSignup: false,
    };
  }

  onChangeEmail(event) {
    this.setState({ email: event });
  }

  onChangePassword(event) {
    this.setState({ password: event });
  }

  onChangePasswordVerification(event) {
    this.setState({ passwordVerification: event });
  }

  async signUpForAccount() {
    if (this.state.password == '') {
      console.error('Password is empty');
      return;
    }

    if (this.state.password !== this.state.passwordVerification) {
      console.error('Passwords do not match');
      return;
    }

    try {
      let user = await LoginService.login(
        this.state.email,
        this.state.password,
        true
      );

      this.props.onLogin(user);
    } catch (err) {
      console.error(err);
    }
  }

  async signIn() {
    if (this.state.email == '') {
      console.error('Email is empty');
      return;
    }

    if (this.state.password == '') {
      console.error('Password is empty');
      return;
    }

    // Attempt to sign in
    try {
      let user = await LoginService.login(
        this.state.email,
        this.state.password,
        false
      );
      this.props.onLogin(user);
    } catch (err) {
      console.error(err);
    }
  }

  // Naviation methods

  // Buttons from the choose screen
  onLoginPress() {
    this.setState({
      email: '',
      password: '',
      currentScreen: showingScreen.login,
    });
  }

  onCreateAnAccountPress() {
    this.setState({
      email: '',
      password: '',
      passwordVerification: '',
      currentScreen: showingScreen.signup,
    });
  }

  render() {
    const navbarStyles = {
      container: {
        flex: 1,
        marginTop: 200,
      },
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
      },
    });

    const userNameInputStyle = StyleSheet.create({
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 25,
    });

    const passwordInputStyle = StyleSheet.create({
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 25,
    });

    const createAccountButton = StyleSheet.create({
      width: 150,
      marginLeft: 120,
      marginTop: 20,
    });

    let usernameInput = (
      <Input
        key="username"
        inputStyle={userNameInputStyle}
        placeholder="Email"
        onChangeText={this.onChangeEmail}
        value={this.state.email}
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
      />
    );

    let firstPasswordEntry = (
      <Input
        key="password1"
        inputStyle={passwordInputStyle}
        placeholder="Password"
        onChangeText={this.onChangePassword}
        value={this.state.password}
        leftIcon={{ type: 'font-awesome', name: 'key' }}
        secureTextEntry={true}
      />
    );

    let content;
    if (this.state.currentScreen == showingScreen.choose) {
      let logoStyle = {
        width: 100,
        height: 100,
      };

      let logoContainerStyle = {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 100,
      };

      content = [
        <View style={logoContainerStyle} key="image">
          <Image source={require('../resources/logo.png')} style={logoStyle} />
        </View>,
        <Button
          key="0"
          buttonStyle={createAccountButton}
          onPress={this.onLoginPress}
          title="Sign In"
        />,
        <Button
          key="1"
          buttonStyle={createAccountButton}
          onPress={this.onCreateAnAccountPress}
          title="Sign Up"
          type="outline"
        />,
      ];
    } else if (this.state.currentScreen == showingScreen.login) {
      content = [
        usernameInput,
        firstPasswordEntry,
        <Button
          key="0"
          buttonStyle={createAccountButton}
          onPress={this.signIn}
          title="Login"
          disabled={
            this.state.email.length == 0 || this.state.password.length == 0
          }
        />,
        <Button
          key="1"
          buttonStyle={createAccountButton}
          onPress={this.onCreateAnAccountPress}
          title="Create an account"
          type="outline"
        />,
      ];
    } else if (this.state.currentScreen == showingScreen.signup) {
      let isValid = this.state.email.length !== 0;

      if (
        this.state.password.length === 0 ||
        this.state.password !== this.state.passwordVerification
      ) {
        isValid = false;
      }

      let textStyle = {
        alignItems: 'center',
        color: '#2267B7',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 12,
      };

      content = [
        usernameInput,
        firstPasswordEntry,
        <Input
          key="0"
          inputStyle={passwordInputStyle}
          placeholder="Password again"
          onChangeText={this.onChangePasswordVerification}
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          secureTextEntry={true}
          value={this.state.passwordVerification}
        />,
        <Button
          key="1"
          buttonStyle={createAccountButton}
          onPress={this.signUpForAccount}
          title="Create an account"
          disabled={!isValid}
        />,
        <Text
          key="alreadyhaveanaccountext"
          style={textStyle}
          onPress={this.onLoginPress}
        >
          Already have an account?
        </Text>,
      ];
    }

    return (
      <View style={styles.container}>
        <View style={navbarStyles.container}>{content}</View>
      </View>
    );
  }
}

export default Login;
