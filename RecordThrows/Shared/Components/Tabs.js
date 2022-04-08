import React from 'react';
import {StyleSheet} from 'react-native'
import SegmentedControlTab from "react-native-segmented-control-tab";

import {light, darkGrey, lightGrey, orange} from "../Global"

/*
  Return: A tab component (if there is only one option in values, return nothing)
  Props: 
    values - array of tab values
    index - position of tab selected
    setIndex - set the index of the selected tab
*/
function Tabs ({values, index, setIndex}) {
  if(values.length == 1){
    return(<></>)
  }
  return (
    <SegmentedControlTab
      tabsContainerStyle={styles.tabsContainerStyle}
      tabStyle={styles.tabStyle}
      tabTextStyle={styles.tabTextStyle}
      activeTabStyle={styles.activeTabStyle}
      activeTabTextStyle={styles.activeTabTextStyle}
      selectedIndex={index}
      allowFontScaling={false}
      values={values}
      onTabPress={(index) => setIndex(index)}
    />
  );
}

const styles = StyleSheet.create({
  tabsContainerStyle:{
    width: '90%',
    alignSelf:'center',
    margin:10
  },
  tabStyle: {
    backgroundColor: light,
    borderWidth:0,
    borderColor:light,
  },
  tabTextStyle: {
    fontFamily: "medium",
    color: lightGrey,
    fontSize: 18,
  },
  activeTabStyle: {
    backgroundColor: light,
    borderRightColor: light,
    borderBottomWidth: 1,
    borderBottomColor: orange,
  },
  activeTabTextStyle: {
    fontFamily: "semiBold",
    color: darkGrey,
    fontSize: 18,
  },
})

export default Tabs;