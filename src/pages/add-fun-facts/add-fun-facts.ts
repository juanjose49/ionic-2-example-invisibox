import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-fun-facts',
  templateUrl: 'add-fun-facts.html'
})
export class AddFunFactsPage {
  public funFact;

  constructor(public navCtrl: NavController, public navParams: NavParams , public view: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddFunFactsPage');
  }

  close(event){
    this.view.dismiss();
  }
  add(event){
    let funFact = {fact:this.funFact}
    this.view.dismiss(funFact);
  }

}
