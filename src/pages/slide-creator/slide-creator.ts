import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-slide-creator',
  templateUrl: 'slide-creator.html'
})
export class SlideCreatorPage {
  public funFact;

  constructor(public navCtrl: NavController, public navParams: NavParams , public view: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlideCreatorPage');
  }

  close(event){
    this.view.dismiss();
  }
  add(event){
    this.view.dismiss(this.funFact);
  }

}
