import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { BarcodeScannerPage } from '../pages/barcode-scanner/barcode-scanner';
import { InvisiboxManagerPage } from '../pages/invisibox-manager/invisibox-manager';
import { SettingsPage } from '../pages/settings/settings';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myTabs') tabs: Tabs;
  barcodeScanner = BarcodeScannerPage;
  invisiboxManager = InvisiboxManagerPage;
  settings = SettingsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
