import React,{ useState,useEffect } from 'react';
import { StyleSheet, View , Text ,Button } from 'react-native';
import TimerList from '../components/TimerList';
import ButtonPanel from '../components/ButtonPanel';
import {Timer} from '../components/Timer'
import AddTmeBlock from '../components/addTimeBlock'
import {getAllTimersTimeBlocks,deleteTimer,deleteTimeBlockInstnace,addTimer,createConnection,createTables,addTimeBlock,getTimer,addTimeBlockToTimer,deleteTimeBlock,getTime_Blocks,getTimers} from '../database'
createConnection()

// // deleteTimer(2)
// getTimers()
// getAllTimersTimeBlocks()
// deleteTimeBlockInstnace(5)
// addTimer("this should work","pls work description")
// addTimeBlock("this is 400 sec","this is abig description this is abig description this is abig description this is abig description ",400)
// getTime_Blocks()

// addTimeBlockToTimer(4,8,9)
// getTimer(4)

// deleteTimeBlock(4,3)

export default function TimerInstance(props) {

    

    const [timerData, setTimerData] = useState([]);
    const [timerData2, setTimerData2] = useState(null);
    useEffect(() => {
      getTimer(props.TimerId.timer_id,handleSetTimerData)
      // getTimer(props.TimerId2.timer_id,handleSetTimerData2)
      
    },[])

    useEffect(() => {
      if(props.TimerId2 )
        getTimer(props.TimerId2.timer_id,handleSetTimerData2)
      
    },[props.TimerId2])

    const handleSetTimerData = (data) =>{
      let i =0
      let befor = 0;
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

    const handleSetTimerData2 = (data) =>{
      let i =0
      let befor = 0;
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
      setTimerData2(res)
    }

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
        
      // add Time Block at the last position
      const handleAddTimeBlock = async (data) => {
        if(data === null || data.title === null|| data.description === null || data.seconds === null|| data.TimerId === null|| data.position === null
          || data === "" || data.title === ""|| data.description === "" || data.seconds === ""|| data.TimerId === ""|| data.position === ""){
            console.log("nothing here should be null" + JSON.stringify(data) )
            return false;
          }
        // deleteTimer(4)
        console.log(JSON.stringify(data) )
        await addTimeBlock(data.title,data.description,data.seconds,props.TimerId.timer_id,data.position);
        //refresh
        await getTimer(props.TimerId.timer_id,handleSetTimerData)
      }

      const handelDeleteTimeBlock = async (position) => {
        deleteTimeBlock(props.TimerId.timer_id,position)
        await getTimer(props.TimerId.timer_id,handleSetTimerData)
      }
    
  return (
    (timerData2) ? (
      // 2 timer showing
      <View style={styles.container_2}>
      
        <View style={styles.list_top_container_2}>
            <TimerList small={true} key={timerData.length+''} l={1} onDeleteTimeBlock={handelDeleteTimeBlock} timerData={timerData} onAddTimeBlock={handleAddTimeBlock} sec={sec} startPause={startPause}/>
        </View>
          <View style={styles.list_below_container_2}>
          <TimerList small={true} key={timerData.length+''} l={2} onDeleteTimeBlock={handelDeleteTimeBlock} timerData={timerData2} onAddTimeBlock={handleAddTimeBlock} sec={sec} startPause={startPause}/>
      </View>
        
        <ButtonPanel timerData={timerData}  onAddTimeBlock={handleAddTimeBlock} ResetTimer={ResetTimer} handleToggle={handleToggle} sec={sec}/>
        
        
    </View>
    // if only one timer showing
    ) : (
      <View style={styles.container}>
      
        <View style={styles.list_top_container}>
            <TimerList  small={false} key={timerData.length+''} l={1} onDeleteTimeBlock={handelDeleteTimeBlock} timerData={timerData} onAddTimeBlock={handleAddTimeBlock} sec={sec} startPause={startPause}/>
        </View>
          
        
        <ButtonPanel timerData={timerData}  onAddTimeBlock={handleAddTimeBlock} ResetTimer={ResetTimer} handleToggle={handleToggle}  sec={sec}/>
        
        
    </View>
    )
    
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
  list_top_container: {
    flex: 1,
    marginBottom:2,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_below_container:{
    flex: 1,
    marginTop:2,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_2: {
    flex: 1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_top_container_2: {
    flex: 1,
    marginBottom:2,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list_below_container_2:{
    flex: 1,
    marginTop:2,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});
