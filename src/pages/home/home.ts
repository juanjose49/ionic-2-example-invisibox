import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { GeneralInformationPage } from '../general-information/general-information'
import { ManualBarcodeEntryPage } from '../manual-barcode-entry/manual-barcode-entry'
import { InvisiboxViewerPage } from '../invisibox-viewer/invisibox-viewer'
import { InvisiboxService } from '../../providers/invisibox-service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public invisiboxService: InvisiboxService) {
    
  }

  scan(event){
    BarcodeScanner.scan().then((barcodeData) => {
      var barcodeId = barcodeData.text;
      if(barcodeData.text != ""){
        this.invisiboxService.getInvisibox(barcodeId)
            .then(response => {
              this.navCtrl.push(InvisiboxViewerPage,{invisibox:response.json()});
            })
            .catch(response =>{
              console.log("called catch")

              if(response.status == 404){
                this.navCtrl.push(GeneralInformationPage,{barcodeId:barcodeId});
              }else{
                alert("The backend service may be down.")
              }
              
            });
      }
    }, (err) => {
        this.navCtrl.push(ManualBarcodeEntryPage);

    });
  }


}
