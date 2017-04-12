import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar'
import { BarcodeScannerPage } from '../pages/barcode-scanner/barcode-scanner';
import { InvisiboxManagerPage } from '../pages/invisibox-manager/invisibox-manager';
import { SettingsPage } from '../pages/settings/settings';

import { NavController, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
  // barcodeScannerPage = BarcodeScannerPage;
  invisiboxManager = InvisiboxManagerPage;
  settings = SettingsPage;

  constructor(platform: Platform, public invisiboxService: InvisiboxService, 
  public loadingCtrl: LoadingController, public splashScreen: SplashScreen,
  public statusBar: StatusBar, public barcodeScanner: BarcodeScanner) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  scan(){
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
        this.barcodeScanner.scan().then((barcodeData) => {
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
