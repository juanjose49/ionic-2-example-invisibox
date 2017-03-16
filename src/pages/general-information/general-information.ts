import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AddFunFactsPage } from '../add-fun-facts/add-fun-facts'
import { InvisiboxService } from '../../providers/invisibox-service'

@Component({
  selector: 'page-general-information',
  templateUrl: 'general-information.html'
  
})
export class GeneralInformationPage {
  public title;
  public wikipediaUrl;
  public funFacts = [];
  public barcodeId;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public view: ViewController, public modalCtrl: ModalController,
    public invisiboxService: InvisiboxService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralInformationPage');
    this.setBarcodeId(this.navParams.data.barcodeId)
  }

  addFunFact(event){
      let addModal = this.modalCtrl.create(AddFunFactsPage);
      addModal.onDidDismiss((funFact) => {
        if(funFact){
          this.funFacts.push(funFact);
        }
    });
      addModal.present()
  }

  submit(event){
    let invisibox = {
                      "title" : this.title,
                      "wikipediaUrl" : this.wikipediaUrl,
                      "funFacts" : this.funFacts,
                      "barcodeId" : this.barcodeId
                    }
    this.invisiboxService.saveInvisibox(invisibox)
        .then(response => alert("Your Invisibox was successfully saved."))
        .catch(response => alert("The barcode entered has already been used."));
    this.navCtrl.popToRoot();
  }

  setBarcodeId(barcodeId){
    this.barcodeId = barcodeId;
  }


}
