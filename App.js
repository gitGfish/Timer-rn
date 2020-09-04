
import React, { useState ,useEffect} from 'react';
import { StyleSheet, View , Text, Button } from 'react-native';
import TimerInstance from './Screens/TimerInstance'
import { Header } from 'react-native-elements';
import MainPage from './Screens/MainPage'
import { Entypo } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
export default function App() {
  const [screen, setScreen] = useState('main');
  const [TimerChosen, setTimerChosen] = useState(0);
  const [title,setTitle] = useState("")

  const handleTimerChosen = (timer) => {
    setTimerChosen(timer.timer_id)
    setScreen('timer');
    setTitle(timer.timer_name)
  }

  const renderSwitch = () => {
    switch(screen) {
      case 'main':
        return <MainPage handleTimerChosen={handleTimerChosen}  />;
      case 'timer':
        return <TimerInstance TimerId={TimerChosen} />;
      default:
        return <MainPage handleTimerChosen={handleTimerChosen} />;
    }
  }

  return (
    <View style={styles.container}>
      <Header 
        centerComponent={{ text: {TimerChosen}, style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' } }
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'space-around',
        }}
      >
        <TouchableOpacity onPress={( ) =>setScreen('main') } >
          <Entypo name="home" size={24} color="#fff" />
        </TouchableOpacity>

      <Text style={styles.title}>{(screen === 'timer' ) ? (title) : ('')}</Text>
        <TouchableOpacity onPress={( ) =>setScreen('main') } >
            <Feather name="settings" size={24} color="white" />
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
  }
});
