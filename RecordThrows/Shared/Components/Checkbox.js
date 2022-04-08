import React from 'react';
import {StyleSheet} from 'react-native'
import { CheckBox} from 'react-native-elements';
import {MaterialIcons} from '@expo/vector-icons';

import {light, darkGrey, orange} from "../Global"

/*
  Return: A checkbox component
  Props: 
    title - title of the checkbox
    onPress - action performed when the checkbox is pressed
    index - index of this checkbox in the array
    setArray - array of checkbox is checked values
    setArrayValue - function to set array values
    width - width of checkbox container
*/
function Checkbox ({title, onPress, index, arrayObjects, setArray, width}) {

  if(width == undefined){ width = 135}

  const checkedIcon = <MaterialIcons style={styles.icon} name='check-box' />
  const uncheckedIcon = <MaterialIcons style={styles.icon} name='check-box-outline-blank' />

  const settingArray = () =>{
    arrayObjects[index] = {title: arrayObjects[index].title, selected: !arrayObjects[index].selected}
    setArray(arrayObjects)
  } 

  return (
    <CheckBox
      checkedIcon={checkedIcon} 
      uncheckedIcon={uncheckedIcon}
      checked={arrayObjects[index].selected} 
      title={title||arrayObjects[index].title} 
      textStyle={styles.text}
      onPress={onPress || settingArray} 
      containerStyle={[styles.check, {width:width}]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "medium",
    color: darkGrey,
    fontSize: 18,
    margin:1
  },
  icon:{
    fontSize: 18,
    color: orange
  },
  check:{
    backgroundColor:light,
    borderWidth:0,
    marginVertical:2,
    paddingLeft:10,
    paddingVertical:0,
  }
})

export default Checkbox;