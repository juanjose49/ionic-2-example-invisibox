import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@Component({
  selector: 'page-qr-viewer',
  templateUrl: 'qr-viewer.html'
})
export class QrViewerPage {
  public qrCode;
  public plaintext
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public photoViewer: PhotoViewer) {}


  ionViewDidLoad() {
    this.setQrCode(this.navParams.data.qrCode)
    this.setPlaintext(this.navParams.data.qrCode)
  }

  setQrCode(qrCode){
    this.qrCode = qrCode.qrCode;
  }

  setPlaintext(qrCode){
    this.plaintext = qrCode.plaintext;
  }

  finish(){
    this.navCtrl.parent.select(0);
  }

  openViewer(base64Img){
    this.photoViewer.show(base64Img);
  }

  copyToClipboard(elementId) {

    // Create an auxiliary hidden input
    var aux = document.createElement("input");

    // Get the text from the element passed into the input
    aux.setAttribute("value", document.getElementById(elementId).innerHTML);

    // Append the aux input to the body
    document.body.appendChild(aux);

    // Highlight the content
    aux.select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the input from the body
    document.body.removeChild(aux);

  }

}
