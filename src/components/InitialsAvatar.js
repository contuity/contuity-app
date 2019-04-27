import React from 'react';
import { Avatar } from 'react-native-elements';
import styleConstants from '../../assets/style/theme.style';

const InitialsAvatar = props => {
  let photo = {
    backgroundColor: styleConstants.lightBlue,
  };

  let photoTitle = {
    color: styleConstants.primaryColor,
    fontFamily: styleConstants.assistantNorm,
  };

  let initials = '';
  if (props.firstName) {
    initials += props.firstName[0];
  }
  if (props.lastName) {
    initials += props.lastName[0];
  }

  return (
    <Avatar
      rounded
      title={initials}
      titleStyle={photoTitle}
      avatarStyle={photo}
      containerStyle={props.containerStyle}
      size={props.size}
    />
  );
};

export default InitialsAvatar;
