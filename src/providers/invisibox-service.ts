import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from './config-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Events } from 'ionic-angular';

@Injectable()
export class InvisiboxService {
  public host;
  constructor(public http: Http, public configService: ConfigService,
  public events: Events) {
    this.host = configService.getHost();
  }

  saveInvisibox(invisibox){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.events.publish('invisibox:saved', invisibox, Date.now());
    return this.http.post("http://"+this.host+":7000/invisibox/", invisibox, options).toPromise()
  }

  getInvisibox(barcodeId){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://"+this.host+":7000/invisibox/"+barcodeId, options).toPromise()
  }

  deleteInvisibox(barcodeId){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete("http://"+this.host+":7000/invisibox/"+barcodeId, options).toPromise()
  }

  getInvisiboxes(userId){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://"+this.host+":7000/user/"+userId, options).toPromise()
  }
}
