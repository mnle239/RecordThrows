import React, { useState, useEffect } from 'react';
import {StatusBar, SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'

import { connect } from 'react-redux'

import Header from '../Shared/Components/Header';
import Title from '../Shared/Components/Title';
import Divider from '../Shared/Components/Divider';
import { darkGrey, globalStyles, light, lightGrey, orange } from '../Shared/Global';
import SingleDrop from '../Shared/Components/SingleDrop';
import Dates from '../Shared/Components/Dates';
import Table from '../Shared/Components/Tables';
import Graph from '../Shared/Components/Graph';


/*
  Meet Overview Screen:
  	Displays overview information for Practice information.
*/
function MeetOverview (props) {
  const shownEvent = props.route.params
  const {currentUser} = props
  const [eventSelected, setEventSelected] = useState("")
  const [data, setData] = useState([[],[]])
  const [dates, setDates] = useState({})
  const [markedDates, setMarkedDates] = useState({...dates})
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US', {timeZone: 'UTC'}))

  //Calendar colors
  const selectColors = {
    "":{key:'noSelecte'},
    "Hammer": {key:'firstSelect', color: '#F79256'},
    "Discus": {key:'secondSelect', color: '#7DCFB6'},
    "Shot Put": {key:'thirdSelect', color: '#00B2CA'},
    "Weight": {key:'forthSelect', color: '#1D4e89'},
  }

  //Object that contains best throws from each meet entry
  const meetBest = {
    "Hammer":props.hammerMeetBest,
    "Discus":props.discusMeetBest,
    "Weight":props.weightMeetBest, 
    "Shot Put":props.shotPutMeetBest
  }

  //Object that contains all info from every meet entry in database
  const allDistances = {
    "Hammer":props.hammerMeet,
    "Discus":props.discusMeet,
    "Weight":props.weightMeet, 
    "Shot Put":props.shotPutMeet
  }

  //Format user events
  const getEvents = () => {
    var events = [];
    (currentUser.events).forEach(element => {
      events.push({id: element})
    })
    return events
  }

  //get meet PR
  const tableData = [];
  var farthestThrow = {distance:0, date:0, id:0}
  if(eventSelected != ""){
    meetBest[eventSelected].forEach(element => {
      if(parseInt(element.distance) > farthestThrow.distance){
        farthestThrow = element
      }
    });
    if(farthestThrow.distance != 0){
      tableData.push(["Meet PR", farthestThrow.distance, new Date(farthestThrow.date.seconds *1000).toLocaleDateString(), farthestThrow.id])
    }
  }

  //Get the selected day and display it orange
  const getSelectedDayEvents = date => {
    setSelectedDate(new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC'}))
    setMarkedDates({...dates, [date]:{ selected: true, selectedColor: orange, textColor: light }})
  };

  //For each entry that matches the shown month and the event selected, add multidot information to date
  const getMonthMarkedDates = (month) => {
    let holder = {};
    if(eventSelected != ""){
      allDistances[eventSelected].forEach(element => {
        if(new Date(element.date.seconds*1000).getMonth()+1 == month){
          let date= new Date(element.date.seconds*1000).toLocaleDateString('fr-CA')
          if(holder.hasOwnProperty(date) && !holder[date].dots.some((type) => type === selectColors[eventSelected])){
            holder[date].dots.push(selectColors[eventSelected])
          }else if(!holder.hasOwnProperty(date)){
            holder = {...holder, [date]: {dots: [selectColors[eventSelected]]}}
          }
        }
      })
    }
    setDates({...holder})
    setMarkedDates({...holder})
  }

  //update calendar and graph when eventSelected changes
  useEffect(() => {
    getMonthMarkedDates(new Date().getMonth()+1)
    updateGraph()
  }, [eventSelected])

  //update graph
  const updateGraph = () => {
    var dataArray = []
    //add line information
    dataArray.push({
      x: [], y: [], type: "scatter", mode: "lines+markers", name: eventSelected,
      line: {width: 3, color: selectColors[eventSelected].color}, 
      marker: {line: {width: 2, color: selectColors[eventSelected].color}}
    })
    //add x and y values
    if(eventSelected != ""){
      meetBest[eventSelected].forEach(entry=>{
        dataArray[0].x.push(new Date(entry.date.seconds *1000).toLocaleString('fr-CA'))
        dataArray[0].y.push(entry.distance)
      })
    }
    setData(dataArray)
  } 

  
  return (
    <SafeAreaView style={globalStyles.darkView} >
      <StatusBar barStyle={'light-content'} /> 
      <Header title="Overview" navigation={props.navigation}/>
      <View style={globalStyles.lightView}>
        <Title title={shownEvent}/>
        <SingleDrop data={getEvents()} value={eventSelected} setValue={event => setEventSelected(event)} placeholder="Select an Event"/>
        
        <Divider/>
        
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>

        <Text style={styles.smallHeader}>Calendar</Text>
        <Dates
          onDayPress={day => { getSelectedDayEvents(day.dateString)}}
          onMonthChange={month => {getMonthMarkedDates(month.month)}}
          markedDates={markedDates}
        />
        {eventSelected == "" ? <></>:
          allDistances[eventSelected].map((element, index) => <View key={index}>
            {new Date(element.date.seconds*1000).toLocaleDateString() === selectedDate ?
              <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate('MoreInfo', {event:eventSelected+"Meet", info:allDistances[eventSelected].find(object => object.id === element.id)})}>
              <Text style={styles.title}>{eventSelected}</Text>
              {element.formatedDistances.map((distance, index) =>
                <View key={index} style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {paddingLeft: 20,}]}>THROW {(index+1)}: </Text>
                  <Text style={styles.text}>{distance.distance}</Text>
                </View>
              )}
              </TouchableOpacity>
            :<></>}
        </View>)}


        <Divider/>
        <Text style={styles.smallHeader}>Personal Record</Text>
        <Table event={eventSelected} tableData={tableData} tableHeader={["WEIGHT", "DISTANCE", "DATE"]} navigation={props.navigation}/>

        <Divider/>
        <Text style={styles.smallHeader}>Tracking</Text>
        <Graph data={data}/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  hammerMeet: store.userState.hammerMeet,
  hammerMeetBest: store.userState.hammerMeetBest,
  discusMeet: store.userState.discusMeet,
  discusMeetBest: store.userState.discusMeetBest,
  shotPutMeet: store.userState.shotPutMeet,
  shotPutMeetBest: store.userState.shotPutMeetBest,
  weightMeet: store.userState.weightMeet,
  weightMeetBest: store.userState.weightMeetBest,
})

export default connect(mapStateToProps, null)(MeetOverview);

const styles = StyleSheet.create({
  smallHeader:{
    fontFamily: "regular",
    color: darkGrey,
    fontSize: 30,
    marginLeft:10
  },
  container:{
    backgroundColor:lightGrey,
    borderRadius:10,
    padding:10,
    width:"90%",
    alignSelf:'center',
    margin:5
  },
  text:{
    fontFamily: "regular",
    color: darkGrey,
    fontSize: 18,
  },
  title:{
    fontFamily: "semiBold",
    color: darkGrey,
    fontSize: 18,
    textTransform: 'uppercase'
  }
});
