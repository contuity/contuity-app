import React from 'react';
import { Avatar } from 'react-native-elements';
import PersonService from '../database/services/PersonService';
import styleConstants from '../../assets/style/theme.style';

const InitialsAvatar = props => {
  let photo = {
    backgroundColor: styleConstants.lightBlue,
  };

  let photoTitle = {
    color: styleConstants.primaryColor,
    fontFamily: styleConstants.assistantNorm,
  };

  return (
    <Avatar
      rounded
      title={PersonService.getInitials(props.firstName, props.lastName)}
      titleStyle={photoTitle}
      avatarStyle={photo}
      containerStyle={props.containerStyle}
      size={props.size}
    />
  );
};

export default InitialsAvatar;
