import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SlideService } from '../../providers/slide-service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { LoggerService } from '../../providers/logger-service'
@Component({
  selector: 'page-invisibox-viewer',
  templateUrl: 'invisibox-viewer.html'
})
export class InvisiboxViewerPage {
  public invisibox;
  public slides = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public slideService: SlideService, public photoViewer: PhotoViewer,
  public logger: LoggerService) {

    this.setInvisibox(this.navParams.data.invisibox)
    this.loadNextSlide()}

  setInvisibox(invisibox){
    this.logger.log("InvisiboxViewerPage: loaded Invisibox:");
    this.logger.log(invisibox);
    
    this.invisibox = invisibox;
  }

  loadNextSlide(){
    var slideService = this.slideService;
    var slides = this.slides;
    var logger = this.logger;
    if(this.invisibox.slides.length > 0){
      var slideUuid = this.invisibox.slides[0];
      this.invisibox.slides.splice(0,1);
      slideService.getSlide(slideUuid).then(response =>{
          slides.push(response.json());
          logger.log("InvisiboxViewerPage: loaded Slide:")
          logger.log(response.json())
      })

    }
    
  }

  finish(){
    this.navCtrl.parent.select(0);
  }

  openViewer(base64Img){
    this.photoViewer.show(base64Img);
  }

}
