import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styleConstants from '../../assets/style/theme.style';

const ContuityGradient = props => {
  return (
    <LinearGradient
      colors={[
        styleConstants.topGradient,
        styleConstants.middleGradient,
        styleConstants.lastGradient,
      ]}
      style={{ ...props.style, flex: 1 }}
    >
      {props.children}
    </LinearGradient>
  );
};

export default ContuityGradient;
