import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { SlideCreatorPage } from '../slide-creator/slide-creator'
import { QrViewerPage } from '../qr-viewer/qr-viewer'
import { InvisiboxService } from '../../providers/invisibox-service'
import { SlideService } from '../../providers/slide-service'
import { LoggerService } from '../../providers/logger-service'
import { UserService } from '../../providers/user-service'

@Component({
  selector: 'page-invisibox-creator',
  templateUrl: 'invisibox-creator.html'

})

export class InvisiboxCreatorPage {
  public title = "";
  public slides = [];
  public barcodeId;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public view: ViewController, public modalCtrl: ModalController,
    public invisiboxService: InvisiboxService, public slideService: SlideService,
    public logger: LoggerService, public userService: UserService) { }

  ionViewDidLoad() {
    if (this.navParams.data.barcodeId != null) {
      this.setBarcodeId(this.navParams.data.barcodeId)
    } else {
      this.setBarcodeId(this.guid())
    }
  }

  addSlide(event) {
    let addModal = this.modalCtrl.create(SlideCreatorPage);
    addModal.onDidDismiss((slide) => {
      if (slide != null) {
        this.logger.log("Created a new slide:")
        this.logger.log(slide)
        this.slides.push(slide);
      }
    });
    addModal.present()
  }

  uploadSlides() {
    var uuids = [];
    var slideService = this.slideService;
    this.slides.forEach(function (slide) {
      uuids.push(slide.uuid);
      slideService.saveSlide(slide);
    });
    return uuids;
  }

  submit(event) {
    var slideUuids = this.uploadSlides()
    let invisibox = {
      "title": this.title,
      "slides": slideUuids,
      "barcodeId": this.barcodeId,
      "userId": this.userService.getUserId()
    }
    this.invisiboxService.saveInvisibox(invisibox)
      .then(response => {
        this.navCtrl.push(QrViewerPage, { qrCode: response.json() });
      }).catch(response => {
        console.log(response);
        alert("An error occurred saving your Invisibox.")
      });
  }


  setBarcodeId(barcodeId) {
    this.barcodeId = barcodeId;
  }

  close() {
    this.navCtrl.pop();
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
