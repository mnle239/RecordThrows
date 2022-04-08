import React, { useState, useEffect } from 'react';
import {StatusBar, SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'

import { connect } from 'react-redux'

import Header from '../Shared/Components/Header';
import Title from '../Shared/Components/Title';
import Divider from '../Shared/Components/Divider';
import MultiDrop from '../Shared/Components/MultiDrop';
import { allImplements, darkGrey, globalStyles, light, lightGrey, orange } from '../Shared/Global';
import Dates from '../Shared/Components/Dates';
import Table from '../Shared/Components/Tables';
import Graph from '../Shared/Components/Graph';

/*
  Overview Screen:
		Displays overview information for Practice information.
*/

function Overview (props) {
  const shownEvent = props.route.params
  const {currentUser} = props
  const [selected, setSelected] = useState([])
  const [data, setData] = useState([[],[]])
  const [dates, setDates] = useState({})
  const [markedDates, setMarkedDates] = useState({...dates})
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US', {timeZone: 'UTC'}))

  //Colors for calendar
  const selectColors = [{key:'firstSelect', color: '#7DCFB6'},
    {key:'secondSelect', color: '#00B2CA'},
    {key:'thirdSelect', color: '#1D4e89'},
    {key:'forthSelect', color: '#F79256'},
    {key:'fifthSelect', color: orange}]
  
  //colors for graph
  const lineColors =  ['#7DCFB6','#00B2CA', '#1D4e89', '#F79256', orange]

  //Object that contains all practice PRs
  const bestObj = {
    "Hammer":props.hammerBest,
    "Discus":props.discusBest,
    "Weight":props.weightBest, 
    "Shot Put":props.shotPutBest
  }

  //Object that contains all practice distances
  const allDistances = {
    "Hammer":props.hammer,
    "Discus":props.discus,
    "Weight":props.weight, 
    "Shot Put":props.shotPut
  }

  //Implement list shown in practice form
  var implementlist = allImplements[currentUser.gender][shownEvent]

  //Add PR information to table
  const tableData = [];
  const best = bestObj[shownEvent]
  if(best != undefined){
    for (let i = 0; i < best.length; i += 1) {
      if(selected.some((implement) => implement === best[i].implement)){
        const rowData = [best[i].implement, best[i].distance, new Date(best[i].date *1000).toLocaleDateString(),best[i].id];
        tableData.push(rowData);
      }
    }
  }

  //get the selected day and display it orange
  const getSelectedDayEvents = date => {
    setSelectedDate(new Date(date).toLocaleDateString('en-US', {timeZone: 'UTC'}))
    setMarkedDates({...dates, [date]:{ selected: true, selectedColor: orange, textColor: light }})
  };

  //For each entry that matches the shown month and the implement selected, add multidot information to date
  const getMonthMarkedDates = (month) => {
    let holder = {};
      allDistances[shownEvent].forEach(element => {
        element.formatedDistances.forEach(distancePair =>{
          const index = selected.findIndex(select => select === distancePair.implement)
          if(new Date(element.date.seconds*1000).getMonth()+1 == month && index != -1){
            let date= new Date(element.date.seconds*1000).toLocaleDateString('fr-CA')
            if(holder.hasOwnProperty(date) && !holder[date].dots.some((type) => type === selectColors[index])){
              holder[date].dots.push(selectColors[index])
            }else if(!holder.hasOwnProperty(date)){
              holder = {...holder, [date]: {dots: [selectColors[index]]}}
            }
          }
        })
    })
    setDates({...holder})
    setMarkedDates({...holder})
  }

  //update the calendat and the graph based on implements selected
  useEffect(() => {
    getMonthMarkedDates(new Date().getMonth()+1)
    updateGraph()
  }, [selected])


  //update the graph
  const updateGraph = () => {
    var dataArray = []
    selected.forEach((implement,index) => {
      //Add line info
      dataArray.push({
        x: [], y: [], type: "scatter", mode: "lines+markers", name: selected[index],
        line: {width: 3, color: lineColors[index]}, marker: {line: {width: 2, color: lineColors[index]}}
      })

      //Add x and y values to line
      allDistances[shownEvent].forEach(entry=>{
        if(entry.formatedDistances.some(element => implement === element.implement)){
          dataArray[index].x.push(new Date(entry.date.seconds *1000).toLocaleString('fr-CA'))
          dataArray[index].y.push(entry.formatedDistances.find(element => implement === element.implement).distance)
        }
      })
    });
    setData(dataArray)
  } 
  
  return (
    <SafeAreaView style={globalStyles.darkView} >
      <StatusBar barStyle={'light-content'} /> 
      <Header title="Overview" navigation={props.navigation}/>
      <View style={globalStyles.lightView}>
        <Title title={shownEvent}/>
        <MultiDrop data={implementlist} values={selected} setValues={setSelected} placeholder="Select an Implement"/>
        
        <View style={styles.keyContainer1}>
          <View style={styles.keyContainer2}>
          {selected.map((implement, index) => <>
            <View key={index} style={[styles.keyDots,{backgroundColor:lineColors[index]}]}></View>
            <Text style={styles.text}>{implement}</Text>
          </> )}
          </View>
        </View>
        <Divider/>
        
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>

        <Text style={styles.smallHeader}>Calendar</Text>
        <Dates
          onDayPress={day => { getSelectedDayEvents(day.dateString)}}
          onMonthChange={month => {getMonthMarkedDates(month.month)}}
          markedDates={markedDates}
        />

        {allDistances[shownEvent].map((element, index) => <View key={index}>
            {new Date(element.date.seconds*1000).toLocaleDateString() === selectedDate 
              && element.formatedDistances.some(distance => selected.includes(distance.implement)) ?
              <TouchableOpacity style={styles.container} onPress={()=>props.navigation.navigate('MoreInfo', {event:shownEvent, info:allDistances[shownEvent].find(object => object.id === element.id)})}>
              <Text style={styles.title}>{shownEvent}</Text>
              {element.formatedDistances.map((distancePair, index2) =>
                <View key={index2} style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {paddingLeft: 20,}]}>{distancePair.implement}:  </Text>
                  <Text style={styles.text}>{distancePair.distance}</Text>
                </View>
              )}
              </TouchableOpacity>
            :<></>}
        </View>)}


        <Divider/>
        <Text style={styles.smallHeader}>Personal Record</Text>
        <Table event={shownEvent} tableData={tableData} tableHeader={["WEIGHT", "DISTANCE", "DATE"]} navigation={props.navigation} />

        <Divider/>
        <Text style={styles.smallHeader}>Tracking</Text>
        <Graph data={data} showlegend={false}/>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  hammer: store.userState.hammer,
  hammerBest: store.userState.hammerBest,
  discus: store.userState.discus,
  discusBest: store.userState.discusBest,
  shotPut: store.userState.shotPut,
  shotPutBest: store.userState.shotPutBest,
  weight: store.userState.weight,
  weightBest: store.userState.weightBest,
})
export default connect(mapStateToProps, null)(Overview);

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
    margin:5,
    marginTop:10,
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
  },
  keyContainer1:{ 
    width:'90%', 
    margin:10
  },
  keyContainer2:{
    right:20, 
    position:'absolute',
    flexDirection:'row',
    justifyContent:'center'
  },
  keyDots:{
    height:15, 
    width:15, 
    marginLeft:10, 
    marginTop:4, 
    marginRight:5, 
    borderRadius:100
  }
});
