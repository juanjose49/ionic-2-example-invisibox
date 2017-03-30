import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AddFunFactsPage } from '../add-fun-facts/add-fun-facts'
import { QrViewerPage } from '../qr-viewer/qr-viewer'
import { InvisiboxService } from '../../providers/invisibox-service'
import { ImageService } from '../../providers/image-service'
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
    public invisiboxService: InvisiboxService, public imageService: ImageService) {}

  ionViewDidLoad() {
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
  uploadImages(){
    var uuids = [];
    var imageService = this.imageService;
    var guid = this.guid;
    this.images.forEach(function(base64Img) {
      var uuid = guid();
      var image = {
                    "uuid" : uuid,
                    "base64Img" : base64Img
                  }
      imageService.saveImage(image);
      uuids.push(uuid);
    });
    return uuids;
  }
  submit(event){
    var imageUuids = this.uploadImages()
    let invisibox = {
                      "title" : this.title,
                      "wikipediaUrl" : this.wikipediaUrl,
                      "funFacts" : this.funFacts,
                      "barcodeId" : this.barcodeId,
                      "imageUuids": imageUuids
                    }
    this.invisiboxService.saveInvisibox(invisibox)
        .then(response => {
          this.navCtrl.push(QrViewerPage,{qrCode:response.json().qrCode});
        }).catch(response => {
          console.log(response);
          alert("An error occurred saving your Invisibox.")
        });
  }
    

  setBarcodeId(barcodeId){
    this.barcodeId = barcodeId;
  }

  captureImage(){
    let options = {
                    "quality": 25,
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

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
