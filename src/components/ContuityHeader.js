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
      title = <Text style={styles.headerTitle}>{title}</Text>;
    }

    if (leftButtonConfig) {
      switch (this.props.leftButtonType) {
        case 'BACK':
          leftButtonConfig = (
            <Button
              titleStyle={styles.headerButtonText}
              icon={{ icon: 'chevron-left', type: 'material', size: 30 }}
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
              icon={{ name: 'plus', type: 'material-community', size: 30 }}
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
      />
    );
  }
}

export default ContuityHeader;

const styles = StyleSheet.create({
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
    ...h2,
    color: 'white',
  },
  doneBtn: {
    backgroundColor: styleConstants.primaryColor,
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
});
