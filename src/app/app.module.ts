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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddFunFactsPage,
    GeneralInformationPage,
    TruncatePipe,
    ManualBarcodeEntryPage
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
    ManualBarcodeEntryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, InvisiboxService, ImageService]
})
export class AppModule {}
