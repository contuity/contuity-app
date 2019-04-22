import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import { h2, h3 } from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

class ContuityHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let title = this.props.title;
    let leftButtonConfig = this.props.leftButtonConfig;
    let rightButtonConfig = this.props.rightButtonConfig;

    if (title) {
      title = <Text style={styles.headerTitle}>{this.props.title}</Text>;
    }

    if (leftButtonConfig) {
      switch (this.props.leftButtonType) {
        case 'BACK':
          leftButtonConfig = (
            <Button
              titleStyle={styles.headerButtonText}
              icon={{
                name: 'chevron-left',
                type: 'material',
                size: 30,
                color: styleConstants.primaryColor,
              }}
              {...leftButtonConfig}
              title=""
              type="clear"
            />
          );
          break;
        default:
          leftButtonConfig = (
            <Button
              titleStyle={styles.headerButtonText}
              {...leftButtonConfig}
              type="clear"
            />
          );
      }
    }

    if (rightButtonConfig) {
      switch (this.props.rightButtonType) {
        case 'ADD':
          rightButtonConfig = (
            <Button
              titleStyle={styles.headerButtonText}
              icon={{
                name: 'plus',
                type: 'material-community',
                size: 30,
                color: styleConstants.primaryColor,
              }}
              {...rightButtonConfig}
              title=""
              type="clear"
            />
          );
          break;
        case 'DONE':
          rightButtonConfig = (
            <Button
              titleStyle={styles.doneBtnText}
              buttonStyle={styles.doneBtn}
              disabledStyle={styles.doneBtnDisabled}
              disabledTitleStyle={styles.doneBtnText}
              {...rightButtonConfig}
            />
          );
          break;
        default:
          rightButtonConfig = (
            <Button
              titleStyle={styles.headerButtonText}
              {...rightButtonConfig}
              type="clear"
            />
          );
      }
    }

    return (
      <NavigationBar
        title={title}
        leftButton={leftButtonConfig}
        rightButton={rightButtonConfig}
        tintColor={this.props.tintColor ? this.props.tintColor : 'transparent'}
        style={styles.navbar}
      />
    );
  }
}

export default ContuityHeader;

const styles = StyleSheet.create({
  navbar: {
    marginBottom: 10,
  },
  headerTitle: {
    ...h2,
    color: styleConstants.primaryColor,
  },
  headerButtonText: {
    ...h3,
    fontFamily: styleConstants.assistantSB,
    color: styleConstants.primaryColor,
  },
  doneBtnText: {
    ...h3,
    fontFamily: styleConstants.assistantSB,
    color: 'white',
  },
  doneBtn: {
    backgroundColor: styleConstants.primaryColor,
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 18,
    marginRight: 10,
  },
  doneBtnDisabled: {
    backgroundColor: styleConstants.primaryDisabled,
  },
});
