import React, { Component }from 'react';
import {StatusBar, SafeAreaView, View, StyleSheet, TextInput, Modal, Text, TouchableOpacity, ScrollView} from 'react-native'
import firebase from "firebase/compat"
import {MaterialIcons} from '@expo/vector-icons';


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
  fetchDiscusDistances, 
  fetchHammerMeetDistances,
  fetchDiscusMeetDistances, 
  fetchHammerDistances, 
  fetchShotPutDistances,
  fetchShotPutMeetDistances, 
  fetchWeightDistances, 
  fetchWeightMeetDistances
} from '../redux/actions/index'

import { allImplements, globalStyles, lightGrey, darkGrey, orange } from '../Shared/Global';
import Header from '../Shared/Components/Header';
import Tabs from '../Shared/Components/Tabs'
import SingleDrop from '../Shared/Components/SingleDrop'
import Checkbox from '../Shared/Components/Checkbox'
import InputText from '../Shared/Components/InputText'
import SubmitButton from '../Shared/Components/SubmitButton';
import Dates from '../Shared/Components/Dates';
import Alert from '../Shared/Components/Alert';

/*
  Add Data Screen:
		Displays form that allows users to enter new meet or practice data.
*/
export class AddData extends Component {
  constructor(props){
    super(props);
    this.currentUser = props.currentUser

    this.state = {
      eventSelected:"",
      meet:0,
      date: new Date().toLocaleDateString('en-US', {timeZone: 'UTC'}),
      notes: "",
      numImplements:3,
      practiceDistance:Array(3).fill({distance: "", implement: ""}),
      numThrows:6,
      meetDistance: Array(6).fill({distance: "", selected: false}),
      modalVisible:false,
      showAlert: false,
      title:"",
      message:"",
    }
    this.saveData = this.saveData.bind(this)
    this.errorCheck = this.errorCheck.bind(this)
    this.formatedDistances = this.formatedDistances.bind(this)
  }

  //Format the events of the user
  getEvents(){
    var events = [];
    (this.currentUser.events).forEach(element => {
      events.push({id: element})
    })
    return events
  }

  //Check that all information is filled out
  errorCheck() {
    const {meet, eventSelected, practiceDistance, meetDistance} = this.state;
    if(eventSelected==""){
      this.setState({title:"No Event Selected", showAlert:true,
        message:"Please select an event."})
        return true
    }
    if(meet){
      for (let index = 0; index < meetDistance.length; index++) {
        if(meetDistance[index].distance==""&&meetDistance[index].selected==false){
          this.setState({title:"Missing Distance", showAlert:true,
            message:"Please enter the missing distance."})
          return true
        }
      }
    }else {
      for (let index = 0; index < practiceDistance.length; index++) {
        if(practiceDistance[index].distance==""){
          this.setState({title:"Missing Distance", showAlert:true,
            message:"Please enter the missing distance."})
          return true
        }else if(practiceDistance[index].implement==""){
          this.setState({title:"Implement Missing", showAlert:true,
            message:"Please select the missing implement."})
          return true
        }
      }
    }
    return false
  }

  //Format the distances for the database
  formatedDistances() {
    const {meet, numThrows, meetDistance} = this.state;
    var formatedDistances = [];
    if(meet){
      for (let index = 0; index < numThrows; index++) {
        if(meetDistance[index].selected){
          formatedDistances[index] = {distance:"Foul"}
        }else{
          formatedDistances[index] = {distance:parseFloat(meetDistance[index].distance)}
        }
      }
    }
    return formatedDistances
  }

  //Reload the collection from the database
  fetchData(collectionName){
    switch(collectionName) {
      case 'Hammer':
        this.props.fetchHammerDistances()
        break;
      case 'HammerMeet':
        this.props.fetchHammerMeetDistances()
        break;
      case 'Weight':
        this.props.fetchWeightDistances()
        break;
      case 'WeightMeet':
        this.props.fetchWeightMeetDistances()
        break;
      case 'Discus':
        this.props.fetchDiscusDistances()
        break;
      case 'DiscusMeet':
        this.props.fetchDiscusMeetDistances()
        break;
      case 'Shot Put':
        this.props.fetchShotPutDistances()
        break;
      case 'Shot PutMeet':
        this.props.fetchShotPutMeetDistances()
        break;
      default: 
        console.log("Error fetching data")
        console.log(collectionName)
      break;
    }
  }

  //Save the data to the database
  saveData() {
    const {meet, eventSelected, date, notes} = this.state;
    
    if(!this.errorCheck()){
      var collectionName = eventSelected;
      var formatedDistances;
      if(meet){
        formatedDistances = this.formatedDistances()
        collectionName += "Meet"
      }else{
        var formatedDistances =[]
        for (let index = 0; index < this.state.numImplements; index++) {
          formatedDistances.push({distance:parseFloat(this.state.practiceDistance[index].distance), implement:this.state.practiceDistance[index].implement})
        }
      }

      firebase.firestore().collection(collectionName).doc(firebase.auth().currentUser.uid)
      .collection("userDistances").add({date:new Date(date), formatedDistances, notes})
      .then(this.fetchData(collectionName))
      .then(this.props.navigation.pop())
    }
  }

