import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useAppTheme } from "./theme";

export const ToastMessage = () => {
  const { colors, typography, borderRadius } = useAppTheme();

  const styles = StyleSheet.create({
    toastContainer: {
      borderRadius: borderRadius.base,
      padding: 10,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
    },
    text: {
      color: colors.text,
      fontSize: typography.sizes.base,
      fontFamily: typography.fonts.medium,
    },
    title: {
      color: colors.primary,
      fontSize: typography.sizes.lg,
      fontFamily: typography.fonts.bold,
    },
  });

  const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={[styles.toastContainer, { borderColor: colors.success }]}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={[styles.title, { color: colors.success }]}
        text2Style={styles.text}
        text1={text1}
        text2={text2}
      />
    ),
    error: ({ text1, text2, ...rest }) => (
      <ErrorToast
        {...rest}
        style={[styles.toastContainer, { borderColor: colors.danger }]}
        text1Style={[styles.title, { color: colors.danger }]}
        text2Style={styles.text}
        text1={text1}
        text2={text2}
      />
    ),
    custom: ({ text1, text2, ...rest }) => (
      <View style={styles.toastContainer}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.text}>{text2}</Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export const showToast = ({ type = "success", title, message }) => {
  Toast.show({
    type: type || "custom", // 'success', 'error', or 'custom'
    text1: title,
    text2: message,
    position: "top",
    visibilityTime: 4000,
    autoHide: true,
  });
};
