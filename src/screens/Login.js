import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import JotService from '../database/services/JotService';
import NavigationBar from 'react-native-navbar';
import { AppRegistry, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginService from '../database/services/LoginService';
import logo from '../resources/logo.png';

import {
  primaryButton,
  secondaryButton,
  buttonText,
  h1,
  h3,
  link,
  inputTextColor,
} from '../../assets/style/common.style';
import LinearGradient from 'react-native-linear-gradient';
import themeStyle from '../../assets/style/theme.style';

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

    this.signUpForAccount = this.signUpForAccount.bind(this);
    this.onLoginPress = this.onLoginPress.bind(this);

    this.state = {
      email: '',
      password: '',
      passwordVerification: '',
      currentScreen: showingScreen.choose,
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
    let usernameInput = (
      <Input
        key="username"
        placeholder="Email"
        inputStyle={styles.inputStyle}
        onChangeText={this.onChangeEmail}
        value={this.state.email}
        inputContainerStyle={styles.inputContainerStyle}
      />
    );

    let firstPasswordEntry = (
      <Input
        key="password1"
        inputStyle={styles.inputStyle}
        placeholder="Password"
        onChangeText={this.onChangePassword}
        value={this.state.password}
        secureTextEntry={true}
        inputContainerStyle={styles.inputContainerStyle}
      />
    );

    let content;
    if (this.state.currentScreen == showingScreen.choose) {
      content = [
        <Image source={logo} style={styles.logoStyle} key="image" />,
        <Text key="title" style={styles.contuity}>
          contuity
        </Text>,
        <Button
          key="0"
          buttonStyle={styles.primaryButton}
          onPress={this.onLoginPress}
          title="Sign In"
          titleStyle={buttonText}
        />,
        <Button
          key="1"
          buttonStyle={styles.secondaryButton}
          onPress={this.onCreateAnAccountPress}
          title="Sign Up"
          titleStyle={buttonText}
        />,
      ];
    } else if (this.state.currentScreen == showingScreen.login) {
      content = [
        <Image source={logo} style={styles.logoStyle} key="image" />,
        <Text key="title" style={styles.contuity}>
          contuity
        </Text>,
        usernameInput,
        firstPasswordEntry,
        <Button
          key="0"
          buttonStyle={styles.primaryButton}
          onPress={this.signIn}
          title="Login"
          titleStyle={buttonText}
          disabled={
            this.state.email.length == 0 || this.state.password.length == 0
          }
        />,
        //Forgot password needs to be set-up
        <Text
          key="forgotpassword"
          style={styles.link}
          onPress={this.onLoginPress}
        >
          Forgot Password?
        </Text>,
        <Button
          key="1"
          buttonStyle={styles.secondaryButton}
          onPress={this.onCreateAnAccountPress}
          title="Sign Up"
          titleStyle={styles.buttonTextSecondary}
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

      content = [
        <Image source={logo} style={styles.logoStyle} key="image" />,
        <Text key="title" style={styles.contuity}>
          contuity
        </Text>,
        usernameInput,
        firstPasswordEntry,
        <Input
          key="0"
          inputStyle={styles.inputStyle}
          placeholder="Password again"
          onChangeText={this.onChangePasswordVerification}
          secureTextEntry={true}
          value={this.state.passwordVerification}
          inputContainerStyle={styles.inputContainerStyle}
        />,
        <Button
          key="1"
          buttonStyle={styles.primaryButton}
          onPress={this.signUpForAccount}
          title="Sign Up"
          titleStyle={buttonText}
          disabled={!isValid}
        />,
        <Text
          key="alreadyhaveanaccountext"
          style={styles.link}
          onPress={this.onLoginPress}
        >
          Already have an account?
        </Text>,
      ];
    }

    return (
      <LinearGradient
        colors={['#F9DCD8', '#A7BFD0', '#6576A8']}
        style={styles.container}
      >
        {content}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7BFD0',
  },

  inputContainerStyle: {
    borderBottomWidth: 0,
    width: '80%',
    marginLeft: '10%',
  },

  inputStyle: {
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    borderRadius: 24,
    ...h3,
    ...inputTextColor,
    paddingLeft: 20,
  },

  primaryButton: {
    ...primaryButton,
    width: 190,
    marginTop: 20,
  },

  secondaryButton: {
    ...secondaryButton,
    width: 190,
    marginTop: 20,
    marginBottom: 20,
  },

  buttonTextSecondary: {
    ...link,
    ...buttonText,
  },

  link: {
    ...h3,
    ...link,
    marginTop: 20,
    marginBottom: 20,
  },

  logoStyle: {
    width: 72,
    height: 84,
  },

  contuity: {
    ...link,
    ...h1,
    paddingTop: 10,
    fontSize: 36,
    paddingBottom: 20,
  },
});

export default Login;
