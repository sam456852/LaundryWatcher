import { Injectable, Component  } from '@angular/core';
// import 'rxjs/add/operator/map';
import * as firebase from "firebase";
import { FIREBASE_CONFIG } from "../../APP_SECRETS";
import { NavController, Platform, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications';
firebase.initializeApp(FIREBASE_CONFIG);

@Injectable()
export class StatusService{
  notifications: any[] =[];
  constructor(public platform: Platform, private localNotifications: LocalNotifications, public alertCtrl: AlertController){


  }

  addNotifications(name, time){
    console.log("current time: "+new Date(new Date().getTime()));
    let notification_time = new Date(new Date().getTime() + time*1000);
    // notification_time.setHours(new Date().getHours());
    // notification_time.setMinutes(new Date().getMinutes()+time);

    console.log("notification_time: "+notification_time);
    let notification = {
      id: this.notifications.length,
      title: 'laundrywatcher',
      text: name+' is available now!',
      at: notification_time,
      icon: 'http://example.com/icon.png'
      // every: 'week'
    };
    this.notifications.push(notification);

  }

  setNotificiation(name, remaining_time){
    let notification_time = new Date(new Date().getTime() + remaining_time*1000);
    let notification = {
      id: new Date().getTime(),
      title: 'laundrywatcher',
      text: name+' is available now!',
      at: notification_time,
      icon: 'http://example.com/icon.png'
      // every: 'week'
    };
    if(this.platform.is('cordova')){
      // this.localNotifications.cancelAll().then(() => {
                this.localNotifications.schedule(notification);
                let alert = this.alertCtrl.create({
                    title: name,
                    message:'You will get notified after '+remaining_time +' seconds',
                    buttons: ['Ok']
                });

                alert.present();
        // });
    }
    else{
      let alert = this.alertCtrl.create({
          title: 'something wrong!',
          buttons: ['Ok']
      });
    //
      alert.present();
    }
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
