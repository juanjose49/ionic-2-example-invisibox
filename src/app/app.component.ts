import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar'
import { InvisiboxManagerPage } from '../pages/invisibox-manager/invisibox-manager';
import { SettingsPage } from '../pages/settings/settings';
import { NavController, Nav, LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InvisiboxCreatorPage } from '../pages/invisibox-creator/invisibox-creator'
import { ManualBarcodeEntryPage } from '../pages/manual-barcode-entry/manual-barcode-entry'
import { InvisiboxViewerPage } from '../pages/invisibox-viewer/invisibox-viewer'
import { InvisiboxService } from '../providers/invisibox-service'
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myTabs') tabs: Tabs;
  @ViewChild('manager') manager: NavController;
  @ViewChild('nav') nav: Nav;
  invisiboxManager = InvisiboxManagerPage;
  settings = SettingsPage;

  constructor(platform: Platform, public invisiboxService: InvisiboxService, 
  public loadingCtrl: LoadingController, public splashScreen: SplashScreen,
  public statusBar: StatusBar, public barcodeScanner: BarcodeScanner, 
  public deeplinks: Deeplinks) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.deeplinks.routeWithNavController(this.nav, {
          '/invisibox/:invisiboxId': InvisiboxViewerPage,
        }).subscribe((match) => {
            // match.$route - the route we matched, which is the matched entry from the arguments to route()
            // match.$args - the args passed in the link
            // match.$link - the full link data
            console.log(match)
            console.log('Successfully matched route', match);
          }, (nomatch) => {
            // nomatch.$link - the full link data
            console.error('Got a deeplink that didn\'t match', nomatch);
          });
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
                this.manager.push(InvisiboxCreatorPage,{barcodeId:barcodeId});
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
