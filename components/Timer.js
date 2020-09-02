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

    
 
  
    useEffect(
    () => {
        let interval;
        if (startPause) {
            interval = setInterval(
            () => {
                console.log(currMilliSeconds/1000)
                console.log(new Date())
                let date = new Date(); 
                let addMilisec = date.getTime();
                setCurrMilliSeconds(currMilliSeconds => currMilliSeconds + (new Date(addMilisec - startTime ).getTime()))
                setStartTime((new Date()).getTime())
                setMiliSec(0),
                setSec(currMilliSeconds/1000),
                setMinutes(0),
                setHour(0)
            },
            2000
            );
        }
        return () => clearInterval(interval);
    },
    [startPause]
  );
  return ({
    startPause,
    setStartPause,
    sec,
    milisec,
    minutes,
    hour,
    setReset,
    
    

  })
}