import { USER_STATE_CHANGE, USER_DISCUS_MEET_STATE_CHANGE, 
  USER_DISCUS_STATE_CHANGE, USER_HAMMER_MEET_STATE_CHANGE, 
  USER_HAMMER_STATE_CHANGE, USER_SHOTPUT_MEET_STATE_CHANGE,
  USER_SHOTPUT_STATE_CHANGE, USER_WEIGHT_MEET_STATE_CHANGE, 
  USER_WEIGHT_STATE_CHANGE } from "../constants"

const initialState = {
  currentUser: null,
  posts:[]
}

export const user = (state = initialState, action) => {
  switch(action.type){
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case USER_HAMMER_STATE_CHANGE:
      return {
        ...state,
        hammerBest: action.hammerBest,
        hammer: action.hammer
      }
    case USER_HAMMER_MEET_STATE_CHANGE:
      return {
        ...state,
        hammerMeetBest: action.hammerMeetBest,
        hammerMeet: action.hammerMeet
      }
    case USER_WEIGHT_STATE_CHANGE:
      return {
        ...state,
        weightBest: action.weightBest,
        weight: action.weight
      }
    case USER_WEIGHT_MEET_STATE_CHANGE:
      return {
        ...state,
        weightMeetBest: action.weightMeetBest,
        weightMeet: action.weightMeet
      }
      case USER_DISCUS_STATE_CHANGE:
      return {
        ...state,
        discusBest: action.discusBest,
        discus: action.discus
      }
    case USER_DISCUS_MEET_STATE_CHANGE:
      return {
        ...state,
        discusMeetBest: action.discusMeetBest,
        discusMeet: action.discusMeet
      }
      case USER_SHOTPUT_STATE_CHANGE:
      return {
        ...state,
        shotPutBest: action.shotPutBest,
        shotPut: action.shotPut
      }
    case USER_SHOTPUT_MEET_STATE_CHANGE:
      return {
        ...state,
        shotPutMeetBest: action.shotPutMeetBest,
        shotPutMeet: action.shotPutMeet
      }
    default:
      return state;
  }
}