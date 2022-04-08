import React from 'react';
import {Text, StyleSheet} from 'react-native'

import {darkGrey} from "../Global"

/*
  Return: A header title
  Props: title - the title to be displayed
*/
function Title ({title}) {
  return (
    <Text style={styles.title}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "semiBold",
    color: darkGrey,
    fontSize: 35,
    textTransform: 'uppercase',
    marginLeft: 20
  },
})

export default Title;
