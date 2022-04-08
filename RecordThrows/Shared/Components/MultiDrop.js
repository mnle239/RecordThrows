import React, { useState } from 'react';
import {StyleSheet} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

import {light, darkGrey, lightGrey} from "../Global"

/*
  Return: A dropDown component that can have up to 5 selections
  Props: 
    data - drop down options
    values - selected values
    setValues - function to set selected values
    placeholder - initial text shown
*/

function MultiDrop ({data, values, setValues, placeholder}) {
  DropDownPicker.setMode("BADGE");
  const [open, setOpen] = useState(false);
  return (
    <DropDownPicker
      dropDownContainerStyle={styles.dropDownContainerStyle}
      listItemContainer={styles.listItemContainer}
      placeholder={placeholder}
      placeholderStyle={styles.placeholderStyle}
      selectedItemContainerStyle={styles.selectedItemContainerStyle}
      open={open}
      value={values}
      items={data}
      setOpen={setOpen}
      setValue={values => setValues(values)}
      schema={{label: 'id', value: 'id'}}
      multiple={true}
      min={0}
      max={5}
      badgeStyle={styles.badgeStyle}
      badgeColors={lightGrey}
      textStyle={styles.text}
      arrowIconStyle={styles.arrowIconStyle}
      tickIconStyle={styles.tickIconStyle}
      style={styles.style}
      showBadgeDot={false}
    />    
  );
}

const styles = StyleSheet.create({
  dropDownContainerStyle:{
    backgroundColor: light,
    width:'90%',
    alignSelf:'center', 
    borderRadius:0
  },
  placeholderStyle:{
    color: darkGrey,
    fontFamily:'regular',
    fontSize: 16,
  },
  arrowIconStyle:{
    borderWidth:1,
    borderColor:darkGrey
  },
  tickIconStyle:{
    width: 0,
    height: 0
  },
  style:{
    backgroundColor:light, 
    width:'90%', 
    alignSelf:'center', 
    borderColor: darkGrey, 
    borderRadius:10,     
    height: 40,
  },
  text:{
    fontFamily:'regular', 
    fontSize:16
  },
  badgeStyle:{
    padding: 5
  },
  selectedItemContainerStyle:{
    backgroundColor: lightGrey
  },
  listItemContainer:{
    height: 40
  }
})

export default MultiDrop;