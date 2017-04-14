import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ConfigService {
  public isInit = true;
  constructor(public http: Http) {
  }

  isDevelopment(){
    return window.location.hostname == "localhost";
  }
  getHost(){
    if(window.location.hostname == "localhost"){
      return "localhost";
    }else{
      return "myinvisibox.com";
    }
  }
  isInitialLoad(){
    if(this.isInit){
      this.isInit = false;
      return true;
    }else{
      return false;
    }
  }
}
