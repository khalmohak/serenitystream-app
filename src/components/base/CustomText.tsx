import { useAppTheme } from '@/src/constants/theme';
import React from 'react';
import { Text as RNText, TextStyle, TextProps as RNTextProps } from 'react-native';

type TextVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type TextWeight = 'regular' | 'medium' | 'bold';

const fontConfig = {
  regular: {
    fontFamily: 'BrandonTextRegular',
  },
  medium: {
    fontFamily: 'BrandonTextMedium',
  },
  bold: {
    fontFamily: 'BrandonTextBold',
  },
};

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Text: React.FC<TextProps> = ({
  variant = 'base',
  weight = 'regular',
  color,
  align,
  style,
  children,
  ...props
}) => {
  const theme = useAppTheme();

  const textStyle: TextStyle = {
    ...fontConfig[weight],
    fontSize: theme.typography.sizes[variant],
    lineHeight: theme.typography.sizes[variant] * theme.typography.lineHeights.normal,
    color: color || theme.colors.text,
    textAlign: align,
  };

  return (
    <RNText
      style={[textStyle, style]}
      {...props}
    >
      {children}
    </RNText>
  );
};
