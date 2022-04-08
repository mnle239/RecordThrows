import firebase from "firebase/compat";
import { USER_STATE_CHANGE, USER_DISCUS_MEET_STATE_CHANGE, 
  USER_DISCUS_STATE_CHANGE, USER_HAMMER_MEET_STATE_CHANGE, 
  USER_HAMMER_STATE_CHANGE, USER_SHOTPUT_MEET_STATE_CHANGE,
  USER_SHOTPUT_STATE_CHANGE, USER_WEIGHT_MEET_STATE_CHANGE, 
  USER_WEIGHT_STATE_CHANGE } from "../constants"

export function fetchUser(){
  return((dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get().then((snapshot) => {
        if(snapshot.exists){
          dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
        }else{
          console.log('does not exist')
        }
      })
  })
}

export function fetchHammerDistances(){
  return((dispatch) => {
  firebase.firestore()
    .collection("Hammer")
    .doc(firebase.auth().currentUser.uid)
    .collection("userDistances")
    .orderBy("date", "asc")
    .get().then((snapshot) => {
      let hammerBest = []
      let hammer = snapshot.docs.map(doc =>{
        const data = doc.data();
        const id = doc.id;
        data.formatedDistances.forEach(entry =>{
          let contains = false

          hammerBest.forEach(element => {
            if(element.implement === entry.implement){
              contains = true;
              if(element.distance < entry.distance ||
                (element.distance == entry.distance && element.date < data.date.seconds)){
                element.distance = entry.distance
                element.date = data.date.seconds
                element.id = id
              }
            }
          });
          if(contains === false){
            hammerBest[hammerBest.length]= {
              implement: entry.implement, distance: entry.distance, date: data.date.seconds, id:doc.id
            }
          }

        })
        return {id, ...data}
      })
      hammerBest.sort((a, b) => {
        var aHold = a.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        var bHold = b.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        return aHold-bHold
      })
      console.log(hammerBest)
      dispatch({type: USER_HAMMER_STATE_CHANGE, hammer, hammerBest})
    })
  })
}

export function fetchHammerMeetDistances(){
  return((dispatch) => {
    firebase.firestore()
      .collection("HammerMeet")
      .doc(firebase.auth().currentUser.uid)
      .collection("userDistances")
      .orderBy("date", "asc")
      .get()
      .then((snapshot) => {
        var hammerMeetBest = []
        var hammerMeet = snapshot.docs.map((doc, index) =>{
          const data = doc.data();
          const id = doc.id;
          var farthestThrow = 0
          data.formatedDistances.forEach(entry =>{
            if(entry.distance != "Foul" && farthestThrow < entry.distance){
              farthestThrow = entry.distance
              hammerMeetBest[index] = {distance:farthestThrow, date:data.date, id:id}
            }
          })
          if(farthestThrow === 0){
            hammerMeetBest[index] = {distance:"Foul", date:data.date, id:id}
          }
          return {id, ...data}
        })
        dispatch({type: USER_HAMMER_MEET_STATE_CHANGE, hammerMeet, hammerMeetBest})
      })
  })
}

export function fetchDiscusDistances(){
  return((dispatch) => {
  firebase.firestore()
    .collection("Discus")
    .doc(firebase.auth().currentUser.uid)
    .collection("userDistances")
    .orderBy("date", "asc")
    .get().then((snapshot) => {
      let discusBest = []
      let discus = snapshot.docs.map(doc =>{
        const data = doc.data();
        const id = doc.id;
        data.formatedDistances.forEach(entry =>{
          let contains = false

          discusBest.forEach(element => {
            if(element.implement === entry.implement){
              contains = true;
              if(element.distance < entry.distance ||
                (element.distance == entry.distance && element.date < data.date.seconds)){
                element.distance = entry.distance
                element.date = data.date.seconds
                element.id = id
              }
            }
          });
          if(contains === false){
            discusBest[discusBest.length]= {
              implement: entry.implement, distance: entry.distance, date: data.date.seconds, id:doc.id
            }
          }

        })
        return {id, ...data}
      })
      discusBest.sort((a, b) => {
        var aHold = a.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        var bHold = b.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        return aHold-bHold
      })
      dispatch({type: USER_DISCUS_STATE_CHANGE, discus, discusBest})
    })
  })
}

export function fetchDiscusMeetDistances(){
  return((dispatch) => {
    firebase.firestore()
      .collection("DiscusMeet")
      .doc(firebase.auth().currentUser.uid)
      .collection("userDistances")
      .orderBy("date", "asc")
      .get()
      .then((snapshot) => {
        var discusMeetBest = []
        var discusMeet = snapshot.docs.map((doc, index) =>{
          const data = doc.data();
          const id = doc.id;
          var farthestThrow = 0
          data.formatedDistances.forEach(entry =>{
            if(entry.distance != "Foul" && farthestThrow < entry.distance){
              farthestThrow = entry.distance
              discusMeetBest[index] = {distance:farthestThrow, date:data.date, id:id}
            }
          })
          if(farthestThrow === 0){
            discusMeetBest[index] = {distance:"Foul", date:data.date, id:id}
          }
          return {id, ...data}
        })
        dispatch({type: USER_DISCUS_MEET_STATE_CHANGE, discusMeet, discusMeetBest})
      })
  })
}

