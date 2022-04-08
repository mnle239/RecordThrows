import React from 'react';
import {StyleSheet} from 'react-native'
import {light, darkGrey, orange} from "../Global"
import AwesomeAlert from 'react-native-awesome-alerts';

/*
  Return: An Alert component
  Props: 
    showAlert - should the alert show
    setShowAlert - funtion that sets showAlert
    title - the alert title
    message - the main message
    cancelMessage - the title of the second button
    cancelAction -  the function performed when the second button is pressed
*/
function Alert ({showAlert, setShowAlert, title, message, cancelMessage, cancelAction}) {
  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={title}
      message={message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={cancelMessage == "" || cancelMessage == undefined ? false : true}
      showConfirmButton={true}
      cancelText={cancelMessage}
      confirmText="Ok"
      onCancelPressed={cancelMessage == "" || cancelMessage == undefined? ()=>{} : cancelAction}
      onConfirmPressed={setShowAlert}
      confirmButtonColor={orange}
      cancelButtonColor={darkGrey}
      titleStyle={styles.title}
      confirmButtonTextStyle={styles.button}
      cancelButtonTextStyle={styles.button}
      contentContainerStyle={{backgroundColor:light, borderRadius:10}}
      messageStyle={styles.text}
    />
  );
}

const styles = StyleSheet.create({
  text:{
    fontFamily: "regular",
    color: darkGrey,
    fontSize: 16,
  },
  button:{
    fontFamily: "bold",
    color: light,
    fontSize: 16,
  },
  title:{
    fontFamily: "semiBold",
    color: darkGrey,
    fontSize: 20,
    textTransform: 'uppercase'
  }
});


export default Alert;