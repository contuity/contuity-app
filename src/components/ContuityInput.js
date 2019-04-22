import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { h3, inputField } from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

const ContuityInput = props => {
  return (
    <Input
      {...props}
      containerStyle={styles.container}
      inputStyle={inputField}
      inputContainerStyle={styles.inputContainer}
      labelStyle={styles.inputLabel}
    />
  );
};

export default ContuityInput;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 12,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputLabel: {
    ...h3,
    color: styleConstants.primaryColor,
    fontFamily: styleConstants.assistantSB,
  },
});
