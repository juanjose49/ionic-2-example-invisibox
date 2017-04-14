import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from './config-service';
import { GooglePlus } from '@ionic-native/google-plus';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  public user;
  public host;
  constructor(public http: Http, public configService: ConfigService,
  public googlePlus: GooglePlus) {
    this.host = configService.getHost();
  }

  login(){
    this.googlePlus.login({})
      .then(res => {
        this.invisiboxLogin(res);
      })
      .catch(err => {
        console.error(err);
        this.user = {
          name : "Juan San Emeterio",
          id : "abc123"
        }
      });
    
  }

  invisiboxLogin(user){
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // this.http.post("http://"+this.host+":7000/login/", idToken, options).toPromise()
    //   .then(response => console.log(response.json))
    this.user = user;
      
  }

  logout(){
    this.googlePlus.logout()
      .then(res => this.invisiboxLogout())
      .catch(res => {
        console.log(res);
        this.user = null;
      });
  }

  invisiboxLogout(){
    alert("You have succesfully logged out.")
    this.user = null;
  }

  isLoggedIn(){
    return this.user == null;
  }

  getUser(){
    return this.user;
  }
}
