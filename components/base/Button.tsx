import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useAppTheme } from '../../constants/theme';
import { ButtonProps } from '../../types/components';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  children,
  style,
  onPress,
  ...props
}) => {
  const theme = useAppTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.white,
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.white,
        };
      case 'outline':
        return {
          backgroundColor: theme.colors.transparent,
          textColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          borderWidth: 1,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
          fontSize: theme.typography.sizes.sm,
        };
      case 'lg':
        return {
          paddingVertical: theme.spacing.base,
          paddingHorizontal: theme.spacing.xl,
          fontSize: theme.typography.sizes.lg,
        };
      default:
        return {
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.base,
          fontSize: theme.typography.sizes.base,
        };
    }
  };

  const variantStyle = getVariantStyles();
  const sizeStyle = getSizeStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
          borderWidth: variantStyle.borderWidth,
          ...theme.shadows.base[theme.isDark ? 'dark' : 'light'],
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          borderRadius: theme.borderRadius.base,
        },
        fullWidth && styles.fullWidth,
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: variantStyle.textColor,
          fontSize: sizeStyle.fontSize,
          fontFamily: theme.typography.fonts.medium,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});