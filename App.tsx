import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeScreen from './src/Components/HomeScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.mainScreen}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    backgroundColor: '#e5e5e5',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
