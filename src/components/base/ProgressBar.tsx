import { useAppTheme } from "@/src/constants/theme";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { View, Animated, TouchableOpacity, StyleSheet } from "react-native";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  withBackButton: boolean;
  onBackPress?: () => void;
  height?: number;
  width?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBackPress,
  height = 4,
  width = "100%",
  withBackButton = false,
}) => {
  const theme = useAppTheme();

  const animatedWidth = useRef(new Animated.Value(0)).current;

  const progress = Math.min(currentStep / totalSteps, 1) * 100;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedWidth]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      {withBackButton && (
        <TouchableOpacity onPress={onBackPress} disabled={!onBackPress}>
          {onBackPress && (
            <Feather name="arrow-left" size={24} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      )}
      <View
        style={[
          //@ts-ignore
          {
            height,
            borderRadius: theme.borderRadius.sm,
            width,
          },
          { backgroundColor: theme.colors.white },
        ]}
      >
        <Animated.View
          style={{
            height: "100%",
            backgroundColor: theme.colors.primary,
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            borderRadius: theme.borderRadius.sm,
          }}
        />
      </View>
      {withBackButton && <View />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  backButton: {
    marginRight: 10,
  },
  progressBarContainer: {},
});

export default ProgressBar;
