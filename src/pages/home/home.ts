import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { StatusService } from '../../providers/status-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StatusService, LocalNotifications]
})
export class HomePage {

  washing_list: any;
  dryer_list: any;

  washing_status_list: string[];
  washing_start_time_list: string[];
  washing_remaining_time_list: string[];

  dryer_status_list: string[];
  dryer_start_time_list: string[];
  dryer_remaining_time_list: string[];

  notifications: any[] = [];

  constructor(public navCtrl: NavController, private statusService: StatusService, public platform: Platform, public alertCtrl: AlertController, private localNotifications: LocalNotifications) {
    console.log("moment: "+moment(new Date()).format());
    console.log("minutes: "+ new Date().getMinutes());
    this.washing_status_list = [];
    this.dryer_status_list = [];

    this.washing_start_time_list = [];
    this.washing_remaining_time_list = [];
    this.dryer_start_time_list = [];
    this.dryer_remaining_time_list = [];

    this.load();
    // console.log("status: "+this.washing_status_list);

    // this.addNotifications();
    // console.log("Notifications to be scheduled: ", this.notifications);

  }

  addNotifications(name, time){
    let notification_time = new Date(new Date().getTime() + time*6*1000);
    // notification_time.setHours(new Date().getHours());
    // notification_time.setMinutes(new Date().getMinutes()+time);
    let notification = {
      // id: day.dayCode,
      title: 'laundrywatcher',
      text: name+' is available now!',
      at: notification_time,
      icon: 'http://example.com/icon.png'
      // every: 'week'
    };
    console.log("notification_time: "+notification_time);
    this.notifications.push(notification);
  }

  setNotificiation(name, remaining_time){
    if(this.platform.is('cordova')){
            // Cancel any existing notifications
            // this.localNotifications.cancelAll().then(() => {
        //
                // Schedule the new notifications
                this.localNotifications.schedule(this.notifications);
                // this.notifications = [];
        //
                let alert = this.alertCtrl.create({
                    title: name,
                    message:'You will get notified after '+remaining_time +' minutes',
                    buttons: ['Ok']
                });
        //
                alert.present();
        //
            // });
        //
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

  getWashingNotified(washing_name){
    // console.log("washing notification: "+washing_name);
    this.statusService.getWashingRemainingTimeByName(washing_name).then((remaining_time) => {
      // console.log("washing remaining_time: "+washing_name+" "+remaining_time);
      this.addNotifications(washing_name, remaining_time);
      this.setNotificiation(washing_name, remaining_time);
    })
  }

  getDryerNotified(dryer_name){
    // console.log("dryer notification: "+dryer_name);
    this.statusService.getDryerRemainingTimeByName(dryer_name).then((remaining_time) => {
      this.addNotifications(dryer_name, remaining_time);
      this.setNotificiation(dryer_name, remaining_time);
    })
  }

  load(){
    this.statusService.fetchAllWashingMachine().then((data) => {
      this.washing_list = data;
      for(var i=0 ; i<this.washing_list.length; i++){
        this.statusService.getWashingStatusByName(this.washing_list[i]).then((status) => {
          // console.log(this.washing_list[i]+": "+status);
          this.washing_status_list.push(status);
          if(this.washing_status_list.length == this.washing_list.length){
            for(var i=0; i<this.washing_status_list.length; i++){
              this.statusService.getWashingStartTimeByName(this.washing_list[i]).then((start_time) => {
                this.washing_start_time_list.push(start_time);
              })
              this.statusService.getWashingRemainingTimeByName(this.washing_list[i]).then((remaining_time) => {
                this.washing_remaining_time_list.push(remaining_time);
              })
            }
          }
        })
      }
    });

    this.statusService.fetchAllDryerMachine().then((data) => {
      this.dryer_list = data;
      for(var i=0; i<this.dryer_list.length; i++){
        this.statusService.getDryerStatusByName(this.dryer_list[i]).then((status) => {
          this.dryer_status_list.push(status);
          if(this.dryer_status_list.length == this.dryer_list.length){
            for(var i=0 ;i<this.dryer_status_list.length; i++){
              this.statusService.getDryerStartTimeByName(this.dryer_list[i]).then((start_time) => {
                this.dryer_start_time_list.push(start_time);
              })
              this.statusService.getDryerRemainingTimeByName(this.dryer_list[i]).then((remaining_time) => {
                this.dryer_remaining_time_list.push(remaining_time);
              })
            }
          }
        })
      }
    });


  }

}
