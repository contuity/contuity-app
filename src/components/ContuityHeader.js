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
    let leftButtonConfig = {
      ...this.props.leftButtonConfig,
      textStyle: styles.headerButtonText,
      tintColor: themeStyles.primaryColor,
    };

    if (this.props.leftButtonType == 'BACK') {
      leftButtonConfig = {
        ...leftButtonConfig,
        icon: 'chevron-left',
        iconType: 'material',
        iconSize: 35,
      };
    }

    return (
      <NavigationBar
        title={{ ...this.props.titleConfig, style: styles.headerTitle }}
        leftButton={leftButtonConfig}
        rightButton={{
          ...this.props.rightButtonConfig,
          textStyle: styles.headerButtonText,
          tintColor: themeStyles.primaryColor,
        }}
      />
    );
  }
}

export default ContuityHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    ...h2,
  },
  headerButtonText: {
    ...h3,
    color: themeStyles.primaryColor,
    fontFamily: themeStyles.assistantSB,
  },
});
