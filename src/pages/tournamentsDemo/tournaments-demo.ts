import { Dbservice } from '../../app/shared/db.service';
import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
import { AddTournamentPage } from '../add/add-tournament-page';
 
@Component({
  selector: 'tournaments-demo',
  templateUrl: 'tournaments-demo.html'
})
export class TournamentDemo {
 
  tournaments: any;
  title: string;
  description: string;
  //updatedData = [];
 
  constructor(public nav: NavController, public tournamentService: Dbservice, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
 
    this.tournamentService.getTournaments().then((data) => {
      //console.log(data);
      this.tournaments = data;
    });
 
  }

  ionViewWillEnter() {
    this.tournamentService.getTournaments().then((data) => {
        //console.log(data);
        this.tournaments = data;
      });
  }
 
  addTournament(){
 
    let modal = this.modalCtrl.create(AddTournamentPage, {});
    modal.onDidDismiss(tournament => {
      if(tournament){
        this.tournaments.push(tournament);
        this.tournamentService.createTournament(tournament).subscribe((data) => {
            //console.log(data);
            //this.tournaments = data;
        });     
      }
    });
    //this.nav.push(TournamentDemo);
    modal.present();
  }

  getTournamentById(tournament) {
    this.tournamentService.getTournamentById(tournament._id).then((res) => {
        //console.log(res);
        let data = {
            title: tournament.title,
            description: tournament.description,
            rating: tournament.rating
        }
        //this.title = tournament.title;
        //this.description = tournament.description;
        //this.updatedData = [];
        //this.updatedData.push(data);
        //console.log(tournament._id);
        this.editTournament(tournament._id, data)
    })
  }

  editTournament(id, newData) {

    let modal = this.modalCtrl.create(AddTournamentPage, newData);
    //console.log(newData)
    modal.onDidDismiss(tournament => {
      if(tournament){
        //console.log(tournament);
        //this.tournaments.push(tournament);
        this.tournamentService.updateTournament(id, tournament).then((data) => {
            //console.log(data);
            this.tournaments = data;
        });  
        // this.tournamentService.getTournaments().then((data) => {
        //     //console.log(data);
        //     this.tournaments = data;
        //   });  

      }
    });
    //this.nav.pop();
    //this.nav.setRoot(TournamentDemo, {}, {animate: true, direction: 'forward'});
    //this.nav.push(TournamentDemo);
    modal.present();
  }
 
  deleteTournament(tournament){
 
    //Remove locally
      let index = this.tournaments.indexOf(tournament);
 
      if(index > -1){
        this.tournaments.splice(index, 1);
      }  
 
    //Remove from database
    this.tournamentService.deleteTournament(tournament._id);
  }
 
}