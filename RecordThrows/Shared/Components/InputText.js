import React, { useState } from 'react';
import {TextInput, StyleSheet} from 'react-native'
import {darkGrey, orange} from "../Global"

/*
  Return: A textInput component
  Props: 
    width - of textInput options
    placeholder - initial text shown
    onChangeText - function performed when the text is changed
    password - should the text be hided
    keyboard - type of keyboard shown
    disable - should the text be disabled
    value - the value of textInput
*/
function InputText ({width, placeholder, onChangeText, password, keyboard, disable, value}) {
  const [focus, isFocus] = useState(false)
  if(width == undefined){ width = 310}
  return (
    <TextInput 
      secureTextEntry={password} 
      placeholder={placeholder} 
      onChangeText={onChangeText} 
      style={focus ? [styles.focus, styles.both, {width:width}] : [styles.blur, styles.both, {width:width}]} 
      onFocus={()=>isFocus(true)} 
      onBlur={()=>isFocus(false)}
      keyboardType={keyboard || 'numeric'}
      editable={disable!=undefined? disable:true} 
      selectTextOnFocus={disable!=undefined? disable:true}
      value={value}/>
  );
}

const styles = StyleSheet.create({
  focus: {
    fontFamily: "regular",
    borderBottomColor: orange,
  },
  blur: {
    fontFamily: "light",
    borderBottomColor: darkGrey,
  },
  both:{
    color: darkGrey,
    fontSize: 18,
    borderBottomWidth:2,
    margin:10,
    alignSelf:'center'
  }
})

export default InputText;