import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
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

  getStatusByName(name){

  }

  getStartTimeByName(){

  }

  getRemainingTimeByName(){

  }
}
