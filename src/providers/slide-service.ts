import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from './config-service';
import 'rxjs/add/operator/map';

@Injectable()
export class SlideService {
  public host;

  constructor(public http: Http, public configService: ConfigService) { 
    this.host = configService.getHost();
   }

  saveSlide(slide){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("http://"+this.host+":7000/slide/", slide, options).toPromise()
  }

  getSlide(slideUuid){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get("http://"+this.host+":7000/slide/"+slideUuid, options).toPromise()
  }
}
