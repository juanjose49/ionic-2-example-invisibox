import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageService } from '../../providers/image-service'

/*
  Generated class for the InvisiboxViewer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-invisibox-viewer',
  templateUrl: 'invisibox-viewer.html'
})
export class InvisiboxViewerPage {
  public invisibox;
  public images = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public imageService: ImageService) {
    this.setInvisibox(this.navParams.data.invisibox)
    this.loadImages()}

  setInvisibox(invisibox){
    this.invisibox = invisibox;
  }

  loadImages(){
    var imageService = this.imageService;
    var images = this.images;
    this.invisibox.imageUuids.forEach(function(imageUuid){
      imageService.getImage(imageUuid).then(response =>{
        // console.log(response.json())
        images.push(response.json());

      })
      .catch(response => {
        console.log("image load failed");
        console.log(response);
      });
    })
  }

  finish(){
    this.navCtrl.popToRoot();
  }

}
