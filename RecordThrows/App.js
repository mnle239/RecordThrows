import React, { Component } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase/compat';
import {RECORD_THROWS_API_KEY} from "@env"

import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SignUpScreen from './Screens/Auth/SignUp'
import LoginScreen from './Screens/Auth/Login'
import HomeScreen from './Screens/Home'
import CalendarScreen from './Screens/Calendar'
import PersonalRecordsScreen from './Screens/PersonalRecords'
import ProfileScreen from './Screens/Profile'
import TrackingScreen from './Screens/Tracking'
import DrawerContent from './Screens/DrawerContent';
import AddDataScreen from './Screens/AddData';
import MoreInfoScreen from './Screens/MoreInfo';
import OverviewScreen from './Screens/Overview';
import MeetOverviewScreen from './Screens/MeetOverview';

const firebaseConfig = {
  apiKey: "AIzaSyAJ_xQyI4qmwgCRyy4VFN442PZsIEZlTdA",
  authDomain: "recordthrows.firebaseapp.com",
  projectId: "recordthrows",
  storageBucket: "recordthrows.appspot.com",
  messagingSenderId: "376073823469",
  appId: "1:376073823469:web:148a1a7dab3329988ed8e4",
  measurementId: "G-NBY49CK0NX"
};

firebase.initializeApp(firebaseConfig)
const AuthStack = createStackNavigator();
const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk))

const MainStackScreen = () => {
  return (
    <MainStack.Navigator initialRouteName={HomeScreen} screenOptions={{headerShown: false }}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Calendar" component={CalendarScreen} />
      <MainStack.Screen name="PersonalRecords" component={PersonalRecordsScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Tracking" component={TrackingScreen} />
      <MainStack.Screen name="MoreInfo" component={MoreInfoScreen} />
      <MainStack.Screen name="AddData" component={AddDataScreen} />
      <MainStack.Screen name="Overview" component={OverviewScreen} />
      <MainStack.Screen name="MeetOverview" component={MeetOverviewScreen} />
    </MainStack.Navigator>
  )
}

let customFonts = {
  'bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  'light': require('./assets/fonts/Montserrat-Light.ttf'),
  'medium': require('./assets/fonts/Montserrat-Medium.ttf'),
  'regular': require('./assets/fonts/Montserrat-Regular.ttf'),
  'semiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
};

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      fontsLoaded: false
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount(){
    this._loadFontsAsync();
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const {loggedIn, loaded, fontsLoaded} = this.state;
    if(!loaded || !fontsLoaded){
      return(
        <AppLoading />
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <AuthStack.Navigator initialRouteName="Login" >
            <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
            <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          </AuthStack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator screenOptions={{headerShown: false}} 
            drawerContent={props => <DrawerContent {... props} /> }>
            <Drawer.Screen name="Drawer" component={MainStackScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App

