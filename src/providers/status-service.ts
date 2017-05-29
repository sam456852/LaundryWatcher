import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "../../APP_SECRETS";
firebase.initializeApp(FIREBASE_CONFIG);

@Injectable()
export class StatusService{
  constructor(){


  }

  fetchAllWashingMachine(){
    return firebase.database().ref('/1637Orrington/Washing').once('value').then((snapshot) => {
      var washing_list = snapshot.val();
      return Object.keys(washing_list);
    })
  }

  fetchAllDryerMachine(){
    return firebase.database().ref('1637Orrington/Dryers').once('value').then((snapshot) => {
      var dryer_list = snapshot.val();
      return Object.keys(dryer_list);
    })
  }

  getWashingStatusByName(name){
    return firebase.database().ref('1637Orrington/Washing/'+name+'/status').once('value').then((snapshot) => {
      return snapshot.val();
    })
  }

  getDryerStatusByName(name){
    return firebase.database().ref('1637Orrington/Dryers/'+name+'/status').once('value').then((snapshot) => {
      return snapshot.val();
    })
  }

  getWashingStartTimeByName(name){
    return firebase.database().ref('1637Orrington/Washing/'+name+'/startTime').once('value').then((snapshot) => {
      return snapshot.val();
    })
  }

  getDryerStartTimeByName(name){
    return firebase.database().ref('1637Orrington/Dryers/'+name+'/startTime').once('value').then((snapshot) => {
      return snapshot.val();
    })
  }

  getWashingRemainingTimeByName(name){
    return firebase.database().ref('1637Orrington/Washing/'+name+'/remainingTime').once('value').then((snapshot) => {
      return snapshot.val();
    })
  }

  getDryerRemainingTimeByName(name){
    return firebase.database().ref('1637Orrington/Dryers/'+name+'/remainingTime').once('value').then((snapshot) => {
      return snapshot.val();
    })
  }
}
