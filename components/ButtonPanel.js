import React , { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import AddTimeBlock from './addTimeBlock'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ButtonPanel(props) {

    const [playPause, setPlayPause] = useState(false);

    const handlePlayPause = () => {
        props.handleToggle()
        setPlayPause(!playPause)
    }

    const handleReset = () => {
      props.ResetTimer()
    }

  return (
    <View style={styles.play_panel}>
        <View style={styles.play_pause_button}>
          <View style={styles.timer}>
                <Text style={{fontSize:30}}>00:{props.minutes}:{props.sec}</Text>
          </View>
            
        </View> 
        <View style={styles.lowerPanel}>
              <View >
                <TouchableOpacity>
                  <Icon
                      raised
                      name="reload1" 
                      type='ionicon'
                      size={40}
                      color='#1778F2'
                      borderRadius={40}
                      onPress={handleReset}
                  >
                  </Icon>
                </TouchableOpacity>
              </View>
              {(playPause) ? 
                (
                <View style={styles.icon_background}>
                  <TouchableOpacity>
                      <Icon
                        name="pausecircle" 
                        size={60}
                        raised
                        color='#1778F2' 
                        borderRadius={40}
                        onPress={handlePlayPause}
                      >
                      </Icon>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.icon_background}>
                  <TouchableOpacity>
                      <Icon
                          raised
                          name="play" 
                          type='ionicon'
                          size={60}
                          color='#1778F2'
                          borderRadius={40}
                          onPress={handlePlayPause}
                      >
                      </Icon>
                    </TouchableOpacity>
                </View>
            )}
                <AddTimeBlock pushOrPress={true} timerData={props.timerData} onAddTimeBlock={props.onAddTimeBlock}>
                <View style={styles.icon_background}>

                  <Icon
                            raised
                            name="pluscircle" 
                            type='ionicon'
                            size={40}
                            color='#1778F2'
                            borderRadius={40}
                        >
                    </Icon>
                </View>
              </AddTimeBlock>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
    play_panel:{
        bottom:0,
        width:'100%',
        marginBottom:10,
        position: 'absolute',
        alignSelf: 'center',
        
      },
      play_pause_button:{
        
        alignSelf: 'center',
      },
      timer:{
        marginTop:-30,
        fontSize:30,
        padding:10,
        shadowColor: "#000",
        shadowOffset: {
          width: 7,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
  
        elevation: 14,
        borderWidth:1,
        alignSelf: 'center',
        backgroundColor:"#fff",
        borderRadius:100,
      },
      icon_background:{
        shadowColor: "#000",
        shadowOffset: {
          width: 17,
          height: 17,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
  
        elevation: 18,
        backgroundColor:"#fff",
        borderRadius:100,
      },
      
      lowerPanel:{
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'70%',
        paddingTop:10
      },
      

});
