import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { GeneralInformationPage } from '../general-information/general-information'
import { ManualBarcodeEntryPage } from '../manual-barcode-entry/manual-barcode-entry'




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
    
  }

  scan(event){
    BarcodeScanner.scan().then((barcodeData) => {
      
      if(barcodeData.text != ""){
        this.navCtrl.push(GeneralInformationPage,{barcodeId:barcodeData.text});
      }
    }, (err) => {
        this.navCtrl.push(ManualBarcodeEntryPage);

    });
  }


}
