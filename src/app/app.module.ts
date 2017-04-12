import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BarcodeScannerPage } from '../pages/barcode-scanner/barcode-scanner';
import { AddFunFactsPage } from '../pages/add-fun-facts/add-fun-facts'
import { GeneralInformationPage } from '../pages/general-information/general-information'
import { TruncatePipe } from '../pipes/truncate'
import { ManualBarcodeEntryPage } from '../pages/manual-barcode-entry/manual-barcode-entry'
import { InvisiboxService } from '../providers/invisibox-service'
import { ImageService } from '../providers/image-service'
import { ConfigService } from '../providers/config-service'
import { StatusService } from '../providers/status-service'
import { InvisiboxViewerPage } from '../pages/invisibox-viewer/invisibox-viewer'
import { QrViewerPage } from '../pages/qr-viewer/qr-viewer'
import { InvisiboxManagerPage } from '../pages/invisibox-manager/invisibox-manager';
import { SettingsPage } from '../pages/settings/settings';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'

@NgModule({
  declarations: [
    MyApp,
    AddFunFactsPage,
    GeneralInformationPage,
    TruncatePipe,
    ManualBarcodeEntryPage,
    InvisiboxViewerPage,
    QrViewerPage,
    InvisiboxManagerPage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddFunFactsPage,
    GeneralInformationPage,
    ManualBarcodeEntryPage,
    InvisiboxViewerPage,
    QrViewerPage,
    InvisiboxManagerPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
  InvisiboxService, ImageService, ConfigService, StatusService, SplashScreen,
  StatusBar, BarcodeScanner, Camera, PhotoViewer]
})
export class AppModule {}
