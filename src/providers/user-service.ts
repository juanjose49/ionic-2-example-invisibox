import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from './config-service';
import { GooglePlus } from '@ionic-native/google-plus';
import { LoggerService } from './logger-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  public user;
  public host;
  constructor(public http: Http, public configService: ConfigService,
  public googlePlus: GooglePlus, public logger: LoggerService) {
    this.host = configService.getHost();
  }

  login(){
    return new Promise((resolve, reject) => {
      this.googlePlus.login({})
      .then(res => {
        this.invisiboxLogin(res);
        resolve();
      })
      .catch(err => {
        console.error(err);
        this.user = {
          name : "Mock User",
          userId : this.guid()
        }
        this.logger.log("Invisibox user just logged in:")
        this.logger.log(this.user);  
        resolve();      
      });
      
    });
    
    
  }

  invisiboxLogin(user){
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    // this.http.post("http://"+this.host+":7000/login/", idToken, options).toPromise()
    //   .then(response => console.log(response.json))
    this.user = user;
    console.log(user);
    this.logger.log("Invisibox user just logged in:")
    this.logger.log(user);

      
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
    return this.user != null;
  }

  getUser(){
    return this.user;
  }

  getUserId(){
    if(this.user){
      return this.user.userId;
    } else {
      return null;
    }
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
