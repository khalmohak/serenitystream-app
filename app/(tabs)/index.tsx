import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/base/Button';
import { router } from 'expo-router';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Button 
        variant="outline" 
        size="md" 
        onPress={() => {
          router.push("/home-screen")
        }}
      >
        Home screen
      </Button>
      <Button 
        variant="outline" 
        size="md" 
        onPress={() => {
          router.push("/login-screen")
        }}
      >
        Login screen
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
