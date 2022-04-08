import React from "react";
import { StyleSheet, View, Text } from "react-native";

/*
  Return: Record Throws Logo
*/
function Logo() {
  return (
    <View style={styles.container}>
      <View style={styles.rect3}></View>  
      <Text style={styles.record}>RECORD</Text>
      <View style={styles.rect4}></View>
      <View style={styles.rect5}></View>
      <View style={styles.rect6}></View>
      <Text style={styles.throws}>THROWS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 331,
    height: 150,
    margin:10
  },
  rect3: {
    width: 305,
    height: 150,
    backgroundColor: "rgba(249,207,164,1)",
    borderRadius: 15
  },
  throws: {
    fontFamily: "bold",
    color: "rgba(53,52,52,1)",
    fontSize: 53,
    top: 70,
    left: 65,
    position: "absolute",
  },
  rect4: {
    width: 41,
    height: 7,
    backgroundColor: "rgba(53,52,52,1)",
    borderRadius: 100,
    top: 87,
    left: 15,
    position: "absolute",
  },
  rect5: {
    width: 41,
    height: 7,
    backgroundColor: "rgba(53,52,52,1)",
    borderRadius: 100,
    top: 99,
    left: 15,
    position: "absolute",
  },
  rect6: {
    width: 41,
    height: 7,
    backgroundColor: "rgba(53,52,52,1)",
    borderRadius: 100,
    top: 111,
    left: 15,
    position: "absolute",
  },
  record: {
    top: 12,
    left: 12,
    position: "absolute",
    fontFamily: "bold",
    color: "rgba(53,52,52,1)",
    height: 73,
    fontSize: 69
  },
});

export default Logo;
