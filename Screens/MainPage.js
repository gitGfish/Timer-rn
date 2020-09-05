import React, { useState ,useEffect} from 'react';
import { StyleSheet, View , Text, Button } from 'react-native';
import {getTimers,addTimer,deleteTimer,createConnection,createTables} from '../database'
import MainPageList from '../components/MainPageList'
export default function MainPage(props) {
    
    useEffect(() => {
        props.handleTimerChosen2(null)
    }, []);
      

    return (
        <View style={styles.container}>
            <MainPageList onTimerChosen={props.handleTimerChosen} timers={props.timers}/>
            
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
