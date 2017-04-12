import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';


@Component({
  selector: 'page-invisibox-manager',
  templateUrl: 'invisibox-manager.html'
})
export class InvisiboxManagerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public googlePlus: GooglePlus) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvisiboxManagerPage');
  }

  getNav(){
    return this.navCtrl;
  }

  login(){
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));;
  }

}
