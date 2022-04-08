import React, { useState, useEffect } from 'react';
import {StyleSheet, StatusBar, SafeAreaView, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { connect } from 'react-redux'

import {globalStyles, light, darkGrey, lightGrey, orange} from '../Shared/Global'
import Header from '../Shared/Components/Header';
import Dates from '../Shared/Components/Dates';

/*
  Calendar Screen:
		Displays calendar and information associated with the date selected.
*/
function CalendarScreen (props) {
  const [dates, setDates] = useState({})
  const [markedDates, setMarkedDates] = useState({...dates})
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US', {timeZone: 'UTC'}))

  //Object that contains multidot information 
  const Dots = {
    "Hammer":{key:'Hammer', color: orange},
    "Shot Put":{key:'Shot Put', color: '#7DCFB6'},
    "Discus":{key:'Discus', color: '#00B2CA'},
    "Weight":{key:'Weight', color: '#1D4e89'},
  }

  //Object that contains all distance information from database
  const allDistances = {
    "Hammer":props.hammer,
    "Discus":props.discus,
    "Weight":props.weight, 
    "Shot Put":props.shotPut,
    "HammerMeet":props.hammerMeet,
    "WeightMeet":props.weightMeet,
    "DiscusMeet":props.discusMeet,
    "Shot PutMeet":props.shotPutMeet,
  }

  //When screen loads get all multidot data for the current month
  useEffect(() => {getMonthMarkedDates(new Date().getMonth()+1)}, [])

  //For each entry that matches the shown month, add multidot information to date
  const getMonthMarkedDates = (month) => {
    var holder = {}
    setDates({})
    
    Object.keys(allDistances).forEach(key => {
      allDistances[key].forEach(element => {
        key = key.replace("Meet","")
        if(new Date(element.date.seconds*1000).getMonth()+1 == month){
          let date= new Date(element.date.seconds*1000).toLocaleDateString('fr-CA')
          if(holder.hasOwnProperty(date) &&  !holder[date].dots.some((type) => type.key === key)){
            holder[date].dots.push(Dots[key])
          }else if(!holder.hasOwnProperty(date)){
            holder = {...holder, [date]: {dots: [Dots[key]]}}
          }
        }
      })
    })
    setDates({...holder})
    setMarkedDates({...holder})
  }

  //Update selected day and mark it orange
  const getSelectedDayEvents = date => {
    setSelectedDate(new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC'}))
    setMarkedDates({...dates, [date]:{ selected: true, selectedColor: orange, textColor: light }})
  };
  
  return (
    <SafeAreaView style={globalStyles.darkView}>
      <StatusBar barStyle={'light-content'} /> 
      <Header title="Calendar" navigation={props.navigation}/>
      <View style={globalStyles.lightView}>

        <Dates
          onDayPress={day => { getSelectedDayEvents(day.dateString)}}
          onMonthChange={month => {getMonthMarkedDates(month.month)}}
          markedDates={markedDates}
        />

        <View style={styles.keyContainer1}>
          <View style={styles.keyContainer2}>
            {props.currentUser.events.map(event => <>
              <View style={[styles.keyDot, {backgroundColor:Dots[event].color}]}></View>
              <Text style={styles.keyText}>{event}</Text>
            </>)}
          </View>
        </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        {Object.keys(allDistances).map(key => <>
          {allDistances[key].map(element => <>
            {new Date(element.date.seconds*1000).toLocaleDateString() === selectedDate ?
              <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate('MoreInfo', {event:key, info:allDistances[key].find(object => object.id === element.id)})}>
                <Text style={styles.title}>{key.replace("Meet"," Meet")}</Text>

                {element.formatedDistances.map((distancePair, index) =>
                  <View key={index} style={{flexDirection: 'row'}}>
                    <Text style={[styles.text, {paddingLeft: 20,}]}>{distancePair.implement? distancePair.implement: (index+1)}:  </Text>
                    <Text style={styles.text}>{distancePair.distance}</Text>
                  </View>
                )}

              </TouchableOpacity>
            :<></>}
          </>)}
        </>)}
      </ScrollView>
      
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser:store.userState.currentUser,
  hammer: store.userState.hammer,
  discus: store.userState.discus,
  shotPut: store.userState.shotPut,
  weight: store.userState.weight,
  hammerMeet: store.userState.hammerMeet,
  discusMeet: store.userState.discusMeet,
  weightMeet: store.userState.weightMeet,
  shotPutMeet: store.userState.shotPutMeet
})

export default connect(mapStateToProps, null)(CalendarScreen);

const styles = StyleSheet.create({
  container:{
    backgroundColor:lightGrey,
    borderRadius:10,
    padding:10,
    width:"90%",
    alignSelf:'center',
    margin: 5
  },
  text:{
    fontFamily: "regular",
    color: darkGrey,
    fontSize: 18,
  },
  title:{
    fontFamily: "semiBold",
    color: darkGrey,
    fontSize: 20,
    textTransform: 'uppercase'
  },
  keyContainer1:{
    marginBottom:10, 
    height:20, 
    marginRight:20
  },
  keyContainer2:{
    right:0, 
    position:'absolute',
    flexDirection:'row',
    justifyContent:'center'
  },
  keyDot:{
    height:10, 
    width:10, 
    marginLeft:10, 
    marginTop:4, 
    marginRight:5, 
    borderRadius:100
  },
  keyText:{
    fontFamily: "regular", 
    color: darkGrey, 
    fontSize: 14
  }
});