import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from './config-service';
import 'rxjs/add/operator/map';

@Injectable()
export class ImageService {
  public host;

  constructor(public http: Http, public configService: ConfigService) { 
    this.host = configService.getHost();
   }

  saveImage(image){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://"+this.host+":7000/image/", image, options).toPromise()
  }

  getImage(imageUuid){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://"+this.host+":7000/image/"+imageUuid, options).toPromise()
  }
}
