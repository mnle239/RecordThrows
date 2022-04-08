import React, { Component } from 'react';
import {StatusBar, ScrollView, StyleSheet, SafeAreaView, View, Text, TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUser, 
  fetchDiscusDistances, 
  fetchHammerMeetDistances,
  fetchDiscusMeetDistances, 
  fetchHammerDistances, 
  fetchShotPutDistances,
  fetchShotPutMeetDistances, 
  fetchWeightDistances, 
  fetchWeightMeetDistances } from '../redux/actions/index'
import Header from '../Shared/Components/Header';
import {darkGrey, light, globalStyles} from '../Shared/Global';
import Logo from '../Shared/Logo';

/*
  Home Screen:
		Displays logo and links to overview pages.
*/
export class Home extends Component {
  componentDidMount(){
    this.props.fetchUser()
    this.props.fetchDiscusDistances()
    this.props.fetchHammerDistances()
    this.props.fetchShotPutDistances()
    this.props.fetchWeightDistances()
    this.props.fetchHammerMeetDistances()
    this.props.fetchShotPutMeetDistances()
    this.props.fetchWeightMeetDistances()
    this.props.fetchDiscusMeetDistances()
  }
  render() {
    const {currentUser} = this.props
    
    if(currentUser == undefined){
      return(<View></View>)
    }else{
      var buttons = []
      buttons = currentUser.events
    }

    return (
      <SafeAreaView style={globalStyles.darkView}>
        <StatusBar barStyle={'light-content'} /> 
        <Header title="HOME" navigation={this.props.navigation}/>
        <View style={[globalStyles.lightView,styles.container]}>
          <View style={styles.logo}><Logo/></View>
    
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
            {buttons.map((item, index) => (
              <TouchableOpacity style={styles.navBox} key={index} onPress={() => this.props.navigation.navigate('Overview', item)} >
                <Text style={styles.text}>{item}</Text>
                <MaterialIcons style={[styles.arrow, styles.text]} name='arrow-forward-ios'/>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.navBox} onPress={() => this.props.navigation.navigate('MeetOverview')} >
              <Text style={styles.text}>Meet Day</Text>
              <View style={styles.arrow}>
                <MaterialIcons style={styles.text} name='arrow-forward-ios'/>
              </View>
            </TouchableOpacity>
          </ScrollView>

        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    alignSelf:'center',
  },
  logo:{
    alignSelf:'center',
    marginTop:10
  },
  arrow:{
    right:10,
    alignSelf:'center',
    position: "absolute",
  },
  navBox: {
    backgroundColor: darkGrey,
    borderRadius: 10,
    width: "90%",
    height: 90,
    justifyContent: "center",
    flexDirection: 'row',
    marginTop:10,
    alignSelf: 'center',
  },
  text: {
    color: light,
    fontSize: 35,
    fontFamily: "bold",
    alignSelf:'center',
    textTransform: 'uppercase'
  },
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
  
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchUser,
  fetchWeightDistances,
  fetchHammerDistances,
  fetchShotPutDistances,
  fetchDiscusDistances,
  fetchHammerMeetDistances,
  fetchDiscusMeetDistances,
  fetchShotPutMeetDistances,
  fetchWeightMeetDistances
}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Home);