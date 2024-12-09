import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  TextInputProps,
  ViewStyle,
  TextStyle,
  Text,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';
import { useAppTheme } from '../../constants/theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  onPressRightIcon?: () => void;
  onPressLeftIcon?: () => void;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  helper,
  leftIcon,
  rightIcon,
  fullWidth = true,
  containerStyle,
  inputStyle,
  labelStyle,
  onPressRightIcon,
  onPressLeftIcon,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const theme = useAppTheme();
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <View style={[
      styles.container,
      fullWidth && styles.fullWidth,
      containerStyle
    ]}>
      {label && (
        <Text
          style={[
            {
              color: error 
                ? theme.colors.danger 
                : isFocused 
                  ? theme.colors.primary 
                  : theme.colors.textMedium,
              marginBottom: theme.spacing.xs,
              fontSize: theme.typography.sizes.sm,
              fontFamily: theme.typography.fonts.medium,
            },
            labelStyle
          ]}
        >
          {label}
        </Text>
      )}

      <View style={[
        styles.inputContainer,
        {
          backgroundColor: theme.colors.surface,
          borderColor: error 
            ? theme.colors.danger 
            : isFocused 
              ? theme.colors.primary 
              : theme.colors.border,
          borderWidth: 1,
          borderRadius: theme.borderRadius.base,
        },
      ]}>
        {leftIcon && (
          <Pressable
            onPress={onPressLeftIcon}
            style={[
              styles.icon,
              { marginRight: theme.spacing.xs }
            ]}
          >
            {leftIcon}
          </Pressable>
        )}

        <TextInput
          ref={ref}
          {...props}
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontSize: theme.typography.sizes.base,
              fontFamily: theme.typography.fonts.regular,
              paddingVertical: theme.spacing.sm,
              paddingHorizontal: theme.spacing.base,
            },
            inputStyle
          ]}
          placeholderTextColor={theme.colors.textLight}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {rightIcon && (
          <Pressable
            onPress={onPressRightIcon}
            style={[
              styles.icon,
              { marginLeft: theme.spacing.xs }
            ]}
          >
            {rightIcon}
          </Pressable>
        )}
      </View>

      {(error || helper) && (
        <Text
          style={{
            marginTop: theme.spacing.xs,
            fontSize: theme.typography.sizes.sm,
            color: error ? theme.colors.danger : theme.colors.textLight,
          }}
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  fullWidth: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  icon: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});