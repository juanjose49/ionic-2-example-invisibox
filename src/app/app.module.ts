import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SlideCreatorPage } from '../pages/slide-creator/slide-creator'
import { InvisiboxCreatorPage } from '../pages/invisibox-creator/invisibox-creator'
import { TruncatePipe } from '../pipes/truncate'
import { ManualBarcodeEntryPage } from '../pages/manual-barcode-entry/manual-barcode-entry'
import { InvisiboxService } from '../providers/invisibox-service'
import { SlideService } from '../providers/slide-service'
import { ConfigService } from '../providers/config-service'
import { UserService } from '../providers/user-service'
import { StatusService } from '../providers/status-service'
import { LoggerService } from '../providers/logger-service'
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
import { GooglePlus } from '@ionic-native/google-plus';
import { Events } from 'ionic-angular';

@NgModule({
  declarations: [
    MyApp,
    SlideCreatorPage,
    InvisiboxCreatorPage,
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
    SlideCreatorPage,
    InvisiboxCreatorPage,
    ManualBarcodeEntryPage,
    InvisiboxViewerPage,
    QrViewerPage,
    InvisiboxManagerPage,
    SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
  InvisiboxService, SlideService, ConfigService, StatusService, SplashScreen,
  StatusBar, BarcodeScanner, Camera, PhotoViewer, GooglePlus, UserService,
  LoggerService, Events]
})
export class AppModule {}
