import React, { useRef,useState,useEffect } from "react";
import { View, Button,Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import MainPageList from './MainPageList'

import { Entypo } from '@expo/vector-icons'; 

export default function Example(props) {
  const [timers, setTimers] = useState(props.timers);

  useEffect(() => {
    console.log(timers)
  }, []);
  useEffect(() => {
    setTimers(timers)
  }, [props.timers]);
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
      }}
    >
        <Entypo name="add-to-list" size={24} color="white" onPress={() => refRBSheet.current.open()} ></Entypo>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        openDuration={400}
        animationType="none"
        height={600}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
                {/* {timers.map((timer) => {
                    return(<Text>{timer.timer_name}</Text>)
                })} */}
              <MainPageList style={{fles:1}} onTimerChosen={props.onTimerChosen} timers={timers}/>
          
          </RBSheet>
    </View>
  );
}