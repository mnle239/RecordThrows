import React from 'react';
import {StyleSheet} from 'react-native'
import {Calendar} from 'react-native-calendars';

import {darkGrey, lightGrey,light, orange} from "../Global"

/*
  Return: A calander component
  Props: 
    onDayPress - function performed when a day is pressed
    onMonthChange - function perfomed when the month is changed
    markedDates - days that should have multi-dot marks
*/
function Dates ({onDayPress, onMonthChange, markedDates}) {
  return (
    <Calendar
      onDayPress={day => onDayPress(day)}
      onMonthChange={markedDates == undefined?()=>{}:month => onMonthChange(month)}
      markingType='multi-dot'
      markedDates={markedDates}
      style={styles.calendar}
      theme={{
        calendarBackground: light,
        todayTextColor: orange,
        dayTextColor: darkGrey,
        textColor: darkGrey,
        textSectionTitleDisabledColor: lightGrey,
        arrowColor: darkGrey,
        monthTextColor: darkGrey,
        textSecondaryColor:darkGrey,
        textDayFontFamily: 'medium',
        textMonthFontFamily: 'semiBold',
        textDayHeaderFontFamily: 'semiBold',
        textDayFontSize: 18,
        textMonthFontSize: 22,
        textDayHeaderFontSize: 13,
        textSectionTitleColor: darkGrey,
        textDisabledColor: lightGrey,
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar:{
    borderWidth: 1,
    borderColor: darkGrey,
    width: "90%",
    alignSelf:'center',
    marginTop:10,
    borderRadius:10,
  }
});

export default Dates;