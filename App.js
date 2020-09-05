
import React, { useState ,useEffect} from 'react';
import { StyleSheet, View , Text, Button, Picker } from 'react-native';
import TimerInstance from './Screens/TimerInstance'
import { Header ,ListItem} from 'react-native-elements';
import MainPage from './Screens/MainPage'
import { Entypo } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Example from './components/BottomSheet'
import {getTimers,addTimer,deleteTimer,createConnection,createTables} from './database'
export default function App() {
  const [screen, setScreen] = useState('main');
  const [TimerChosen, setTimerChosen] = useState({});
  const [TimerChosen2, setTimerChosen2] = useState(null);
  const [title,setTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [timers, setTimers] = useState([]);
  useEffect(() => {
      createConnection()
      createTables()
      // addTimer("vitaly timer ","this is its short description")
      getTimers(setTimers)
      
    },[])

    // useEffect(() => {
    //   setTimerChosen2(TimerChosen2),
    //   setTitle(TimerChosen.timer_name + " | " + TimerChosen2.timer_name)
      
    // },[TimerChosen2])

  const handleTimerChosen = (timer) => {
    setTimerChosen(timer)
    setScreen('timer');
    setTitle(timer.timer_name)
  }

  const handleTimerChosen2 = (timer) => {
    setTimerChosen2(timer)
    if(timer){
      setTitle(TimerChosen.timer_name + " | " + timer.timer_name)
    }
  }

  const renderSwitch = () => {
    // setTimerChosen2({})
    switch(screen) {
      case 'main':
        return <MainPage handleTimerChosen2={ handleTimerChosen2} handleTimerChosen={handleTimerChosen} timers={timers} />;
      case 'timer':
        return <TimerInstance TimerId={TimerChosen} TimerId2={TimerChosen2} />;
      default:
        return <MainPage handleTimerChosen2={handleTimerChosen2} handleTimerChosen={handleTimerChosen} timers={timers}/>;
    }
  }

  return (
    <View style={styles.container}>
      <Header 
        centerComponent={{ text: {TimerChosen}, style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' } }
        containerStyle={{
          backgroundColor: '#1778F2',
          justifyContent: 'space-around',
          height:"15%",
        }}
      >
        <TouchableOpacity  style={styles.leftIcon} onPress={( ) =>setScreen('main') } >
          <Entypo name="home" size={24} color="#fff" />
        </TouchableOpacity>

      <Text style={styles.title}>{(screen === 'timer' ) ? (title) : ('')}</Text>
        <TouchableOpacity key={timers.length} style={styles.rightIcon} onPress={( ) => setIsVisible(!isVisible) } >
            
            <Example onTimerChosen={handleTimerChosen2} timers={timers}/>
        </TouchableOpacity>
        
      </Header>
      {renderSwitch()}  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  navBar:{
    height: '10%',
    width:'100%',
    padding: 45,
    backgroundColor:'#73c2fb',
    alignItems:'flex-start',
  },
  title:{
    fontSize:20,
    color:"#fff",
    alignSelf:'flex-start'
  },
  leftIcon:{
    margin:10
  },
  rightIcon:{
    margin:10
  }
});
