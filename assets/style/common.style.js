import theme from './theme.style';

export const h1 = {
  fontSize: theme.fontSizeLarge,
  fontFamily: theme.varelaRound,
  fontWeight: theme.fontWeightNorm,
};

export const h2 = {
  fontFamily: theme.assistantSB,
  fontWeight: theme.fontWeightSB,
  fontSize: theme.fontSizeMedium,
};

export const h3 = {
  fontFamily: theme.assistantNorm,
  fontWeight: theme.fontWeightNorm,
  fontSize: theme.fontSizeSmall,
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

export const buttonText = {
  fontFamily: theme.assistantBold,
  fontWeight: theme.fontWeightBold,
  fontSize: theme.fontSizeSmall,
};

export const link = {
  color: theme.primaryColor,
  fontFamily: theme.assistantSB,
  fontWeight: theme.fontWeightSB,
};

