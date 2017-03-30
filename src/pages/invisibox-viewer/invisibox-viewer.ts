import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImageService } from '../../providers/image-service';
import { PhotoViewer } from 'ionic-native';

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
    this.loadNextImage()}

  setInvisibox(invisibox){
    this.invisibox = invisibox;
  }

  loadNextImage(){
    var imageService = this.imageService;
    var images = this.images;
    if(this.invisibox.imageUuids){
      var imageUuid = this.invisibox.imageUuids[0];
      this.invisibox.imageUuids.splice(0,1);
        imageService.getImage(imageUuid).then(response =>{
          // console.log(response.json())
          images.push(response.json());

        })

      }
    
  }

  finish(){
    this.navCtrl.parent.select(0);
  }

  openViewer(base64Img){
    PhotoViewer.show(base64Img);
  }

}
