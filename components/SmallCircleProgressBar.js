import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,PixelRatio } from 'react-native';
import {Surface, Shape} from '@react-native-community/art';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Entypo } from '@expo/vector-icons'; 

import {  Badge, withBadge } from 'react-native-elements'

let FONT_BACK_LABEL   = 10;
let BELL_POSITION   = -15;
if (PixelRatio.get() <= 2) {
  FONT_BACK_LABEL = 8;
  BELL_POSITION   = 20;
}
export default function SmallCircleProgressBar(props) {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
      size={60}
      width={6}
      fill={props.percent}
      tintColor="#1778F2"
      // onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#f2f2f2" >
        {
          (fill) => (
            <Text style={{fontSize:FONT_BACK_LABEL,fontWeight: 'bold',}}>
              {props.Time}
            
            </Text>
          )
        }
      </AnimatedCircularProgress>
      <Entypo style={styles.bell} name="bell" size={16} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },bell:{
    position:"absolute",
    right:BELL_POSITION,
    bottom:0
  }
});
