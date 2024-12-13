import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAppTheme } from '../../constants/theme';

interface LoadingScreenProps {
  visible?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ visible = true}) => {
  const theme = useAppTheme();

  if (!visible) return null;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
});

export default LoadingScreen;
