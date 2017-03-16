import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InvisiboxService {

  constructor(public http: Http) {
    console.log('Hello InvisiboxService Provider');
  }

  saveInvisibox(invisibox){
    console.log(invisibox)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://"+window.location.hostname+":7000/invisibox/", invisibox, options).toPromise()
  }

}
