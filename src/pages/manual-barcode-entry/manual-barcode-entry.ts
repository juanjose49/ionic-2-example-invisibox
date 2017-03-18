import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GeneralInformationPage } from '../general-information/general-information'

@Component({
  selector: 'page-manual-barcode-entry',
  templateUrl: 'manual-barcode-entry.html'
})
export class ManualBarcodeEntryPage {
  public barcodeId = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {  }

  submit(event){
    if(this.barcodeId != ""){
      this.navCtrl.push(GeneralInformationPage,{barcodeId:this.barcodeId});
    }
  }

}
