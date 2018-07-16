import { Dbservice } from '../../app/shared/db.service';
import { Component } from "@angular/core";
import { NavController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { AddTournamentPage } from '../add/add-tournament-page';
import { EditTournamentPage } from '../edit/edit-tournament-page';
 
@Component({
  selector: 'tournaments-demo',
  templateUrl: 'tournaments-demo.html'
})
export class TournamentDemo {
 
  tournaments: any;
  title: string;
  description: string;
  selectedTeams: any;
  error: string;
  //updatedData = [];
 
  constructor(public nav: NavController, 
              public tournamentService: Dbservice, 
              private _loadingController: LoadingController,
              private alertCtrl: AlertController,
              public modalCtrl: ModalController) {
 
  }

  ionViewDidLoad() {
    let loader = this._loadingController.create({
      content: 'Loading...'
    })

    loader.present().then(() =>{
        this.tournamentService.getTournaments().then((data) => {
            //console.log(data);
            this.tournaments = data;
            loader.dismiss();
          });
    })
    
  }

  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: this.error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentConfirm(tournament) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTournament(tournament);
          }
        }
      ]
    });
    alert.present();
  }

  addTournament() {
    let loader = this._loadingController.create({
        content: 'Adding...'
      })

    let modal = this.modalCtrl.create(AddTournamentPage, {});
    modal.onDidDismiss(tournament => {
        
        if(tournament){
            loader.present().then(() =>{
                this.tournamentService.createTournament(tournament).then((data) => {
                    // Error handling
                if(data.errors) {
                    this.error = data.errors.title.message;
                    // Show Alert with error message
                    this.presentAlert("Error", this.error);
                }
                else{
                    this.tournaments.push(tournament);
                }
                }).then(() => {
                    this.tournamentService.getTournaments().then((data) => {
                        //console.log(data);
                        this.tournaments = data;
                        loader.dismiss();
                    }); 
                });   
            }); 
        }
        
    });
    //this.nav.push(TournamentDemo);
    modal.present();
  }

  getTournamentById(tournament) {
    //console.log('tournament: ' + JSON.stringify(tournament))
    this.tournamentService.getTournamentById(tournament._id).then((res) => {
        //console.log(res);
        let data = {
            title: tournament.title,
            description: tournament.description,
            selectedTeams: tournament.selectedTeams,
            tournamentId: tournament._id,
            toolbarTitle: "Edit Tournament"
        }
        //this.title = tournament.title;
        //this.description = tournament.description;
        //this.updatedData = [];
        //this.updatedData.push(data);
        //console.log(tournament);
        this.editTournament(tournament._id, data);
    })
  }

  editTournament(id, newData) {

    let loader = this._loadingController.create({
        content: 'Editing...'
      })

    let modal = this.modalCtrl.create(AddTournamentPage, newData);
    modal.onDidDismiss(tournament => {  
        if(tournament){
            loader.present().then(() =>{
                this.tournamentService.updateTournament(id, tournament).then((data) => {
                    this.tournaments = data;
                    loader.dismiss();
                });   
            });
        } 
    });
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