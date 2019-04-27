import theme from './theme.style';

export const homescreen = {
  fontSize: theme.fontSizeLarge,
  fontFamily: theme.varelaRound,
  fontWeight: theme.fontWeightNorm,
};

export const h1 = {
  fontSize: theme.fontSizeLarge,
  fontFamily: theme.assistantNorm,
  fontWeight: theme.fontWeightNorm,
};

export const h2 = {
  fontFamily: theme.assistantSB,
  fontWeight: theme.fontWeightSB,
  fontSize: theme.fontSizeSmall,
};

export const h3 = {
  fontFamily: theme.assistantNorm,
  fontWeight: theme.fontWeightNorm,
  fontSize: theme.fontSizeSmall,
};

export const jotText = {
  fontFamily: theme.assistantLight,
  fontWeight: theme.fontWeightLight,
  fontSize: theme.fontSizeMedium,
};

export const primaryButton = {
  backgroundColor: theme.primaryColor,
  borderRadius: theme.buttonBorderRadius,
  paddingVertical: theme.buttonPaddingVertical,
  paddingHorizontal: theme.buttonPaddingHorizontal,
};

export const outlineButton = {
  backgroundColor: 'transparent',
  borderRadius: theme.buttonBorderRadius + 2,
  paddingVertical: theme.buttonPaddingVertical - 2,
  paddingHorizontal: theme.buttonPaddingHorizontal - 2,
  borderWidth: 2,
  borderColor: theme.primaryColor,
};

export const secondaryButton = {
  backgroundColor: theme.secondaryColor,
  borderRadius: theme.buttonBorderRadius,
  paddingVertical: theme.buttonPaddingVertical,
  paddingHorizontal: theme.buttonPaddingHorizontal,
};

export const menuButton = {
  backgroundColor: theme.primaryColor,
  borderRadius: 18,
  marginRight: 10,
  paddingVertical: 5,
  paddingHorizontal: 18,
};

export const buttonText = {
  fontFamily: theme.assistantBold,
  fontWeight: theme.fontWeightBold,
  fontSize: theme.fontSizeSmall,
};

export const smallButtonText = {
  fontFamily: theme.assistantBold,
  fontWeight: theme.fontWeightBold,
  fontSize: theme.fontSizeXSmall,
  color: 'white',
  lineHeight: theme.fontSizeXSmall,
};

export const smallButton = {
  backgroundColor: theme.primaryColor,
  borderRadius: theme.buttonBorderRadius,
  paddingVertical: 4,
  paddingHorizontal: 4,
};

export const link = {
  color: theme.primaryColor,
  fontFamily: theme.assistantBold,
  fontWeight: theme.fontWeightBold,
};

export const inputField = {
  marginTop: 16,
  flex: 1,
  backgroundColor: 'white',
  height: 36,
  borderRadius: 5,
  ...h3,
  paddingLeft: 16,
};

export const shadow = {
  shadowOffset: { width: 0, height: 2 },
  shadowColor: 'black',
  shadowOpacity: 0.25,
};

export const photo = {
  backgroundColor: theme.lightBlue,
};

export const photoTitle = {
  color: theme.primaryColor,
  fontFamily: theme.assistantNorm,
};