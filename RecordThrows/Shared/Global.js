import { StyleSheet,Dimensions } from "react-native";

//Implements object
export const allImplements = {
  "Female":{
    "Hammer":[{id:'2k'}, {id:'3k'}, {id:'3.5k'}, {id:'4k'},
      {id:'10lb'}, {id:'5k'}, {id:'12lb'}, {id:'6k'}, {id:'14lb'}, {id:'16lb'}],
    "Weight":[{id:'16lb'}, {id:'18lb'}, {id:'20lb'}, {id:'22lb'}, {id:'25lb'}, 
      {id:'28lb'}, {id:'30lb'}, {id:'35lb'}],
    "Discus":[{id:'0.75k', label:'0.75k'}, {id:'1k', label:'1k'}, 
      {id:'1.25k', label:'1.25k'}, {id:'1.5k', label:'1.5k'}, {id:'2k', label:'2k'}],
    "Shot Put":[{id:'3k'}, {id:'3.25k'}, {id:'3.5k'}, {id:'8lb'}, 
      {id:'4k'}, {id:'10lb'}, {id:'5k'}, {id:'12lb'}, {id:'6k'}]
  },
  "Male":{
    "Hammer":[{id:'5k'}, {id:'6k'}, {id:'14lb'}, {id:'16lb'}, 
    {id:'18lb'}, {id:'8k'}, {id:'20lb'}, {id:'10k'}, {id:'11k'}, {id:'12k'}],
    "Weight":[{id:'5k'}, {id:'6k'}, {id:'14lb'}, {id:'15lb'}, 
    {id:'16lb'},{id:'17lb'}, {id:'18lb'}, {id:'19lb'}, {id:'20lb'}],
    "Discus":[{id:'1.6k'}, {id:'1.75k'}, {id:'2k'}, {id:'2.25k'}, 
    {id:'2.5k'}, {id:'2.75k'}, {id:'3k'}],
    "Shot Put":[{id:'25lb'}, {id:'28lb'}, {id:'30lb'}, {id:'33lb'}, {id:'35lb'}, 
    {id:'40lb'}, {id:'45lb'}, {id:'50lb'}]
  }
}

//Main Theme colors
export const light = "rgba(249,247,243,1)"
export const darkGrey = "rgba(53,52,52,1)"
export const lightGrey =  "rgba(204,204,204,1)"
export const orange = "rgba(249,207,164,1)"

//Global styles for screens
export const globalStyles=StyleSheet.create({
  darkView: {
    backgroundColor: darkGrey,
    flex:1
  },
  authView:{
    backgroundColor: light,
    flex: 1, 
    alignItems: 'center'
  },
  lightView:{
    backgroundColor: light,
    height:Dimensions.get('window').height,
    width:Dimensions.get('window').width,
    alignSelf:'center'
  },
})
