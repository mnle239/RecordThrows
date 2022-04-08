import React from 'react';
import {View, StyleSheet} from 'react-native'

import {darkGrey} from "../Global"

/*
  Return: A divider component
*/
function Divider () {
  return (
    <View style={styles.divide}></View>
  );
}

const styles = StyleSheet.create({
  divide: {
    height:3,
    width:'98%',
    borderRadius:100,
    backgroundColor: darkGrey,
    alignSelf:'center',
    margin:10
  },
})
export default Divider;