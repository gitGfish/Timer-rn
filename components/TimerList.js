import { StatusBar } from 'expo-status-bar';
import React from 'react';
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
    miliseconds:1*60*1000 + 3*1000,
},
{
    id:2,
    title:"thasdasdasd task",
    description: "this its 1 des",
    hour:0,
    minutes:1,
    seconds:2,
    miliseconds:1*60*1000 + 3*1000 + 1*60*1000 + 2*1000,
},
{
    id:3,
    title:"thasdasdasd task",
    description: "this its 1 des",
    hour:0,
    minutes:7,
    seconds:0,
    miliseconds:1*60*1000 + 3*1000 + 1*60*1000 + 2*1000 + 7*60*1000,
},
{
    id:-1,
    title:"null",
    description: "null",
    hour:0,
    minutes:6,
    seconds:15,
    miliseconds:0,
}]

const handleNextClock = () =>{

}

export default function TimerList() {
  return (
    <View style={styles.container}>
      <FlatList  data={fetchedTimer} renderItem={ time_block => (
          <TimeBlock handleNextClock={ handleNextClock} key={''+time_block.id} timeBlock={time_block.item}/>
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
