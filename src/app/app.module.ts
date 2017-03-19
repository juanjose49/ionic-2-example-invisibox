import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddFunFactsPage } from '../pages/add-fun-facts/add-fun-facts'
import { GeneralInformationPage } from '../pages/general-information/general-information'
import { TruncatePipe } from '../pipes/truncate'
import {ManualBarcodeEntryPage} from '../pages/manual-barcode-entry/manual-barcode-entry'
import { InvisiboxService } from '../providers/invisibox-service'
import { ImageService } from '../providers/image-service'
import { ConfigService } from '../providers/config-service'
import { StatusService } from '../providers/status-service'
import { InvisiboxViewerPage } from '../pages/invisibox-viewer/invisibox-viewer'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddFunFactsPage,
    GeneralInformationPage,
    TruncatePipe,
    ManualBarcodeEntryPage,
    InvisiboxViewerPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddFunFactsPage,
    GeneralInformationPage,
    ManualBarcodeEntryPage,
    InvisiboxViewerPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
  InvisiboxService, ImageService, ConfigService, StatusService]
})
export class AppModule {}
