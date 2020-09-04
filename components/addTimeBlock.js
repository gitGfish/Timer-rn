import React,{ useState,useEffect } from "react";
import { Text, TouchableOpacity, View, Button ,Picker,StyleSheet} from "react-native";
import Dialog from "react-native-dialog";
import Icon from 'react-native-vector-icons/AntDesign';
 
export default function AddTimeBlock (props) {
    const [dialogVisible, setDalogVisible] = useState(false);
    const [secondsPicker, setSecondsPicker] = useState([]);
    const [minutesPicker, setMinutesPicker] = useState([]);
    const [hoursPicker, setHoursPicker] = useState([]);
    const [insertAfterPicker, setInsertAfterPicker] = useState(0);
    const [allTimeBlockPositions, setAllTimeBlockPositions] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [alert, setAlert] = useState(false);
    
    
    useEffect(() => {
        setAllTimeBlockPositions(props.timerData.map((timeblock) => {
            setInsertAfterPicker(props.timerData[0].position)
            return <Picker.Item key={''+timeblock.id} label={''+timeblock.title} value={timeblock.position} />
        }))
        // // used for adding after another timr block
        // if(props.timerData.length === 1){
        //     setInsertAfterPicker(props.timerData[0].position )
        // }
      },[props.timerData])

    const seconds = Array.apply(null, {length: 60}).map(Number.call, Number)
    const secondsPickerItems = seconds.map((number) => 
        {
            return <Picker.Item key={''+number} label={''+number} value={number} />
        }
    )
    const minutes = Array.apply(null, {length: 60}).map(Number.call, Number)
    const minutesPickerItems = minutes.map((number) => 
        {
            return <Picker.Item key={''+number} label={''+number} value={number} />
        }
    )
    const hours = Array.apply(null, {length: 24}).map(Number.call, Number)
    const hoursPickerItems = hours.map((number) => 
        {
            return <Picker.Item key={''+number} label={''+number} value={number} />
        }
    )
  
    
  showDialog = () => {
    setDalogVisible(true);

  };
 
  handleCancel = () => {
    setDalogVisible(false);
  };
  
  const handleDelete = () => {
    //  delete the picked position
    console.log(insertAfterPicker)
    props.onDeleteTimeBlock(insertAfterPicker)
    setDalogVisible( false );
  };

  const handleAdd = () => {
    props.onAddTimeBlock({
        title:title,
        description:description,
        seconds:(hoursPicker*60*60) + (minutesPicker*60) + secondsPicker,
        position: insertAfterPicker
    })
    setDalogVisible( false );
  };
  // if you tap out side of the dialog
  const onCancel = () => {
    setDalogVisible( false )
  };
  

  const reactNativeModalProps = {
    onBackdropPress: onCancel,
  };
  

  function handleTitleChange(e) {
      if(e && e.nativeEvent ){
        setTitle(e.nativeEvent.text);
      }
  }

  function handleDescriptionChange(e) {
    if(e && e.nativeEvent){
        setDescription(e.nativeEvent.text);
    }
  }
    return (
      <View>
          {(props.pushOrPress === true) ? (
              <TouchableOpacity onPress={showDialog}>
              {props.children}
          </TouchableOpacity>
          ) : (
            <TouchableOpacity onLongPress={showDialog} onPress={props.onPress}>
                {props.children}
            </TouchableOpacity>
          ) }
        
        <Dialog.Container visible={dialogVisible} {...reactNativeModalProps}>
            <View style={{flexDirection:"row",justifyContent:'space-between',alignItems: 'center'}}>
                <Text>Insert After</Text>
                <Picker
                            mode="dropdown"
                            style={{width: "60%"}}
                            selectedValue={insertAfterPicker}
                            onValueChange={(lang) => setInsertAfterPicker(lang)}>
                                {allTimeBlockPositions}
                            
                </Picker>
                <View></View>
            </View>
            <Dialog.Title>Add New Time Block</Dialog.Title>
                <Dialog.Description>
                    please fill all of the fields
                </Dialog.Description>
            <Dialog.Input label="title" onChange={handleTitleChange}/>
            <Dialog.Input label="description" onChange={handleDescriptionChange}/>
            <Dialog.Switch label="alert" checked={alert}
            onChange={(e) => setAlert(e.target.checked)}/> 
            
                <View style={{flexDirection:'row' , justifyContent:'space-between',alignItems: 'center'}}>
                    <Text>hours</Text>
                    <Text>minutes</Text>
                    <Text>seconds</Text>
                </View>
                <View style={{flexDirection:'row' , justifyContent:'space-between',alignItems: 'center'}}>
                    <Picker
                        mode="dropdown"
                        style={{width: 90}}
                        selectedValue={hoursPicker}
                        onValueChange={(lang) => setHoursPicker(lang)}>
                            {hoursPickerItems}
                        
                    </Picker>
                    <Picker
                        mode="dropdown"
                        style={{width: 90}}
                        selectedValue={minutesPicker}
                        onValueChange={(lang) => setMinutesPicker(lang)}>
                            {minutesPickerItems}
                        
                    </Picker>
                    <Picker
                        prompt="ssd"
                        mode="dropdown"
                        style={{width: 90}}
                        selectedValue={secondsPicker}
                        onValueChange={(lang) => setSecondsPicker(lang)}>
                            {secondsPickerItems}
                        
                    </Picker>
                    
                    
                    
                    
                </View>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="delete" onPress={handleDelete} />
            <Dialog.Button label="add" onPress={handleAdd} />
        </Dialog.Container>
    </View>
    );
}


const styles = StyleSheet.create({
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
  }
});