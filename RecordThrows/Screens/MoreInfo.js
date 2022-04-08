import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native'
import { connect } from 'react-redux'

import Header from '../Shared/Components/Header';
import Title from '../Shared/Components/Title';
import {globalStyles, darkGrey, lightGrey} from '../Shared/Global'

/*
  More Information Screen:
		Displays all information on the given entry
*/
function MoreInfo (props) {

  //Objects with all entered distances
  const allDistances = {
    "Hammer":props.hammer,
    "Discus":props.discus,
    "Weight":props.weight, 
    "Shot Put":props.shotPut,
    "HammerMeet":props.hammerMeet,
    "DiscusMeet":props.discusMeet,
    "WeightMeet":props.weightMeet, 
    "Shot PutMeet":props.shotPutMeet
  }

  var info = props.route.params.info
  //If info has id of entry, find the entry info
  if(props.route.params.info[3]){
    info = allDistances[props.route.params.event].find(entry => entry.id === props.route.params.info[3])
  }

  return (
    <SafeAreaView style={globalStyles.darkView}>
      <StatusBar barStyle={'light-content'} /> 
      <Header title="More Info" navigation={props.navigation}/>
      <View style={globalStyles.lightView}>

        <Title title={props.route.params.event.replace("Meet"," Meet")}/>
        <Text style={styles.smallHeader}>{new Date(info.date.seconds *1000).toLocaleDateString()}</Text>
        <View style={styles.box}>
          <Text style={styles.notesHeader}>Distances</Text>
          <FlatList data={info.formatedDistances} renderItem={({item, index}) => (
            <View style={styles.row}>
              <Text style={styles.text}>{item.implement? item.implement: "THROW "+(index+1)}:</Text>
              <Text style={styles.text}>{item.distance}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}/>
        </View>
        <View style={styles.box}>
          <Text style={styles.notesHeader}>NOTES</Text>
          <Text style={styles.text}>{info.notes}</Text>
        </View>
        
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
  hammerMeet: store.userState.hammerMeet,
  discusMeet: store.userState.discusMeet,
  weightMeet: store.userState.weightMeet,
  shotPutMeet: store.userState.shotPutMeet
})
export default connect(mapStateToProps, null)(MoreInfo);

const styles = StyleSheet.create({
  smallHeader:{
    fontFamily: "regular",
    color: darkGrey,
    fontSize: 20,
    marginLeft: 20
  },
  notesHeader:{
    fontFamily: "semiBold",
    color: darkGrey,
    fontSize: 20,
    textTransform: 'uppercase'
  },
  box:{
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
    marginLeft:20
  }, 
  row:{
    flexDirection: 'row',
  }
});