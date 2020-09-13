import React,{ useState,useEffect } from "react";
import { Text, TouchableOpacity, View, Button ,Picker,StyleSheet} from "react-native";
import Dialog from "react-native-dialog";
import Icon from 'react-native-vector-icons/AntDesign';
 
export default function AddTimer (props) {
    const [dialogVisible, setDalogVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    
  showDialog = () => {
    setDalogVisible(true);

  };
 
  handleCancel = () => {
    setDalogVisible(false);
  };
  

  const handleAdd = () => {
    props.onAddTimer({
        title:title,
        description:description,
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
        <TouchableOpacity onPress={showDialog}>
              {props.children}
          </TouchableOpacity>
        
        <Dialog.Container visible={dialogVisible} {...reactNativeModalProps}>
            <Dialog.Title>Add New Timer</Dialog.Title>
                <Dialog.Description>
                    please fill all of the fields
                </Dialog.Description>
            <Dialog.Input label="Timer Name" onChange={handleTitleChange}/>
            <Dialog.Input label="Description" onChange={handleDescriptionChange}/>
                    
            <Dialog.Button label="Cancel" onPress={handleCancel} />
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