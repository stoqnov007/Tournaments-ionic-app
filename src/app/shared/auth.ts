import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Auth {
 
  public token: any;
  constructor(public http: Http, public storage: Storage) {}
 
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('https://tournamentsapi.azurewebsites.net/api/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
 
        });        
 
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://tournamentsapi.azurewebsites.net/api/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials): Promise<any>{
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        return this.http.post('https://tournamentsapi.azurewebsites.net/api/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            //console.log(res.status);
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    })
      .then((msg) => {
        return msg;
      });
 
  }
 
  logout(){
    this.storage.set('token', '');
  }
 
}