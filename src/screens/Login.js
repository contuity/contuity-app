import React, { Component } from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import ContuityGradient from '../components/ContuityGradient';
import ContuityInput from '../components/ContuityInput';
import LoginService from '../database/services/LoginService';

import logo from '../../assets/img/logo.png';
import {
  primaryButton,
  outlineButton,
  buttonText,
  h3,
  link,
  homescreen,
} from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style.js';

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

      // Keep track of whether there is currently an error being shown on the page.
      // If creating an account, this means that the account already exists.
      // If logging in, this being true would mean that your login isn't valid.
      error: false,
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
      this.setState({
        error: true,
      });
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
      let email = this.state.email;
      let password = this.state.password;

      try {
        let user = await LoginService.login(email, password, false);
        this.props.onLogin(user);
      } catch (e) {
        this.setState({
          error: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

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
      <ContuityInput
        key="username"
        placeholder="Email"
        onChangeText={this.onChangeEmail}
        value={this.state.email}
      />
    );

    let firstPasswordEntry = (
      <ContuityInput
        key="password1"
        placeholder="Password"
        onChangeText={this.onChangePassword}
        value={this.state.password}
        secureTextEntry={true}
      />
    );

    let errorMsg = null;

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
          buttonStyle={styles.outlineButton}
          onPress={this.onCreateAnAccountPress}
          title="Sign Up"
          titleStyle={styles.buttonTextSecondary}
        />,
      ];
    } else if (this.state.currentScreen == showingScreen.login) {
      if (this.state.error) {
        let errorStyle = {
          color: 'red',
          fontSize: 15,
        };
        errorMsg = (
          <Text key="error" style={errorStyle}>
            {' '}
            Invalid login{' '}
          </Text>
        );
      }

      content = [
        <Image source={logo} style={styles.logoStyle} key="image" />,
        <Text key="title" style={styles.contuity}>
          contuity
        </Text>,
        usernameInput,
        firstPasswordEntry,
        errorMsg,
        <Button
          key="0"
          buttonStyle={styles.primaryButton}
          onPress={this.signIn}
          title="Login"
          titleStyle={buttonText}
          disabled={
            this.state.email.length == 0 || this.state.password.length == 0
          }
          disabledStyle={styles.disabledPrimaryButton}
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
          buttonStyle={styles.outlineButton}
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

      if (this.state.error) {
        let errorStyle = {
          color: styleConstants.errorRed,
          fontSize: 15,
        };
        errorMsg = (
          <Text key="error" style={errorStyle}>
            {' '}
            Email address is taken. Try another one.{' '}
          </Text>
        );
      }

      content = [
        <Image source={logo} style={styles.logoStyle} key="image" />,
        <Text key="title" style={styles.contuity}>
          contuity
        </Text>,
        usernameInput,
        firstPasswordEntry,
        <ContuityInput
          key="0"
          placeholder="Password again"
          onChangeText={this.onChangePasswordVerification}
          secureTextEntry={true}
          value={this.state.passwordVerification}
        />,
        errorMsg,
        <Button
          key="1"
          buttonStyle={styles.primaryButton}
          onPress={this.signUpForAccount}
          title="Sign Up"
          titleStyle={buttonText}
          disabled={!isValid}
          disabledStyle={styles.disabledPrimaryButton}
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
      <ContuityGradient style={styles.container}>{content}</ContuityGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    ...primaryButton,
    width: 190,
    marginTop: 20,
  },
  outlineButton: {
    ...outlineButton,
    width: 190,
    marginVertical: 20,
  },
  buttonTextSecondary: {
    ...link,
    ...buttonText,
  },
  link: {
    ...h3,
    ...link,
    marginVertical: 20,
  },
  logoStyle: {
    width: 72,
    height: 84,
  },
  contuity: {
    ...link,
    ...homescreen,
    paddingTop: 10,
    fontSize: 36,
    paddingBottom: 20,
  },
  disabledPrimaryButton: {
    ...primaryButton,
    backgroundColor: styleConstants.primaryDisabled,
  },
});

export default Login;
