import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ConfigService } from '../../providers/config-service';
import $ from 'jquery';

@Component({
  selector: 'page-invisibox-manager',
  templateUrl: 'invisibox-manager.html'
})
export class InvisiboxManagerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public userService: UserService, public configService: ConfigService) {}

  ionViewDidLoad() {
      $("#invisibox-bg").fadeOut(1000);
  }

  getNav(){
    return this.navCtrl;
  }

  login(){
    this.userService.login();
  }

  isLoggedIn(){
    return this.userService.isLoggedIn()
  }

  isInitialLoad(){
    this.configService.isInitialLoad();
  }

}
