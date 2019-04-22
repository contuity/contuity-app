import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { h2, h3 } from '../../assets/style/common.style';
import themeStyles from '../../assets/style/theme.style';

class ContuityHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let titleConfig, leftButtonConfig, rightButtonConfig;

    if (this.props.titleConfig) {
      titleConfig = { ...this.props.titleConfig, style: styles.headerTitle };
    }

    if (this.props.leftButtonConfig) {
      leftButtonConfig = {
        ...this.props.leftButtonConfig,
        textStyle: styles.headerButtonText,
        tintColor: themeStyles.primaryColor,
      };
    }

    if (this.props.rightButtonConfig) {
      rightButtonConfig = {
        ...this.props.rightButtonConfig,
        textStyle: styles.headerButtonText,
        tintColor: themeStyles.primaryColor,
      };
    }

    if (this.props.leftButtonType == 'BACK') {
      leftButtonConfig = {
        ...leftButtonConfig,
        icon: 'chevron-left',
        iconType: 'material',
        iconSize: 30,
      };
    }

    if (this.props.rightButtonType == 'ADD') {
      rightButtonConfig = {
        ...rightButtonConfig,
        icon: 'plus',
        iconType: 'material-community',
        iconSize: 30,
      };
    }

    return (
      <NavigationBar
        title={titleConfig}
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        tintColor="transparent"
      />
    );
  }
}

export default ContuityHeader;

const styles = StyleSheet.create({
  headerTitle: {
    ...h2,
  },
  headerButtonText: {
    ...h3,
    color: themeStyles.primaryColor,
    fontFamily: themeStyles.assistantSB,
  },
});
