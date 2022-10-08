import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ScrollTracker from './components/ScrollTracker';

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollTracker />
      </View>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 80,
    backgroundColor: '#8885DE',
  },
});
