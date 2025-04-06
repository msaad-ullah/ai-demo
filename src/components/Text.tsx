import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import theme, {FontFamily} from '../styles/theme/theme';

// defining the types for quick common stylings through props and suggestions
export interface ICustomTextProps extends TextProps {
  size?: keyof typeof theme.fontSizes;
  color?: keyof typeof theme.colors;
  textAlign?: 'center' | 'auto' | 'left' | 'right' | 'justify';
  variant?: keyof typeof FontFamily;
}

export default function Text({
  size,
  color,
  textAlign,
  children,
  style,
  variant,
  ...rest
}: ICustomTextProps) {
  return (
    <RNText
      {...rest}
      style={[
        {
          color: color ? theme.colors[color] : theme.colors.white,
          textAlign,
          fontSize: size ? theme.fontSizes[size] : theme.fontSizes.body,
          fontFamily: variant ? FontFamily[variant] : FontFamily.regular,
          // letterSpacing: 0.75,
        },
        style,
      ]}>
      {children}
    </RNText>
  );
}
