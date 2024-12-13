import { TextStyle, ViewStyle } from 'react-native';

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  background: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textMedium: string;
  textLight: string;
  border: string;
  borderFocus: string;
  online: string;
  offline: string;
  white: string;
  black: string;
  transparent: string;
}

export interface Typography {
  fonts: {
    regular: string;
    medium: string;
    bold: string;
  };
  sizes: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  lineHeights: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  letterSpacing: {
    tight: number;
    normal: number;
    wide: number;
  };
}

export interface Shadow {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeColors {
  light: ColorScheme;
  dark: ColorScheme;
}

export interface ThemeShadows {
  sm: {
    light: Shadow;
    dark: Shadow;
  };
  base: {
    light: Shadow;
    dark: Shadow;
  };
  lg: {
    light: Shadow;
    dark: Shadow;
  };
}

export interface Theme {
  colors: ThemeColors;
  typography: Typography;
  spacing: {
    '2xs': number;
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  borderRadius: {
    none: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: ThemeShadows;
  layout: {
    screenWidth: number;
    screenHeight: number;
    maxWidth: number;
    contentPadding: number;
  };
  animation: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
    };
    easing: {
      easeIn: string;
      easeOut: string;
      easeInOut: string;
    };
  };
  zIndex: {
    base: number;
    drawer: number;
    modal: number;
    snackbar: number;
    tooltip: number;
  };
}

export interface ThemeContextValue extends Omit<Theme, 'colors'> {
  colors: ColorScheme;
  isDark: boolean;
}