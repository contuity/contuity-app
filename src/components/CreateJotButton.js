import React from 'react';
import { Button } from 'react-native-elements';
import { shadow } from '../../assets/style/common.style';
import styleConstants from '../../assets/style/theme.style';

const CreateJotButton = props => {
  const createJotBtn = {
    ...shadow,
    width: 70,
    height: 70,
    backgroundColor: styleConstants.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 20,
    borderRadius: 70,
  };

  return (
    <Button
      style={createJotBtn}
      icon={{
        name: 'pencil',
        type: 'material-community',
        size: 36,
        color: 'white',
      }}
      type="clear"
      onPress={props.onPress}
    />
  );
};

export default CreateJotButton;
