import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InvisiboxService {

  constructor(public http: Http) {
  }

  saveInvisibox(invisibox){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://myinvisibox.com:7000/invisibox/", invisibox, options).toPromise()
  }

}
