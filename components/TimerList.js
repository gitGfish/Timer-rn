import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect ,useRef} from 'react';
import { StyleSheet, Text, View ,FlatList } from 'react-native';
import TimeBlock  from './TimeBlock'
import { Divider } from 'react-native-elements';
import {getAllTimersTimeBlocks,deleteTimer,deleteTimeBlockInstnace,addTimer,createConnection,createTables,addTimeBlock,getTimer,addTimeBlockToTimer,deleteTimeBlock,getTime_Blocks,getTimers} from '../database'

createConnection()
createTables()
// deleteTimer(2)
// getTimers()
// getAllTimersTimeBlocks()
// deleteTimeBlockInstnace(5)
// addTimer("this should work","pls work description")
// addTimeBlock("this is 400 sec","this is abig description this is abig description this is abig description this is abig description ",400)
// getTime_Blocks()

addTimeBlockToTimer(4,3,0)
// getTimer(4)

// deleteTimeBlock(2,6,3)
const fetchedTimer = [{
    id:1,
    position:1,
    title:"this is the first task",
    description: "this its 1 des",
    hour:0,
    minutes:0,
    seconds:3,
    beforeMyTimeToRun:0,
    untilMyTimeToRun:0*60 + 3,
},
{
    id:2,
    position:2,
    title:"thasdasdasd task",
    description: "this its 1 des",
    hour:0,
    minutes:1,
    seconds:2,
    beforeMyTimeToRun:0*60 + 3,
    untilMyTimeToRun:0*60 + 3 + 1*60 + 2,
},
{
    id:3,
    position:3,
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
    position:0,
    title:"null",
    description: "null",
    hour:0,
    minutes:6,
    seconds:15,
    beforeMyTimeToRun:0,
    untilMyTimeToRun:0,
}]


export default function TimerList(props) {
  let flatListRef = useRef(null)

  const [timerData, setTimerData] = useState(false);
  let getItemLayout = (data, index) => (
    { length: 50, offset: 50 * index, index }
  )

  let scrollToIndex = (index) => {
    flatListRef.scrollToIndex({animated: true, index: index});
  }
  //input data is [{
    //   "id": 1,
    //   "position": 3,
    //   "time_block_description": "des2",
    //   "time_block_id": 8,
    //   "time_block_sec": "90.0",
    //   "time_block_title": "title2",
    //   "timer_id": 2,
    // }]
  const handleSetTimerData = (data) =>{
    let i =0
    let befor = 0;
    let until = 0;
    let res = [];
    for(i ; i < data.length ; i++){
      let hour = Math.floor((data[i].time_block_sec / (60*60)))
      let minutes = Math.floor(((data[i].time_block_sec -  (hour * 60*60)) / 60))
      let sec = (data[i].time_block_sec -  (hour * 60*60) - (minutes*60))
      res.push({
        id:data[i].id,
        position:data[i].position,
        title:data[i].time_block_title,
        description: data[i].time_block_description,
        hour:hour,
        minutes:minutes,
        seconds:sec,
        beforeMyTimeToRun:befor,
        untilMyTimeToRun:befor + hour*24*60 + minutes*60 + sec ,
      }) 
      befor = befor + hour*24*60 + minutes*60 + sec;
    }
    setTimerData(res)
  }

  useEffect(() => {
    getTimer(4,handleSetTimerData)
  },[])



  return (
    <View style={styles.container}>
      <FlatList 
      ref={(ref) => { flatListRef = ref; }} 
      data={timerData} 
      getItemLayout={getItemLayout}
      renderItem={ time_block => (
          <TimeBlock scrollToIndex={scrollToIndex} key={time_block.id} sec={props.sec} timeBlock={time_block.item}/>
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
