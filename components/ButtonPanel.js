import React , { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


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
            {(playPause) ? 
                (
                <View style={styles.icon_background}>
                    <Icon
                    name="pausecircle" 
                    size={60}
                    raised
                    color='#3b5998' 
                    borderRadius={40}
                    onPress={handlePlayPause}
                    >
                    </Icon>
                </View>
            ) : (
                <View style={styles.icon_background}>
                    <Icon
                        raised
                        
                        name="play" 
                        type='ionicon'
                        size={60}
                        color='#3b5998'
                        borderRadius={40}
                        onPress={handlePlayPause}
                    >
                    </Icon>
                </View>
            )}
        </View> 
        <Text style={styles.timer}>00:{props.minutes}:{props.sec}</Text>
        <View style={styles.icon_Left}>
            <Icon
                raised
                name="reload1" 
                type='ionicon'
                size={40}
                color='#3b5998'
                borderRadius={40}
                onPress={handleReset}
            >
            </Icon>
        </View>
        <Icon
            raised
            
            name="play" 
            type='ionicon'
            size={60}
            color='#3b5998'
            borderRadius={40}
            onPress={handlePlayPause}
        >
        </Icon>
    </View>
  );
}

const styles = StyleSheet.create({
    play_panel:{
        bottom:0,
        width:'100%',
        backgroundColor: '#73c2fb',
        marginBottom:-300,
        height:'60%',
        position: 'absolute',
        alignSelf: 'center',
        borderRadius: 700,
        borderWidth: 2,
        
      },
      play_pause_button:{
        marginTop:-30,
        alignSelf: 'center',
      },
      timer:{
        marginTop:20,
        fontSize:30,
        alignSelf: 'center',
      },
      icon_background:{
        backgroundColor:"#fff",
        borderRadius:100,
      },
      icon_Left:{
        left:70,
        bottom:30
      }
});
