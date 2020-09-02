import React,{ useState,useEffect } from 'react';
import { StyleSheet, View , Text ,Button} from 'react-native';
import TimerList from '../components/TimerList';
import ButtonPanel from '../components/ButtonPanel';
import {Timer} from '../components/Timer'




export default function TimerInstance() {

    let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

    const {
        startPause,
        setStartPause,
        sec,
        milisec,
        minutes,
        hour,
        ResetTimer,
        StopTimer,
        StartTimer,
        getSec
    
      } = Timer()
      const handleToggle = ( ) => {
        if(startPause){
          StopTimer();
        }else{
          StartTimer();
        }
        setStartPause(!startPause);
      }
        

    
  return (
    <View style={styles.container}>
        <View style={styles.list_container}>
            <TimerList  sec={sec} startPause={startPause}/>
        </View>
        <ButtonPanel  handleToggle={handleToggle} minutes={padToTwo(minutes)} sec={padToTwo(sec)}/>
        
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
