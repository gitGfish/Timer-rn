import React, { useState ,useEffect} from 'react';
import { StyleSheet, View , Text, Button } from 'react-native';
import MainPageList from '../components/MainPageList'
import AddTimer from '../components/addTimer';
import {addTimer,deleteTimer} from '../database'
import Icon from 'react-native-vector-icons/AntDesign';
export default function MainPage(props) {
    


    // input {
    //   title: "title",
    //   description: "desc"
    // }
    const handleAddTimer = (timer) => {
      
      if(timer === null || timer.title === null|| timer.description === null || timer.title ==="" || timer.description==='') 
        return
        console.log(timer)
      addTimer(timer.title,timer.description)
      props.handleRefresh()
    }

    const handleDeleteTimer = (id) => {
      if(id === null || id === '' || id < 0 || !id){
        return 
      }
      console.log(id)
      deleteTimer(id)
      props.handleRefresh()
    }

    return (
        <View style={styles.container}>
            <MainPageList onDeleteTimer={handleDeleteTimer} onTimerChosen={props.handleTimerChosen} timers={props.timers}/>
            <View style={styles.button_row}>
              <AddTimer  pushOrPress={true} onAddTimer={handleAddTimer}>
                        <Icon
                            raised
                            name="pluscircle" 
                            size={60}
                            color='#1778F2'
                            borderRadius={40}
                            style={styles.icon_background}
                        >
                        </Icon>
                </AddTimer>
              </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems:'center',
    justifyContent:'center'
  }, 
  navBar:{
    height: '10%',
    width:'100%',
    padding: 45,
    backgroundColor:'#73c2fb',
    alignItems:'flex-start',
  },
  icon_background:{
    shadowColor: "#000",
    shadowOffset: {
      width: 17,
      height: 17,
    },
    right:0,
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 18,
    backgroundColor:"#fff",
    borderRadius:100,
  },button_row:{
    width:'100%',
    right:25,
    bottom:25,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems:'flex-end',
    justifyContent:'flex-end'
  }
});
