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
    
  }

  fetchAllDryerMachine(){

  }

  getStatusByName(name){

  }

  getStartTimeByName(){

  }

  getRemainingTimeByName(){

  }
}
