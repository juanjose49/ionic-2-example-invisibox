import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LoggerService {
  constructor(public http: Http) {
  }

  isDevelopment(){
    return window.location.hostname == "localhost";
  }

  log(message){
    if(this.isDevelopment()){
      console.log(message);
    }
  }

}
