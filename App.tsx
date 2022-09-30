import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Card from './components/Card';

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Card />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8885DE',
  },
});
