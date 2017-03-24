import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { BarcodeScannerPage } from '../pages/barcode-scanner/barcode-scanner';
import { InvisiboxManagerPage } from '../pages/invisibox-manager/invisibox-manager';
import { SettingsPage } from '../pages/settings/settings';

import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { GeneralInformationPage } from '../pages/general-information/general-information'
import { ManualBarcodeEntryPage } from '../pages/manual-barcode-entry/manual-barcode-entry'
import { InvisiboxViewerPage } from '../pages/invisibox-viewer/invisibox-viewer'
import { InvisiboxService } from '../providers/invisibox-service'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myTabs') tabs: Tabs;
  @ViewChild('manager') manager: NavController;
  barcodeScanner = BarcodeScannerPage;
  invisiboxManager = InvisiboxManagerPage;
  settings = SettingsPage;

  constructor(platform: Platform, public invisiboxService: InvisiboxService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  scan(){
        BarcodeScanner.scan().then((barcodeData) => {
      var barcodeId = barcodeData.text;
      if(barcodeData.text != ""){
        this.invisiboxService.getInvisibox(barcodeId)
            .then(response => {
              this.manager.push(InvisiboxViewerPage,{invisibox:response.json()});
            })
            .catch(response =>{
              console.log("called catch")

              if(response.status == 404){
                this.manager.push(GeneralInformationPage,{barcodeId:barcodeId});
              }else{
                alert("The backend service may be down.")
              }
              
            });
      }else{
        this.manager.parent.select(0);
      }
    }, (err) => {
        this.manager.push(ManualBarcodeEntryPage);

    });
  }
}
