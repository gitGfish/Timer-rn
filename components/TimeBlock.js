import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CircleProgressBar from './CircleProgressBar'
import AddTimeBlock from './addTimeBlock'
import {Timer} from './Timer'
import { Audio, Video } from 'expo-av';
const calculateSeconds = (h,m,s) => {
    return mili + (s*1000) + (m*60*1000) + (h*60*60*1000)
}
let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
export default function TimeBlock(props) {
  const [showDetail, setShowDetail] = useState(false);
  const [percent, setPercent] = useState(0);
  const [myHour, setMyHour] = useState(props.timeBlock.hour);
  const [myMinutes, setMyMinutes] = useState(props.timeBlock.minutes);
  const [mySec, setMySec] = useState(props.timeBlock.seconds);
  const [position, setPosition] = useState(props.timeBlock.position);
  const [alarmOn,setAlarmOn] = useState(props.timeBlock.alarmOn);
  const [timeBlock,setTimeBlock] = useState(props.timeBlock);
  
  useEffect(() => {
    setTimeBlock(props.timeBlock)
    console.log(props.timeBlock)
  }, [props.timeBlock]);

  useEffect(() => {
    if(props.sec <= 0 ){
      setMyHour(props.timeBlock.hour);
      setMyMinutes(props.timeBlock.minutes);
      setMySec(props.timeBlock.seconds);
      setAlarmOn(props.timeBlock.alarmOn);
      setPosition(props.timeBlock.position)
      setPercent(0);
      setShowDetail(false);
    }
    // it is the time of this time block to run 
    // we focus on him and openning his details
    if(props.sec === props.timeBlock.beforeMyTimeToRun){
      props.scrollToIndex(props.timeBlock.position)
      setShowDetail(true);
    }
    // it is the end time of this time block to run 
    // we are closing his details
    if(props.sec === props.timeBlock.untilMyTimeToRun){
      setShowDetail(false);
    }
    // checking if is run time for this time block
    if(props.sec >= props.timeBlock.beforeMyTimeToRun  && props.sec <= props.timeBlock.untilMyTimeToRun){
      if(props.sec === props.timeBlock.untilMyTimeToRun){
        handleAlarm()
        console.log("finished timer")
      }
      if(mySec > 0 ){
        setMySec(mySec=>mySec-1)
      }else if(myMinutes > 0 ){
        setMySec(59);
        setMyMinutes(myMinutes=>myMinutes-1)
      }else if(myHour > 0){
        setMySec(59);
        setMyMinutes(59)
        setMyMinutes(myHour=>myHour-1)
      }
      // changing the circle progress bar
      setPercent((props.sec - props.timeBlock.beforeMyTimeToRun) *100 / (props.timeBlock.untilMyTimeToRun - props.timeBlock.beforeMyTimeToRun) ) 
    }  
    // console.log(props.timeBlock)
  },[props.sec])


  const handleShowDescription = () => {
    setShowDetail(!showDetail)
  }


  const handleAlarm = async () => {
    const soundObject = new Audio.Sound();

    try {
      console.log("playingSound")
      await soundObject.loadAsync(require('../assets/sounds/alarm.mp3'));
      await soundObject.playAsync();
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object
      // await soundObject.unloadAsync();
    } catch (error) {
      // An error occurred!
}
  }

  // time block with id -1 must be included, and will be invisable 
  // its prettier 
  if(props.timeBlock.id === -1){
    return (
      <View style={styles.empty_last_block}>

      </View>
    )
  }
  return (
    <AddTimeBlock pushOrPress={false} timerData={[timeBlock]} onAddTimeBlock={props.onAddTimeBlock} onPress={handleShowDescription} >
      {(showDetail) ? ( 
          <View style={styles.show_description} >
            <View style={{flex:1,flexDirection:'row'}}>
      <Text style={styles.title_description} >{position} . {props.timeBlock.title}</Text>
              <View style={{flex:1}}></View>
        <Text style={styles.time_description}>{padToTwo(myHour)}:{padToTwo(myMinutes)}:{padToTwo(mySec)}</Text>
              <CircleProgressBar style={styles.circle_bar} percent={percent} />
            </View>
            <View style={{flex:5,flexDirection:'row'}}>
              <Text style={styles.description} >{props.timeBlock.description}</Text>
            </View>
          
        </View>
        ) : (
        <View style={styles.container} >
            <View style={styles.title}>
              <Text style={styles.title} >{position} . {props.timeBlock.title}</Text>
              <Text style={styles.mini_description} >{props.timeBlock.description}</Text>
            </View>
            <View style={{flex:3}}></View>
            <Text style={styles.time_display}>{padToTwo(myHour)}:{padToTwo(myMinutes)}:{padToTwo(mySec)}</Text>
            <CircleProgressBar style={styles.circle_bar} percent={percent} />
            
        </View>
      
      )}
    </AddTimeBlock>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderTopEndRadius:100,
    borderBottomEndRadius:100,
    borderTopStartRadius:20,
    borderBottomStartRadius:20,
    // borderRightRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    borderWidth: 2,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 12,
    paddingLeft:30,
    paddingRight:25,
    margin:6,
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
    borderTopEndRadius:100,
    borderBottomEndRadius:100,
    borderTopStartRadius:20,
    borderBottomStartRadius:20,
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
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
  },
  mini_description:{

  }

});
