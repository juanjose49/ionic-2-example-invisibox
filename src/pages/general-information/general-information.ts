import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AddFunFactsPage } from '../add-fun-facts/add-fun-facts'
import { InvisiboxService } from '../../providers/invisibox-service'
import { Camera } from 'ionic-native';
import $ from 'jquery';

@Component({
  selector: 'page-general-information',
  templateUrl: 'general-information.html'
  
})
export class GeneralInformationPage {
  public title;
  public wikipediaUrl;
  public funFacts = [];
  public barcodeId;
  public images = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public view: ViewController, public modalCtrl: ModalController,
    public invisiboxService: InvisiboxService, public domSanitizer: DomSanitizer) {}

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

  captureImage(){
    let options = {
                    "quality": 100,
                    "destinationType": Camera.DestinationType.DATA_URL,
                    "encodingType": Camera.EncodingType.JPEG
                  }
    Camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.images.push(base64Image);
    }, (err) => {
        var input = $(document.createElement('input'));
        var images = this.images
        input.attr("type", "file");
        input.trigger('click'); // opening dialog
        input.change(function(){
          var file = input.prop('files')[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            images.push(reader.result);
          }
          reader.readAsDataURL(file);
        });
        

            
    });
  }


}
