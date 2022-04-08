import React, { useEffect } from 'react';
import {StyleSheet, View } from 'react-native'
import {Dropdown} from 'react-native-element-dropdown';
import {MaterialIcons} from '@expo/vector-icons';

import {light, darkGrey, lightGrey} from "../Global"
import Title from './Title';

/*
  Return: A dropDown component (if data only gives one option return a title of the only option)
  Props: 
    data - drop down options
    value - selected value
    setValue - function to set selected value
    placeholder - initial text shown
    width - width of container
*/
function SingleDrop ({data, value, setValue, placeholder, width}) {
  //set value if only one option in data
  useEffect(() => {
    if(data != undefined && data.length == 1){
      setValue(data[0].id)
    }
  }, [])

  //return title if only one option in data
  if(data != undefined && data.length == 1){
    return(
      <Title title={data[0].id}/>
    )
  }
  
  //Set default width
  if(width == undefined){ width = "90%"}

  return (
    <View style={[styles.container,{width:width}]}>
      <Dropdown
        maxHeight={data.length < 5 ? data.length*55 : 275}
        data={data}
        labelField="id"
        valueField="id"
        placeholder={placeholder}
        value={value}
        onChange={item => setValue(item.id)}
        fontFamily="regular"
        style={styles.dropdown}
        containerStyle={[styles.containerStyle,{width:width}]}
        activeColor={lightGrey}
        renderRightIcon={()=>
          <MaterialIcons style={styles.iconStyle1} name='keyboard-arrow-down'/>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle:{
    backgroundColor:light,
  },
  container:{
    alignSelf:'flex-start',
    marginLeft:20,
    margin:5
  },
  dropdown: {
    height: 40,
    backgroundColor: light,
    borderRadius: 10,
    borderWidth:1,
    borderColor: darkGrey,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  iconStyle1: {
    borderWidth: 1,
    borderColor: darkGrey,
    color: darkGrey,
    fontSize: 18
  }
})

export default SingleDrop;