import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatusService {
  public host;
  constructor(public http: Http, public configService: ConfigService) {
    this.host = configService.getHost();
  }

  getStatus(){
    return this.http.get("http://"+this.host+":7000/status").toPromise()
  }
}
