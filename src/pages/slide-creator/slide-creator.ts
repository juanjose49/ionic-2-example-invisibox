import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import $ from 'jquery';
import { LoggerService } from '../../providers/logger-service'

@Component({
  selector: 'page-slide-creator',
  templateUrl: 'slide-creator.html'
})
export class SlideCreatorPage {
  public title = "";
  public textContent = "";
  public base64Img = { "img": "" };
  public keywords = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public view: ViewController, public camera: Camera, public logger: LoggerService) { }

  ionViewDidLoad() {
  }

  close(event) {
    this.view.dismiss();
  }

  save(event) {
    this.view.dismiss(
      {
        "title": this.title,
        "textContent": this.textContent,
        "base64Img": this.base64Img.img,
        "keywords": this.keywords,
        "uuid": this.guid()
      }
    );
  }

  captureImage() {
    let options = {
      "quality": 25,
      "destinationType": this.camera.DestinationType.DATA_URL,
      "encodingType": this.camera.EncodingType.JPEG
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Img["img"] = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      var input = $(document.createElement('input'));
      input.attr("type", "file");
      input.trigger('click'); // opening dialog
      var base64Img = this.base64Img;
      var logger = this.logger
      input.change(function () {
        var file = input.prop('files')[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          base64Img["img"] = reader.result;
          logger.log("This is the captured image.")
          logger.log(base64Img)

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
