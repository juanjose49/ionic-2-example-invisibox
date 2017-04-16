import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ConfigService } from '../../providers/config-service';
import { InvisiboxService } from '../../providers/invisibox-service';
import { LoggerService } from '../../providers/logger-service';
import $ from 'jquery';
import { InvisiboxCreatorPage } from '../invisibox-creator/invisibox-creator'
import { InvisiboxViewerPage } from '../invisibox-viewer/invisibox-viewer'
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-invisibox-manager',
  templateUrl: 'invisibox-manager.html'
})
export class InvisiboxManagerPage {
  public invisiboxes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public userService: UserService, public invisiboxService: InvisiboxService,
  public logger: LoggerService, public events: Events) {
    this.loadInvisiboxes();
    this.events.subscribe('invisibox:saved', (invisibox, time) => {
      this.invisiboxes.push(invisibox);
    });
  }

  ionViewDidLoad() {
  }

  getNav(){
    return this.navCtrl;
  }

  login(){
    this.userService.login()
    .then(resolved => this.loadInvisiboxes());
    
  }

  isLoggedIn(){
    return this.userService.isLoggedIn()
  }

  addInvisibox(){
    this.navCtrl.push(InvisiboxCreatorPage)
  }

  loadInvisiboxes(){
    this.logger.log("InvisiboxManagerPage: Attempting to load Invisiboxes");
    if(this.userService.getUserId()){
       this.invisiboxService.getInvisiboxes(this.userService.getUserId())
          .then(response => this.invisiboxes =response.json())
          .catch(response => console.log(response));
    }
  }

  loadInvisibox(invisibox){
    this.navCtrl.push(InvisiboxViewerPage, {"invisibox" : JSON.parse(JSON.stringify(invisibox))})
  }

  delete(invisibox){
    //TODO: Delete the associated slides.
    this.logger.log("InvisiboxManagerPage: Deleting Invisibox:");
    this.logger.log(invisibox);
    this.invisiboxService.deleteInvisibox(invisibox.barcodeId)
      .then(response => {
        var index = this.invisiboxes.indexOf(invisibox, 0);
        if (index > -1) {
          this.invisiboxes.splice(index, 1);
        }
      }).catch(response => console.log(response));
  }
}
