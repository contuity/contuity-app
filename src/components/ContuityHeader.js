import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import NavigationBar from 'react-native-navbar';
import {
  h2,
  h3,
  buttonText,
  menuButton,
} from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

class ContuityHeader extends Component {
  render() {
    let title = this.props.title;
    let leftButtonConfig = this.props.leftButtonConfig;
    let rightButtonConfig = this.props.rightButtonConfig;

    if (title) {
      title = (
        <Text
          style={
            this.props.titleType === 'INSTRUCTION'
              ? styles.headerInstruction
              : styles.headerTitle
          }
        >
          {this.props.title}
        </Text>
      );
    }

    if (leftButtonConfig) {
      if (this.props.leftButtonType === 'BACK') {
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
      } else {
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
              titleStyle={styles.whiteBtnText}
              buttonStyle={menuButton}
              disabledStyle={{
                backgroundColor: styleConstants.primaryDisabled,
              }}
              disabledTitleStyle={styles.whiteBtnText}
              {...rightButtonConfig}
            />
          );
          break;
        case 'DELETE':
          rightButtonConfig = (
            <Button
              titleStyle={styles.whiteBtnText}
              buttonStyle={styles.deleteBtn}
              disabledStyle={{
                backgroundColor: styleConstants.secondaryDisabled,
              }}
              disabledTitleStyle={styles.whiteBtnText}
              {...rightButtonConfig}
            />
          );
          break;
        case 'TRASH':
          rightButtonConfig = (
            <Button
              titleStyle={styles.headerButtonText}
              icon={{
                name: 'delete',
                type: 'material',
                size: 30,
                color: styleConstants.primaryColor,
              }}
              {...rightButtonConfig}
              title=""
              type="clear"
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
    fontSize: styleConstants.fontSizeMedium,
    bottom: 7,
  },
  headerInstruction: {
    ...h3,
    bottom: 7,
  },
  headerButtonText: {
    ...buttonText,
    color: styleConstants.primaryColor,
  },
  whiteBtnText: {
    ...buttonText,
    color: 'white',
  },
  deleteBtn: {
    ...menuButton,
    backgroundColor: styleConstants.secondaryColor,
  },
  doneBtnDisabled: {
    backgroundColor: styleConstants.primaryDisabled,
  },
});
