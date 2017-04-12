import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public photoViewer: PhotoViewer) {}


  ionViewDidLoad() {
    this.setQrCode(this.navParams.data.qrCode)
  }

  setQrCode(qrCode){
    this.qrCode = qrCode;
  }

  finish(){
    this.navCtrl.parent.select(0);
  }

  openViewer(base64Img){
    this.photoViewer.show(base64Img);
  }

}
