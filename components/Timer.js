import React,{ useState , useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';

export const Timer = (props) => {

  const [minutes, setMinutes] = useState(0);
  const [sec, setSec] = useState(0);
  const [milisec, setMiliSec] = useState(0);
  const [hour, setHour] = useState(0);
  const [startPause, setStartPause] = useState(false);
  const [reset, setReset] = useState(false);
  const [startTime,setStartTime] = useState(0);
  const [pausedTime,setPausedTime] = useState(0);
  const [currMilliSeconds,setCurrMilliSeconds] = useState(0);
  let padToTwo = (number) => (number <= 9 ? `0${number}`: number);
  let interval;
  let timer;  

  React.useEffect(() => {
    if(startPause){
      timer = setInterval(() => {
        console.log("click")
        setCurrMilliSeconds(currMilliSeconds => currMilliSeconds + 1000)
        setSec(currMilliSeconds/1000)
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [currMilliSeconds]);

    async function StartTimer (){
        interval = setTimeout(
        () => {
            console.log(currMilliSeconds/1000)
            setCurrMilliSeconds(currMilliSeconds => currMilliSeconds + 1000)
            setMiliSec(0)
            setSec(currMilliSeconds/1000)
            setMinutes(0)
            setHour(0)
        },
        1000
        );
    }
    async function StopTimer(){
      console.log("stop clicked")
      clearTimeout(interval);
      clearInterval(timer);
    }

    async function ResetTimer(){
      setCurrMilliSeconds(0)
            setMiliSec(0),
            setSec(0),
            setMinutes(0),
            setHour(0)
    }
    
    async function getSec(){
      return sec;
    }
  return ({
    startPause,
    setStartPause,
    sec,
    milisec,
    minutes,
    hour,
    ResetTimer,
    StopTimer,
    StartTimer

    
    

  })
}