import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect } from 'react';
import { StyleSheet, Text, View ,FlatList } from 'react-native';
import TimeBlock  from './TimeBlock'
import { Divider } from 'react-native-elements';
const fetchedTimer = [{
    id:1,
    title:"this is the first task",
    description: "this its 1 des",
    hour:0,
    minutes:1,
    seconds:3,
    beforeMyTimeToRun:0,
    untilMyTimeToRun:1*60 + 3,
},
{
    id:2,
    title:"thasdasdasd task",
    description: "this its 1 des",
    hour:0,
    minutes:1,
    seconds:2,
    beforeMyTimeToRun:1*60 + 3,
    untilMyTimeToRun:1*60 + 3 + 1*60 + 2,
},
{
    id:3,
    title:"thasdasdasd task",
    description: "this its 1 des",
    hour:0,
    minutes:7,
    seconds:0,
    beforeMyTimeToRun:1*60 + 3 + 1*60 + 2,
    untilMyTimeToRun:1*60 + 3 + 1*60 + 2 + 7*60,
},
{
    id:-1,
    title:"null",
    description: "null",
    hour:0,
    minutes:6,
    seconds:15,
    beforeMyTimeToRun:0,
    untilMyTimeToRun:0,
}]

const handleNextClock = () =>{

}

export default function TimerList(props) {

  return (
    <View style={styles.container}>
      <FlatList data={fetchedTimer} renderItem={ time_block => (
          <TimeBlock key={time_block.id} sec={props.sec} handleNextClock={ handleNextClock} timeBlock={time_block.item}/>
        )
    } />
    
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
  },
});
