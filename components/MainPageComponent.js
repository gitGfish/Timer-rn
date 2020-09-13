import { StatusBar } from 'expo-status-bar';
import React,{ useState,useEffect ,useRef} from 'react';
import { StyleSheet, Text, View ,FlatList,TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import TimeBlock  from './TimeBlock'
import { Divider } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements'

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  
]


export default function MainPageComponent(props) {
  
    const handleTimerChosen = () => {
        if(props.data)
            props.onTimerChosen(props.data)
    }

    const handleDeleteTimer = () => {
      if(props.data || props.data.timer_id)
        props.onDeleteTimer(props.data.timer_id)
  }

  return (
    <TouchableOpacity onLongPress={handleDeleteTimer} onPress={handleTimerChosen}>
        <ListItem bottomDivider>
            <ListItem.Content>
            <ListItem.Title>{props.data.timer_name}</ListItem.Title>
            <ListItem.Subtitle>{props.data.timer_description}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    </TouchableOpacity>
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
