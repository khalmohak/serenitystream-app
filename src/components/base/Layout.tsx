import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ViewStyle,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAppTheme } from "../../constants/theme";

interface LayoutProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scroll?: boolean;
  safe?: boolean;
  paddingHorizontal?: boolean;
  backgroundColor?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  style,
  scroll = false,
  safe = true,
  paddingHorizontal = true,
  backgroundColor,
  refreshing = false,
  onRefresh,
}) => {
  const theme = useAppTheme();

  const baseStyles = {
    flex: 1,
    backgroundColor: backgroundColor || theme.colors.background,
    paddingHorizontal: paddingHorizontal ? theme.spacing.base : 0,
  };

  const content = (
    <>
      {scroll ? (
        <ScrollView
          style={[baseStyles, style]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            onRefresh ? (
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors.primary}
              />
            ) : undefined
          }
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[baseStyles, style]}>{children}</View>
      )}
    </>
  );

  if (safe) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={[
            styles.safe,
            { backgroundColor: backgroundColor || theme.colors.background },
          ]}
        >
          <StatusBar
            barStyle={theme.isDark ? "light-content" : "dark-content"}
            backgroundColor={backgroundColor || theme.colors.background}
          />
          {content}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  return content;
};

interface SectionProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Section: React.FC<SectionProps> = ({ children, style }) => {
  const theme = useAppTheme();

  return (
    <View style={[{ marginBottom: theme.spacing.xl }, style]}>{children}</View>
  );
};

interface RowProps extends SectionProps {
  spacing?: number;
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  align?: "flex-start" | "flex-end" | "center" | "stretch";
  wrap?: boolean;
}

export const Row: React.FC<RowProps> = ({
  children,
  style,
  spacing,
  justify = "flex-start",
  align = "center",
  wrap = false,
}) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: justify,
          alignItems: align,
          gap: spacing || theme.spacing.base,
          flexWrap: wrap ? "wrap" : "nowrap",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface ContainerProps extends SectionProps {
  centered?: boolean;
  padded?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  centered = false,
  padded = false,
}) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        {
          maxWidth: theme.layout.maxWidth,
          alignSelf: "center",
          width: "100%",
          padding: padded ? theme.spacing.base : 0,
          ...(centered && {
            justifyContent: "center",
            alignItems: "center",
          }),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface FullHeightProps extends LayoutProps {
  definedUnderLayout?: boolean;
}

export const FullHeight: React.FC<FullHeightProps> = ({
  children,
  style,
  backgroundColor,
  paddingHorizontal = true,
  definedUnderLayout = true,
}) => {
  const theme = useAppTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: backgroundColor || theme.colors.background,
          justifyContent: "center",
          alignItems: "center",
          ...(!definedUnderLayout && {
            paddingHorizontal: paddingHorizontal ? theme.spacing.base : 0,
          }),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
