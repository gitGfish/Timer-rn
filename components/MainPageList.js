import React,{ useState,useEffect ,useRef} from 'react';
import { StyleSheet, Text, View ,FlatList } from 'react-native';
import MainPageComponent from './MainPageComponent'


export default function MainPageList(props) {
  let flatListRef = useRef(null)

  
  let getItemLayout = (data, index) => (
    { length: 50, offset: 50 * index, index }
  )




  return (
    <View style={styles.container}>
      <FlatList 
      ref={(ref) => { flatListRef = ref; }} 
      data={props.timers} 
      getItemLayout={getItemLayout}
      keyExtractor={item => item.timer_id.toString()}
      renderItem={ timer => (
            <MainPageComponent onTimerChosen={props.onTimerChosen} data={timer.item}/>
        )

    } />
    
    </View>
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
