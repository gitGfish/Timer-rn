import React from 'react';
import { StyleSheet, View , Text } from 'react-native';
import TimerInstance from './Screens/TimerInstance'
import { Header } from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <TimerInstance/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  navBar:{
    height: '10%',
    width:'100%',
    padding: 45,
    backgroundColor:'#73c2fb',
    alignItems:'flex-start',
  }
});
