import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Surface, Shape} from '@react-native-community/art';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default function CircleProgressBar(props) {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
      size={60}
      width={10}
      fill={props.percent}
      tintColor="#0bebff"
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#3d5875" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
