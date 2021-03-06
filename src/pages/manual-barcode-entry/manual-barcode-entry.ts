import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvisiboxCreatorPage } from '../invisibox-creator/invisibox-creator'
import { InvisiboxService } from '../../providers/invisibox-service'
import { InvisiboxViewerPage } from '../invisibox-viewer/invisibox-viewer'

@Component({
  selector: 'page-manual-barcode-entry',
  templateUrl: 'manual-barcode-entry.html'
})
export class ManualBarcodeEntryPage {
  public barcodeId = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public invisiboxService: InvisiboxService) {}

  ionViewDidLoad() {  }

  submit(event){
    if(this.barcodeId != ""){
      this.invisiboxService.getInvisibox(this.barcodeId)
          .then(response => {
            this.navCtrl.push(InvisiboxViewerPage,{invisibox:response.json()});
          })
          .catch(response =>{
            if(response.status == 404){
              this.navCtrl.push(InvisiboxCreatorPage,{barcodeId:this.barcodeId});
            }else{
                alert("The backend service may be down.")
              }
            
          });
      
    }
  }

  close(){
    this.navCtrl.parent.select(0);
  }

}
