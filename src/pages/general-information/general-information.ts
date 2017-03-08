import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AddFunFactsPage } from '../add-fun-facts/add-fun-facts'

@Component({
  selector: 'page-general-information',
  templateUrl: 'general-information.html'
  
})
export class GeneralInformationPage {
  public funFacts = [];
  public barcodeId;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public view: ViewController, public modalCtrl: ModalController) {}

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
    alert("Submitted!");
    this.navCtrl.popToRoot();
  }

  setBarcodeId(barcodeId){
    this.barcodeId = barcodeId;
  }


}
