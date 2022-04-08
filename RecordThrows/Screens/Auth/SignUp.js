import React, { Component } from 'react';
import {SafeAreaView, View, Text, StyleSheet,ScrollView} from 'react-native'
import SegmentedControlTab from "react-native-segmented-control-tab";
import firebase from "firebase/compat"

import SubmitButton from '../../Shared/Components/SubmitButton';
import InputText from '../../Shared/Components/InputText';
import Checkbox from '../../Shared/Components/Checkbox'
import Logo from '../../Shared/Logo';
import Alert from '../../Shared/Components/Alert';

import { globalStyles, darkGrey, light } from '../../Shared/Global';

/*
  Signup Screen:
		Displays logo and allows user to enter profile data.
*/
export class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      genderIndex: 0,
      eventsSelected: [{title: 'Hammer', selected: false}, {title: 'Weight', selected: false},
        {title: 'Discus', selected: false}, {title: 'Shot Put', selected: false}],
      showAlert: false,
      title:"",
      message:"",
      cancelAction:"",
      cancelMessage:""
    }
    this.onSignUp = this.onSignUp.bind(this)
    this.setEventSelected = this.setEventSelected.bind(this)
  }

  errorCheck(events){
    const {email, password, name, confirmPassword} = this.state;
    if(name === ""){
      this.setState({title:"Name Missing", message:"No name entered. Please enter your name.",
        showAlert:true})
      return(true)
    }else if(email === ""){
      this.setState({title:"Email Missing", message:"No email entered. Please enter your email.",
        showAlert:true})
      return(true)
    }else if(events == ""){
      this.setState({title:"No Events Selected", message:"No events selected. Please select an event.",
        showAlert:true})
      return(true)
    }else if(password == "" || confirmPassword == ""){
      this.setState({title:"Password Missing", message:"No password entered. Please enter a password.",
        showAlert:true})
      return(true)
    }else if(password != confirmPassword){
      this.setState({title:"Password Incorrect", message:"Passwords do not match. Please try again.",
        showAlert:true})
      return(true)
    }
    return(false)
  }

  //create new user and log them in
  onSignUp(){
    const {email, password, name, genderIndex, eventsSelected} = this.state;

    var events = []
    eventsSelected.forEach(element => {
      if(element.selected == true){
        events = [...events, element.title]
      }
    });

    var gender = "Female"
    if(genderIndex == 1){ gender = "Male" }


    if(!this.errorCheck(events)){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid)
          .set({name, email, events, gender})
          .catch((error) => {
            firebase.auth().signInWithEmailAndPassword(email, password)
          })
        })
      .catch((error) => {
        console.log(error.code)
        switch(error.code) {
          case 'auth/invalid-email':
            this.setState({title:"Invalid Email", 
              message:"The email address entered is invalid. Please enter valid email.",
              showAlert:true})
            break;
          case 'auth/email-already-in-use':
            this.setState({title:"Email In Use",
              message:"The email address entered is already in use. If this is your account please login.",
              showAlert:true, cancelMessage:"Login",
              cancelAction:() => {this.props.navigation.navigate("Login")
              this.setState({showAlert:false})}
            })
            break;
          case 'auth/weak-password':
            this.setState({title:"Weak Password", 
              message:"Password must be at least 6 characters.",
              showAlert:true})
            break;
          default: 
            this.setState({title:"Error"})
            this.setState({message:"Please double check all entered information."})
            this.setState({showAlert:true})
            break;
        }
      })
    }
  }

  setEventSelected(eventArray){
    this.setState({eventsSelected: eventArray})
  }

  render() {
    return(
      <SafeAreaView style={globalStyles.authView}>
        <View style={styles.logo}><Logo/></View>
        
        <Text style={styles.title}>CREATE ACCOUNT</Text>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

          <InputText placeholder='Name' onChangeText={(name) => this.setState({name})} keyboard='default' value={this.state.name}/>
          <InputText placeholder='Email' onChangeText={(email) => this.setState({email})} keyboard='email-address' value={this.state.email}/>
          <View style = {styles.rows}>
            <InputText placeholder='Password' password={true}  width={145} value={this.state.password}
            onChangeText={(password) => this.setState({password})} keyboard='default'/>
            <InputText placeholder='Confirm' width={145} password={true} value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({confirmPassword})} keyboard='default'/>
          </View>

          <View>
            <SegmentedControlTab
              values={["Female", "Male"]}
              selectedIndex={this.state.genderIndex}
              onTabPress={(genderIndex) => this.setState({genderIndex})}
              tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabStyle={styles.activeTabStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
            />
            <View style = {styles.rows}>
              <Checkbox index={0} arrayObjects={this.state.eventsSelected} setArray={this.setEventSelected}/>
              <Checkbox index={1} arrayObjects={this.state.eventsSelected} setArray={this.setEventSelected}/>
            </View>
            <View style = {styles.rows}>
              <Checkbox index={3} arrayObjects={this.state.eventsSelected} setArray={this.setEventSelected}/>
              <Checkbox index={2} arrayObjects={this.state.eventsSelected} setArray={this.setEventSelected}/>
            </View>
          </View>
          <SubmitButton text="SIGN UP" onPress={this.onSignUp}/>
          <View style={styles.rows}>
            <Text style={styles.text}>Have an account? </Text>
            <Text style={styles.link} onPress={() => this.props.navigation.navigate("Login")}>Sign In</Text>
          </View>
        </ScrollView>
        <Alert showAlert={this.state.showAlert} 
          message={this.state.message} 
          title={this.state.title}
          setShowAlert={() => this.setState({showAlert:false})}
          cancelAction={this.state.cancelAction}
          cancelMessage={this.state.cancelMessage}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "bold",
    color: darkGrey,
    fontSize: 29,
    alignSelf:'flex-start',
    marginLeft:40
  },
  logo:{
    marginVertical:50,
  },
  text: {
    fontFamily: "light",
    color: darkGrey,
    fontSize: 16,
  },
  link: {
    fontFamily: "light",
    color: darkGrey,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  rows: {
		flexDirection: 'row',
    alignSelf:'center'
	},
  tabsContainerStyle:{
    width: 270,
    alignSelf: 'center',
    marginTop:7,
    marginBottom:12
  },
  tabStyle: {
    backgroundColor: light,
    borderWidth:1,
    borderColor:darkGrey,
  },
  tabTextStyle: {
    fontFamily: "medium",
    color: darkGrey,
    fontSize: 16,
  },
  activeTabStyle: {
    backgroundColor: darkGrey,
    borderWidth: 1,
    borderColor: darkGrey,
  },
  activeTabTextStyle: {
    fontFamily: "semiBold",
    color: light,
    fontSize: 16,
  },
})

export default SignUp;
