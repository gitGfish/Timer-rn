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
  useEffect(() => {
    if(props.sec <= 0 ){
      setMyHour(props.timeBlock.hour);
      setMyMinutes(props.timeBlock.minutes);
      setMySec(props.timeBlock.seconds);
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
      if(mySec > 0 ){
        console.log("finished timer")
        setMySec(mySec=>mySec-1)
      }else if(myMinutes > 0 ){
        setMySec(59);
        setMyMinutes(myMinutes=>myMinutes-1)
      }else if(myHour > 0){
        setMySec(59);
        setMyMinutes(59)
        setMyMinutes(myHour=>myHour-1)
      }else{
        console.log("finished timer")
      }
      // changing the circle progress bar
      setPercent((props.sec - props.timeBlock.beforeMyTimeToRun) *100 / (props.timeBlock.untilMyTimeToRun - props.timeBlock.beforeMyTimeToRun) ) 
    }  
  },[props.sec])


  const handleShowDescription = () => {
    setShowDetail(!showDetail)
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