export function fetchWeightDistances(){
  return((dispatch) => {
  firebase.firestore()
    .collection("Weight")
    .doc(firebase.auth().currentUser.uid)
    .collection("userDistances")
    .orderBy("date", "asc")
    .get().then((snapshot) => {
      let weightBest = []
      let weight = snapshot.docs.map(doc =>{
        const data = doc.data();
        const id = doc.id;
        data.formatedDistances.forEach(entry =>{
          let contains = false

          weightBest.forEach(element => {
            if(element.implement === entry.implement){
              contains = true;
              if(element.distance < entry.distance ||
                (element.distance == entry.distance && element.date < data.date.seconds)){
                element.distance = entry.distance
                element.date = data.date.seconds
                element.id = id
              }
            }
          });
          if(contains === false){
            weightBest[weightBest.length]= {
              implement: entry.implement, distance: entry.distance, date: data.date.seconds, id:doc.id
            }
          }

        })
        return {id, ...data}
      })
      weightBest.sort((a, b) => {
        var aHold = a.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        var bHold = b.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        return aHold-bHold
      })
      dispatch({type: USER_WEIGHT_STATE_CHANGE, weight, weightBest})
    })
  })
}

export function fetchWeightMeetDistances(){
  return((dispatch) => {
    firebase.firestore()
      .collection("WeightMeet")
      .doc(firebase.auth().currentUser.uid)
      .collection("userDistances")
      .orderBy("date", "asc")
      .get()
      .then((snapshot) => {
        var weightMeetBest = []
        var weightMeet = snapshot.docs.map((doc, index) =>{
          const data = doc.data();
          const id = doc.id;
          var farthestThrow = 0
          data.formatedDistances.forEach(entry =>{
            if(entry.distance != "Foul" && farthestThrow < entry.distance){
              farthestThrow = entry.distance
              weightMeetBest[index] = {distance:farthestThrow, date:data.date, id:id}
            }
          })
          if(farthestThrow === 0){
            weightMeetBest[index] = {distance:"Foul", date:data.date, id:id}
          }
          return {id, ...data}
        })
        dispatch({type: USER_WEIGHT_MEET_STATE_CHANGE, weightMeet, weightMeetBest})
      })
  })
}

export function fetchShotPutDistances(){
  return((dispatch) => {
  firebase.firestore()
    .collection("Shot Put")
    .doc(firebase.auth().currentUser.uid)
    .collection("userDistances")
    .orderBy("date", "asc")
    .get().then((snapshot) => {
      let shotPutBest = []
      let shotPut = snapshot.docs.map(doc =>{
        const data = doc.data();
        const id = doc.id;
        data.formatedDistances.forEach(entry =>{
          let contains = false

          shotPutBest.forEach(element => {
            if(element.implement === entry.implement){
              contains = true;
              if(element.distance < entry.distance ||
                (element.distance == entry.distance && element.date < data.date.seconds)){
                element.distance = entry.distance
                element.date = data.date.seconds
                element.id = id
              }
            }
          });
          if(contains === false){
            shotPutBest[shotPutBest.length]= {
              implement: entry.implement, distance: entry.distance, date: data.date.seconds, id:doc.id
            }
          }

        })
        return {id, ...data}
      })
      shotPutBest.sort((a, b) => {
        var aHold = a.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        var bHold = b.implement.match(/[+-]?\d+(\.\d+)?/g).join('')
        return aHold-bHold
      })
      dispatch({type: USER_SHOTPUT_STATE_CHANGE, shotPut, shotPutBest})
    })
  })
}

export function fetchShotPutMeetDistances(){
  return((dispatch) => {
    firebase.firestore()
      .collection("Shot PutMeet")
      .doc(firebase.auth().currentUser.uid)
      .collection("userDistances")
      .orderBy("date", "asc")
      .get()
      .then((snapshot) => {
        var shotPutMeetBest = []
        var shotPutMeet = snapshot.docs.map((doc, index) =>{
          const data = doc.data();
          const id = doc.id;
          var farthestThrow = 0
          data.formatedDistances.forEach(entry =>{
            if(entry.distance != "Foul" && farthestThrow < entry.distance){
              farthestThrow = entry.distance
              shotPutMeetBest[index] = {distance:farthestThrow, date:data.date, id:id}
            }
          })
          if(farthestThrow === 0){
            shotPutMeetBest[index] = {distance:"Foul", date:data.date, id:id}
          }
          return {id, ...data}
        })
        dispatch({type: USER_SHOTPUT_MEET_STATE_CHANGE, shotPutMeet, shotPutMeetBest})
      })
  })
}
