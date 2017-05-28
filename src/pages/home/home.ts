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

  constructor(public navCtrl: NavController, private statusService: StatusService) {
    this.load();
  }

  load(){
    this.statusService.fetchAllWashingMachine().then((data) => {
      this.washing_list = data;
      console.log("all washing machine: "+this.washing_list);
    });

    this.statusService.fetchAllDryerMachine().then((data) => {
      this.dryer_list = data;
      console.log("all dryers: "+this.dryer_list);
    })
  }

}
