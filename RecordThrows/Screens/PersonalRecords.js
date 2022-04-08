import React, { useState } from 'react';
import {StatusBar, SafeAreaView, ScrollView, View} from 'react-native'


import { connect } from 'react-redux'

import Header from '../Shared/Components/Header';
import Tabs from '../Shared/Components/Tabs';
import Title from '../Shared/Components/Title';
import Table from '../Shared/Components/Tables';

import {globalStyles} from '../Shared/Global'

/*
  Personal Records Screen:
		Displays personal records for each implement for the selected event.
*/
function PersonalRecords (props) {
  const [eventIndex, setEventIndex] = useState(0);
  var events = props.currentUser.events

  //Object that contains all practice distance information from database
  const bestObj = {
    "Hammer":props.hammerBest,
    "Discus":props.discusBest,
    "Weight":props.weightBest, 
    "Shot Put":props.shotPutBest
  }

  //Object that contains all practice personal records
  const meetBest = {
    "Hammer": props.hammerMeetBest,
    "Discus": props.discusMeetBest,
    "Shot Put": props.shotPutMeetBest,
    "Weight": props.weightMeetBest,
  }
  
  //Find meet day PR
  const tableData = [];
  var farthestThrow = {distance:0, date:0, id:0}
  meetBest[events[eventIndex]].forEach(element => {
    if(parseInt(element.distance) > farthestThrow.distance){
      farthestThrow = element
    }
  });
  //Add meet day PR to the Table
  if(farthestThrow.distance != 0){
    tableData.push(["Meet PR", farthestThrow.distance, new Date(farthestThrow.date.seconds *1000).toLocaleDateString(), farthestThrow.id])
  }

  //Add all other PRs to the table
  const best = bestObj[events[eventIndex]]
  if(best != undefined){
    for (let i = 0; i < best.length; i += 1) {
      const rowData = [best[i].implement, best[i].distance, new Date(best[i].date *1000).toLocaleDateString(), best[i].id];
      tableData.push(rowData);
    }
  }
  
  return (
    <SafeAreaView style={globalStyles.darkView}>
      <StatusBar barStyle={'light-content'} /> 
      <Header title="Records" navigation={props.navigation}/>
      <View style={globalStyles.lightView}>
        <Tabs values={events} index={eventIndex} setIndex={setEventIndex}/>
        <Title title={events[eventIndex]}/>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Table event={events[eventIndex]} tableData={tableData} tableHeader={["WEIGHT", "DISTANCE", "DATE"]} navigation={props.navigation} />
        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  hammerBest: store.userState.hammerBest,
  discusBest: store.userState.discusBest,
  shotPutBest: store.userState.shotPutBest,
  weightBest: store.userState.weightBest,
  hammerMeetBest: store.userState.hammerMeetBest,
  discusMeetBest: store.userState.discusMeetBest,
  weightMeetBest: store.userState.weightMeetBest,
  shotPutMeetBest: store.userState.shotPutMeetBest
})
export default connect(mapStateToProps, null)(PersonalRecords);
