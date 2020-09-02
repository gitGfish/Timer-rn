import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CircleProgressBar from './CircleProgressBar'
import {Timer} from './Timer'
const calculateNiliseconds = (h,m,s,mili) => {
    return mili + (s*1000) + (m*60*1000) + (h*60*60*1000)
}
let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
export default function TimeBlock(props) {
  const [showDetail, setShowDetail] = useState(false);
  const [percent, setPercent] = useState(0);
  const [myHour, setMyHour] = useState(props.timeBlock.hour);
  const [myMinutes, setMyMinutes] = useState(props.timeBlock.minutes);
  const [mySec, setMySec] = useState(props.timeBlock.seconds);
  const [myMilisec, setMyMilisec] = useState(props.timeBlock.miliseconds);
  useEffect(() => {
    
    setPercent(calculateNiliseconds(hour,minutes,sec,milisec) * 100 / calculateNiliseconds(myHour,myMinutes,mySec,myMilisec) )   
  },[milisec])

  const {
    startPause,
    setStartPause,
    sec,
    milisec,
    minutes,
    hour,
    setReset,

  } = Timer()
  
  useEffect(() => {

    setStartPause(props.startPause)   
  },[props.running])
  useEffect(() => {

  setMyHour(props.timeBlock.hour);
  setMyMinutes(props.timeBlock.minutes);
  setMySec (props.timeBlock.seconds);
  setMyMilisec(props.timeBlock.miliseconds);   
  },[props.timeBlock])

  const handleShowDescription = () => {
    setShowDetail(!showDetail)
  }
  if(props.timeBlock.id === -1){
    return (
      <View style={styles.empty_last_block}>

      </View>
    )
  }
  return (
    (showDetail) ? ( 
      <TouchableOpacity style={styles.show_description} onPress={handleShowDescription}>
        <View style={{flex:1,flexDirection:'row'}}>
          <Text style={styles.title_description} >{props.timeBlock.title}</Text>
          <View style={{flex:1}}></View>
    <Text style={styles.time_description}>{padToTwo(myHour)}:{padToTwo(myMinutes)}:{padToTwo(mySec)}</Text>
          <CircleProgressBar style={styles.circle_bar} percent={percent} />
        </View>
        <View style={{flex:5,flexDirection:'row'}}>
          <Text style={styles.description} >{props.timeBlock.description}</Text>
        </View>
      
    </TouchableOpacity>
    ) : (
    <TouchableOpacity style={styles.container} onPress={handleShowDescription}>
        <Text style={styles.title} >{props.timeBlock.title}</Text>
        <View style={{flex:3}}></View>
        <Text style={styles.time_display}>{padToTwo(myHour)}:{padToTwo(myMinutes)}:{padToTwo(mySec)}</Text>
        <CircleProgressBar style={styles.circle_bar} percent={percent} />
        
    </TouchableOpacity>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 2,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 20,
    margin:10,
  },
  circle_bar:{
    flex: 1,
  },
  title:{
    fontWeight: 'bold',
    flex: 3,
  },
  time_display:{
    flex: 2,
  },
  show_description:{
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 2,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 40,
    margin:10,
  },
  description:{
    fontWeight: 'bold',
  },
  title_description:{
    fontWeight: 'bold',
    flex: 3,
  },
  time_description:{
    flex: 2,
  },
  empty_last_block:{
    flex: 2,
    padding: 20,
    margin:50,
  }

});
