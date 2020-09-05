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
  const [border,setBorder] = useState(0); 
  const soundObject = new Audio.Sound();
  useEffect(() => {
    setTimeBlock(props.timeBlock)
    // console.log(props.timeBlock)
  }, []);

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
      setBorder(5)
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
    }else{
      // this time block is not running now 
      setBorder(0)
    }  
    // console.log(props.timeBlock)
  },[props.sec])


  let container= {
    borderColor: '#1778F2',
    borderWidth: border,
    borderTopEndRadius:100,
    borderBottomEndRadius:100,
    borderTopStartRadius:30,
    borderBottomStartRadius:30,
    // borderRightRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 9,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 15,
    paddingLeft:30,
    paddingRight:30,
    marginRight:20,
    marginLeft:20,
    marginBottom:20,
  }

  let show_description = {
    borderColor: '#1778F2',
    borderWidth: border,
    borderRadius:30,
    // borderRightRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 9,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 15,
    paddingLeft:30,
    paddingRight:30,
    marginRight:20,
    marginLeft:20,
    marginBottom:20,
  }


  const handleShowDescription = () => {

    setShowDetail(!showDetail)
  }


  const handleAlarm = async () => {
    

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
    <AddTimeBlock  pushOrPress={false} timerData={[timeBlock]} onDeleteTimeBlock={props.onDeleteTimeBlock} onAddTimeBlock={props.onAddTimeBlock} onPress={handleShowDescription} >
      {(showDetail) ? ( 
          <View style={show_description}  >
            <View style={styles.title_and_description}>
              <Text style={styles.title} >{position} . {props.timeBlock.title}</Text>
              <Text style={styles.big_description}  >{props.timeBlock.description}</Text>
              
            </View>
            
            <CircleProgressBar style={styles.circle_bar} percent={percent} Time={padToTwo(myHour) + ":" + padToTwo(myMinutes) + ":" + padToTwo(mySec)} />
            
          </View>
        ) : (
          <View style={container} >
              <View style={styles.title_and_description}>
                <View style={{flex:1}}></View>
                <Text style={styles.title} >{position} . {props.timeBlock.title}</Text>
                <Text style={styles.mini_description} >{props.timeBlock.description.substring(0, 4)}</Text>
                <View style={{flex:1}}></View>
              </View>
              <Text style={styles.time_display}></Text>
              
              <CircleProgressBar style={styles.circle_bar} percent={percent} Time={padToTwo(myHour) + ":" + padToTwo(myMinutes) + ":" + padToTwo(mySec)} />
              
          </View>
      
      )}
    </AddTimeBlock>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#1778F2',
    borderTopEndRadius:100,
    borderBottomEndRadius:100,
    borderTopStartRadius:30,
    borderBottomStartRadius:30,
    // borderRightRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 9,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 15,
    paddingLeft:30,
    paddingRight:30,
    marginRight:20,
    marginLeft:20,
    marginBottom:20,
  },
  circle_bar:{
    flex: 1,
  },
  title:{
    fontWeight: 'bold',
    fontSize:20,
    flex: 2,
  },
  time_display:{
    flex: 1,
  },
  show_description:{
    borderColor: 'black',
    borderRadius:30,
    // borderRightRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 14,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 9,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: 15,
    paddingLeft:30,
    paddingRight:30,
    marginRight:20,
    marginLeft:20,
    marginBottom:20,
  },
  description:{
    fontWeight: 'bold',
    
  },
  title_description:{
    fontWeight: 'bold',
    flex: 2,
  },
  empty_last_block:{
    flex: 2,
    padding: 20,
    margin:50,
  },
  mini_description:{
    flex:1
  },
  big_description:{
    backgroundColor:'#f2f2f2',
    marginTop:25,
    marginRight:25,
    padding:15,
    borderRadius:15,
  },
  title_and_description:{
    flex:3,
    margin:10
  }

});
