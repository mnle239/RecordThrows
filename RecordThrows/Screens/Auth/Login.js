import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native'
import firebase from "firebase/compat"

import SubmitButton from '../../Shared/Components/SubmitButton';
import Logo from '../../Shared/Logo';
import InputText from '../../Shared/Components/InputText';
import { globalStyles, darkGrey} from '../../Shared/Global';
import Alert from '../../Shared/Components/Alert';

/*
  Login Screen:
		Login user with email and password.
*/
export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      showAlert: false,
      title:"",
      message:"",
      cancelAction:"",
      cancelMessage:""
    }
    this.onLogin = this.onLogin.bind(this)
  }

  //error check the information entered
  errorCheck(errorCode){
    switch(errorCode) {
      case 'auth/invalid-email':
        this.setState({title:"Invalid Email", showAlert:true,
          message:"The email address entered is invalid. Please try again."})
        break;
      case 'auth/internal-error':
        this.setState({title:"Enter Password", showAlert:true,
          message:"No password entered. Please enter your password."})
        break;
      case 'auth/user-not-found':
        this.setState({title:"Email Not Found", showAlert:true, cancelMessage:"Sign Up",
          cancelAction:() => {this.props.navigation.navigate("SignUp")
          this.setState({showAlert:false})},
          message:"The email address entered was not found. Please create a new account."})
        break;
      case 'auth/wrong-password':
        this.setState({title:"Incorrect Password", showAlert:true,
          message:"The password entered was incorrect. Please try again"})
        break;
      default: 
        this.setState({title:"Error", showAlert:true,
          message:"Please double check all entered information."})
        break;
    }
  }

  //Login user
  onLogin(){
    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => this.errorCheck(error.code))
  }

  render() {
    return(
      <SafeAreaView style={globalStyles.authView}>
        <View style={styles.logo}><Logo/></View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <InputText placeholder='Email' onChangeText={(email) => this.setState({email})} keyboard='email-address' value={this.state.email}/>
          <InputText placeholder='Password' password={true} onChangeText={(password) => this.setState({password})} keyboard='default' value={this.state.password}/>
          <SubmitButton text="SIGN IN" onPress={this.onLogin}/>
          <Text style={styles.text}>Have an account? 
            <Text style={styles.link} onPress={() => this.props.navigation.navigate("SignUp")}>Sign Up</Text>
          </Text>
        </ScrollView>

        <Alert 
          showAlert={this.state.showAlert} 
          cancelAction={this.state.cancelAction}
          cancelMessage={this.state.cancelMessage}
          message={this.state.message} 
          title={this.state.title}
          setShowAlert={() => this.setState({showAlert:false})}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  logo:{
    marginVertical:100,
  },
  text: {
    fontFamily: "light",
    color: darkGrey,
    fontSize: 16,
    textAlign:"center"
  },
  link: {
    textDecorationLine: "underline",
  },
})

export default Login;
