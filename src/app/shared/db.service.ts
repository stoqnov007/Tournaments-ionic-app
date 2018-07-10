import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
export class Dbservice {
 
  data: any;
 
  constructor(public http: Http) {
    this.data = null;
  }
 
  // Tournaments
  getTournaments(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:8080/api/tournaments')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  getTournamentById(_id) {

    return new Promise(resolve => {
 
      this.http.get(`http://localhost:8080/api/tournaments/${_id}`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  } 
 
  createTournament(tournament){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
   return  this.http.post('http://localhost:8080/api/tournaments', JSON.stringify(tournament), {headers: headers})
      .map(res => {
        console.log(res.json());
      });
 
  }

  updateTournament(id, newData){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 

    return new Promise(resolve => {
 
     return this.http.post('http://localhost:8080/api/tournaments/' + id, JSON.stringify(newData), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  deleteTournament(id){
 
    this.http.delete('http://localhost:8080/api/tournaments/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }

  // Teams
  getTeams(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get('http://localhost:8080/api/teams')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  getTeamById(_id) {

    return new Promise(resolve => {
 
      this.http.get(`http://localhost:8080/api/teams/${_id}`)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  } 
 
  createTeam(team){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 
   return  this.http.post('http://localhost:8080/api/teams', JSON.stringify(team), {headers: headers})
      .map(res => {
        console.log(res.json());
      });
 
  }

  updateTeam(id, newData){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
 

    return new Promise(resolve => {
 
      return this.http.post('http://localhost:8080/api/teams/' + id, JSON.stringify(newData), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }
 
  deleteTeam(id){
 
    this.http.delete('http://localhost:8080/api/teams/' + id).subscribe((res) => {
      console.log(res.json());
    });   
 
  }
 
}