  render(){
    return (
      <SafeAreaView style={globalStyles.darkView}>
      <StatusBar barStyle={'light-content'} /> 
      <Header title="Add Info" navigation={this.props.navigation}/>
      <View style={globalStyles.lightView}>
        <Tabs values={["Practice", "Meet"]} index={this.state.meet} 
          setIndex={meet=>{
            if(meet) {
              this.setState({meet:meet})
            }else{
               this.setState({meet:meet})
            }
          }}/>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <SingleDrop data={this.getEvents()} value={this.state.eventSelected} placeholder="Select an event"
            setValue={event => {
              this.setState({eventSelected:event})
            }}/>
              
          <TouchableOpacity style={styles.dateContainer} onPress={()=>this.setState({modalVisible:true})}>
              <Text style={styles.date}>Date: {this.state.date}</Text>
              <MaterialIcons style={styles.arrow} name='keyboard-arrow-down'/>
            </TouchableOpacity>

            <Modal transparent={true} visible={this.state.modalVisible}>
            <View style={{top:140, width:'100%', position:'absolute'}}>
              <Dates style={styles.modal} onDayPress={day => {this.setState({
                date:new Date(day.dateString).toLocaleDateString('en-US', {timeZone: 'UTC'}), 
                modalVisible:false
              })}}/>
            </View>
            </Modal>
          
          {this.state.meet ?
            <View>
              <SingleDrop data={[{id: 3}, {id: 6}]} placeholder="Number of Throws" width={"65%"}
                setValue={numThrows => 
                this.setState({numThrows, meetDistance: Array(numThrows).fill({distance: "", selected: false})})}/>

              {[...Array(this.state.numThrows)].map((distance, index)=> (
                <View key={index} style={styles.rows}>
                  <InputText placeholder='Distance' width='40%'
                    onChangeText={(distance) => {
                      this.state.meetDistance[index] = {distance:distance, selected:this.state.meetDistance[index].selected}
                      this.setState(this.state.meetDistance)
                    }} 
                    disable={!this.state.meetDistance[index].selected}
                    value={this.state.meetDistance[index].selected?"":this.state.meetDistance[index].distance}
                  />
                  <Checkbox title="FOUL" index={index} width={95}
                    arrayObjects={this.state.meetDistance} 
                    onPress={() => {
                      this.state.meetDistance[index] = {distance:"", selected: !this.state.meetDistance[index].selected}
                      this.setState({meetDistance:this.state.meetDistance})
                    }} 
                  />

                </View>
              ))}
            </View>
          :  
            <View>
              <SingleDrop data={[{id: 1}, {id: 2}, {id: 3}, {id: 4}]} placeholder="Number of Implements"
                width={"65%"} setValue={numImplements =>
                  this.setState({
                    numImplements, 
                    practiceDistance: Array(numImplements).fill({distance: "", implement: ""})
                  })
                }/>

              {[...Array(this.state.numImplements)].map((holder, index) => (
                <View key={index} style={styles.rows}>
                  <SingleDrop data={this.state.eventSelected!=""? allImplements[this.currentUser.gender][this.state.eventSelected]:[]} placeholder="Implement" width='40%' value={this.state.practiceDistance[index].implement}
                    setValue={implement => {
                      this.state.practiceDistance[index] = {distance:this.state.practiceDistance[index].distance, implement:implement}
                      this.setState(this.state.practiceDistance)}}
                  />
                  <InputText placeholder='Distance' width='40%'
                    onChangeText={(distance) => {
                      this.state.practiceDistance[index] = {distance:distance, implement:this.state.practiceDistance[index].implement}
                      this.setState(this.state.practiceDistance)
                    }} 
                    value={this.state.practiceDistance[index].distance}
                  />
                </View>
              ))}
            </View>
          }
          
          <TextInput style={styles.textInput} placeholder='Notes' 
            onChangeText={(notes) => this.setState({notes})} multiline={true}/>

          <SubmitButton text="SAVE" onPress={this.saveData}/>
        </ScrollView>
        <Alert showAlert={this.state.showAlert} 
          message={this.state.message} 
          title={this.state.title}
          setShowAlert={() => this.setState({showAlert:false})}/>
      </View>
    </SafeAreaView>
  )
  }
}

const mapStateToProps = (store) => ({currentUser: storeuserState.currentUser})
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchWeightDistances,
  fetchHammerDistances,
  fetchShotPutDistances,
  fetchDiscusDistances,
  fetchHammerMeetDistances,
  fetchDiscusMeetDistances,
  fetchShotPutMeetDistances,
  fetchWeightMeetDistances
}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(AddData);

const styles = StyleSheet.create({
  rows: {
		flexDirection: 'row',
    justifyContent:'center'
	},
  textInput:{
    backgroundColor:lightGrey,
    height:140,
    width:'90%',
    borderRadius:10,
    alignSelf:'center',
    color: darkGrey,
    fontSize: 18,
    fontFamily: "regular",
    padding:7,
    margin:10,
    textAlignVertical: 'top'
  },
  dateContainer: {
		width:'90%',
    height:40,
    borderWidth:1,
    borderColor:darkGrey,
    borderRadius:10,
    alignSelf:'center',
    flexDirection: 'row',
    margin:5
	},
  date:{
    fontFamily:'regular',
    fontSize: 16,
    marginLeft:12,
    marginVertical:10
  },
  arrow:{
    position:'absolute',
    right:12,
    alignSelf:'center',
    borderWidth: 1,
    borderColor: darkGrey,
    color: darkGrey,
    fontSize: 18
  },
  modal:{
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});