import React, { useState, useEffect } from 'react';
import {StatusBar, SafeAreaView, View} from 'react-native'
import { connect } from 'react-redux'

import {allImplements, globalStyles, orange} from '../Shared/Global';
import Header from '../Shared/Components/Header';
import Tabs from '../Shared/Components/Tabs';
import MultiDrop from '../Shared/Components/MultiDrop';
import Title from '../Shared/Components/Title';
import Graph from '../Shared/Components/Graph';

/*
  Tracking Screen:
		Displays a graph of data by selected event and implementes.
*/
function Tracking (props) {
  const {currentUser} = props;
  const events = currentUser.events

  const [implementSelected, setImplementSelected] = useState([])
  const [eventIndex, setEventIndex] = useState(0);
  const [data, setData] = useState([[],[]])

  //colors displayed on the graph
  const lineColors =  ['#F79256', '#7DCFB6','#00B2CA', '#1D4e89', orange]

  //Object that contains all pracitce distances in the database
  const allDistances = {
    "Hammer":props.hammer,
    "Discus":props.discus,
    "Weight":props.weight, 
    "Shot Put":props.shotPut,
  }

  //Object that contains the best throw from each meet recorded
  const meetBest = {
    "Hammer": props.hammerMeetBest,
    "Discus": props.discusMeetBest,
    "Shot Put": props.shotPutMeetBest,
    "Weight": props.weightMeetBest,
  }

  //Update the infomation displayed on the graph
  const updateGraph = () => {
    var dataArray = []

    implementSelected.forEach((implement,index) => {

      //Push line information 
      dataArray.push({
        x: [], y: [], type: "scatter", mode: "lines+markers", name: implementSelected[index], 
        line: {width: 3, color: lineColors[index]}, marker: {line: {width: 2, color: lineColors[index]}}
      })

      if(implement == "MEET DAY"){
        //Add meet day information
        meetBest[events[eventIndex]].forEach(entry=>{
          if(entry != undefined){
            dataArray[index].x.push(new Date(entry.date.seconds *1000).toLocaleString('fr-CA'))
            dataArray[index].y.push(entry.distance)
          }
        })
      }else{
        //add practice distance information 
        allDistances[events[eventIndex]].forEach(entry=>{
          if(entry.formatedDistances.some(element => implement === element.implement)){
            dataArray[index].x.push(new Date(entry.date.seconds *1000).toLocaleString('fr-CA'))
            dataArray[index].y.push(entry.formatedDistances.find(element => implement === element.implement).distance)
          }
        })
      }

    });

    setData(dataArray)
  } 

  //Update the graph if implementSelected is changed
  useEffect(() => {updateGraph()}, [implementSelected])

  //Update the implementSelected if the event selected has changed
  useEffect(() => {setImplementSelected([])}, [events[eventIndex]])

  return (
    <SafeAreaView style={globalStyles.darkView} >
      <StatusBar barStyle={'light-content'} /> 
      <Header title="Tracking" navigation={props.navigation}/>
      <View style={globalStyles.lightView}>
        <Tabs values={events} index={eventIndex} setIndex={setEventIndex}/>
        <Title title={events[eventIndex]}/>
        <MultiDrop data={[{id:"MEET DAY"}, ...allImplements[currentUser.gender][events[eventIndex]]]} values={implementSelected} setValues={setImplementSelected} placeholder="Select Implements"/>
        <Graph data={data}/>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  hammer: store.userState.hammer,
  discus: store.userState.discus,
  shotPut: store.userState.shotPut,
  weight: store.userState.weight,
  hammerMeetBest: store.userState.hammerMeetBest,
  discusMeetBest: store.userState.discusMeetBest,
  weightMeetBest: store.userState.weightMeetBest,
  shotPutMeetBest: store.userState.shotPutMeetBest
})
export default connect(mapStateToProps, null)(Tracking);