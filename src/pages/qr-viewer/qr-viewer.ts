import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the QrViewer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qr-viewer',
  templateUrl: 'qr-viewer.html'
})
export class QrViewerPage {
  public qrCode;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}


  ionViewDidLoad() {
    this.setQrCode(this.navParams.data.qrCode)
  }

  setQrCode(qrCode){
    this.qrCode = qrCode;
  }

  finish(){
    this.navCtrl.popToRoot();
  }

}
