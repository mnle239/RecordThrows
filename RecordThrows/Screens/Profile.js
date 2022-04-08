import React from 'react';
import {StatusBar, SafeAreaView, View, Text, FlatList, StyleSheet} from 'react-native'
import firebase from "firebase/compat"
require('firebase/firestore')
import { connect } from 'react-redux'

import Header from '../Shared/Components/Header';
import {globalStyles, darkGrey, lightGrey} from '../Shared/Global'
import SubmitButton from '../Shared/Components/SubmitButton'
import Title from '../Shared/Components/Title'

/*
  Profile Screen:
		Displays all information on the given user.
*/
function Profile (props) {
  const {currentUser} = props

  //Logout current user
  const onLogout = async () => { firebase.auth().signOut() }

  return(
    <SafeAreaView style={globalStyles.darkView}>
      <StatusBar barStyle={'light-content'} /> 
      <Header title="Profile" navigation={props.navigation}/>
      <View style={globalStyles.lightView}>

        <Title title={currentUser.name}/>
        <View style={[styles.box, {margin:10,padding:5}]}>
          <Text style={styles.smallHeader}>Account Information</Text>
          <Text style={styles.text}>Email: {currentUser.email}</Text>
          <Text style={styles.text}>Gender: {currentUser.gender}</Text>
          <Text style={styles.text}>Events:</Text>

          <View style={[styles.box, {paddingBottom:5}]}>
            <FlatList data={currentUser.events} renderItem={({item}) => (
              <Text style={styles.text}>{item}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}/>
          </View>
          
        </View>
        <SubmitButton text="logout" onPress={() => onLogout()} title="Logout"/>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = (store) => ({currentUser: store.userState.currentUser})
export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  smallHeader:{
    fontFamily: "medium",
    color: darkGrey,
    fontSize: 25,
    marginLeft: 10
  },
  box:{
    backgroundColor:lightGrey,
    borderRadius:10,
    width:'80%',
    alignSelf:'center',
  },
  text:{
    fontFamily: "regular",
    color: darkGrey,
    fontSize: 18,
    marginLeft:20
  }
});