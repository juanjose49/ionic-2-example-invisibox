import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {

  constructor(public http: Http) {  }

    saveImage(image){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://myinvisibox.com:7000/image/", image, options).toPromise()
  }

}
