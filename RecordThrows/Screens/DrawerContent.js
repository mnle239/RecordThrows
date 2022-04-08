import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { connect } from 'react-redux'

import {darkGrey, light} from '../Shared/Global'

/*
  Drawer Navigation Screen:
		Displays some account information of the current user. Also displays navigation options.
*/
function DrawerContent(props) {
    const {currentUser} = props
		if(currentUser == undefined){
			return(<View></View>)
		}
		return (
			<SafeAreaView style={styles.drawer}>
				<Text style={styles.name}>{currentUser.name}</Text>
				<Text style={styles.info}>{currentUser.email}</Text>
				<View style={styles.divide}></View>

				<TouchableOpacity style={styles.container} onPress={()=>{props.navigation.navigate('Profile')}}>
					<MaterialIcons style={styles.link} name='person'/>
					<Text style={styles.link}>Profile</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.container} onPress={()=>{props.navigation.navigate('Calendar')}}>
					<MaterialIcons style={styles.link} name='date-range'/>
					<Text style={styles.link}>Calendar</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.container} onPress={()=>{props.navigation.navigate('PersonalRecords')}}>
					<MaterialIcons style={styles.link} name='view-week'/>
					<Text style={styles.link}>Personal Records</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.container} onPress={()=>{props.navigation.navigate('Tracking')}}>
					<MaterialIcons style={styles.link} name='trending-up'/>
					<Text style={styles.link}>Tracking</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
}

const mapStateToProps = (store) => ({ currentUser: store.userState.currentUser })
export default connect(mapStateToProps, null)(DrawerContent);

const styles = StyleSheet.create({
	link: {
		fontFamily: "medium",
		color: light,
		fontSize: 20,
		textTransform: 'uppercase',
		paddingLeft:10,
		paddingVertical:10,
		alignSelf: 'center',
	},
	name: {
		fontFamily: "semiBold",
		color: light,
		fontSize: 30,
		marginLeft:10,
	},
	info: {
		fontFamily: "light",
		color: light,
		fontSize: 16,
		marginLeft:10,
	},
	drawer: {
		backgroundColor: darkGrey,
		flex: 1,
	},
	container: {
		flexDirection: 'row',
	}, 
	divide: {
    height:3,
    width:'98%',
    borderRadius:100,
    backgroundColor: light,
    alignSelf:'center',
    margin:10
  },
});