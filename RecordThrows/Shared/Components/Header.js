
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {MaterialIcons} from '@expo/vector-icons';
import { darkGrey, light } from "../Global";

/*
  Return: The header of the screen
  Props: 
    title - the title of the screen
    navigation - the parent components navigation
*/
function Header({title, navigation}) {

  const onPress = () => {
    if(title == "More Info" || title == "Add Info") navigation.pop()
    else navigation.popToTop()
  }


  return (
    <View style={styles.header}>
      {title !== 'HOME' ? 
        <>
          <MaterialIcons style={styles.arrow} name='keyboard-arrow-left' onPress={onPress}/>
          <MaterialIcons style={styles.menu2} name='menu' onPress={()=>navigation.openDrawer()} />
        </>
        : <MaterialIcons style={styles.menu1} name='menu' onPress={()=>navigation.openDrawer()} />
      }

      <Text style={styles.title}>{title}</Text>
      
      {title != "Add Info" ?
        <MaterialIcons style={styles.add} name='add' onPress={()=>navigation.navigate('AddData')}/>
        : null}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: darkGrey,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: "semiBold",
    color: light,
    textAlign: "center",
    fontSize: 35,
    textTransform: 'uppercase'
  },
  menu1: {
    color: light,
    fontSize: 35,
    position: 'absolute',
    left: 15
  },
  menu2: {
    color: light,
    fontSize: 35,
    position: 'absolute',
    left: 27
  },
  arrow: {
    color: light,
    fontSize: 35,
    position: 'absolute',
    left: 2
  },
  add: {
    color: light,
    fontSize: 35,
    position: 'absolute',
    right: 15
  },
});

export default Header;
