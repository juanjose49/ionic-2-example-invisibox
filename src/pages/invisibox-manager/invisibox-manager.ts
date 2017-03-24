import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the InvisiboxManager page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-invisibox-manager',
  templateUrl: 'invisibox-manager.html'
})
export class InvisiboxManagerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvisiboxManagerPage');
  }

  getNav(){
    return this.navCtrl;
  }

}
