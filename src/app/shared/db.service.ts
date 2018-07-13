import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Dbservice {
 
  data: any;
  error: any;
  private apiUrl = 'https://tournamentsapi.azurewebsites.net/api';
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  // Tournaments
  getTournaments(){
 
    // if (this.data) {
    //   return Promise.resolve(this.data);
    // }
 
    return new Promise(resolve => {
 
      this.http.get(`${this.apiUrl}/tournaments`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  getTournamentById(_id): Promise<any> {
    return  new Promise(resolve => {
      return this.http.get(`${this.apiUrl}/tournaments/${_id}`)
      .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
      });
  } 
 
  createTournament(tournament): Promise<any>{
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
   return  new Promise(resolve => {
     return this.http.post(`${this.apiUrl}/tournaments`, JSON.stringify(tournament), {headers: headers})
     .map(res => {
      //console.log(res.json())
      return res.json()
    })
       .subscribe(data => {
         if(data.message != undefined){
           // Error handling
           // Get response from the server
           this.error = data;
           resolve(this.error);
         }
         this.data = data;
         resolve(this.data);
       });
  })
    .then((msg) => {
      return msg;
    });

  }

  updateTournament(_id, newData){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 

    return new Promise(resolve => {
 
     return this.http.post(`${this.apiUrl}/tournaments/${_id}`, JSON.stringify(newData), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
 
  deleteTournament(_id){
 
    this.http.delete(`${this.apiUrl}/tournaments/${_id}`).subscribe((res) => {
      console.log(res.json());
    });   
 
  }

  // Teams
  getTeams(){
 
    // if (this.data) {
    //   return Promise.resolve(this.data);
    // }
 
    return new Promise(resolve => {
 
      this.http.get(`${this.apiUrl}/teams`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  getTeamById(_id) {

    return new Promise(resolve => {
 
      this.http.get(`${this.apiUrl}/teams/${_id}`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  } 
 
  createTeam(team): Promise<any>{
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
    return  new Promise((resolve, reject) => {
      return this.http.post(`${this.apiUrl}/teams`, JSON.stringify(team), {headers: headers})
      .map(res => {
        //console.log(res.json())
        return res.json()
      })
         .subscribe(data => {
           if(data.message != undefined){
             // Error handling
             // Get response from the server
             this.error = data;
             resolve(this.error);
           }
           this.data = data;
           resolve(this.data);
         });
    })
      .then((msg) => {
        return msg;
      })
    }

  updateTeam(_id, newData){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 

    return new Promise(resolve => {
 
      return this.http.post(`${this.apiUrl}/teams/${_id}`, JSON.stringify(newData), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  deleteTeam(_id){
 
    this.http.delete(`${this.apiUrl}/teams/${_id}`).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}