import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ConfigService {

  constructor(public http: Http) {
  }
  getHost(){
    if(window.location.hostname == "localhost"){
      return "localhost"
    }else{
      return "myinvisibox.com"
    }
  }
}
