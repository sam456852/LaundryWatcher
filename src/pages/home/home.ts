import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StatusService } from '../../providers/status-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StatusService]
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

  constructor(public navCtrl: NavController, private statusService: StatusService) {
    this.washing_status_list = [];
    this.dryer_status_list = [];

    this.washing_start_time_list = [];
    this.washing_remaining_time_list = [];
    this.dryer_start_time_list = [];
    this.dryer_remaining_time_list = [];

    this.load();
    console.log("status: "+this.washing_status_list);
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
