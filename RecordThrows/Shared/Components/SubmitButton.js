import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native'

import {light, darkGrey} from "../Global"

/*
  Return: A button component
  Props: 
    text - title on displayed on button
    onPress - funtion executed when pressed
*/
function SubmitButton ({text, onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkGrey,
    borderRadius: 10,
    width: '90%',
    height: 57,
    justifyContent: "center",
    alignSelf:'center',
    margin:10
  },
  text: {
    color: light,
    fontSize: 30,
    fontFamily: "bold",
    alignSelf: "center",
    textTransform: 'uppercase'
  },
})

export default SubmitButton;