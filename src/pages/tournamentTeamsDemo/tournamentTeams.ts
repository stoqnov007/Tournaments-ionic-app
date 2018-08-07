import { TeamDetailDemo } from './../teamDetailDemo/teamDetailDemo';
import { Dbservice } from '../../app/shared/db.service';
import { Component } from "@angular/core";
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
 
@Component({
  selector: 'tournament-teams',
  templateUrl: 'tournamentTeams.html'
})
export class TournamentTeams {
 
  tournaments: any;
  tournamentTeams = [];
  title: string;
  description: string;
  selectedTeams: any;
  error: string;
  tournamentId: any;
  teams = [];
  //updatedData = [];
 
  constructor(public nav: NavController, 
              public tournamentService: Dbservice, 
              private _loadingController: LoadingController,
              private alertCtrl: AlertController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
 
  }

  ionViewDidLoad() {
    let loader = this._loadingController.create({
      content: 'Loading...'
    })
    this.tournamentId = this.navParams.get('tournament')._id;

    loader.present().then(() =>{
        //var teams = this.teams;

        this.tournamentService.getTournamentTeams()
            .then((res) => {
                let teams = this.tournamentTeams;
                let tournamentTeams = [];
                tournamentTeams.push(this.navParams.get('tournament').selectedTeams);
                this.navParams.get('tournament').selectedTeams.forEach((team) => {
                    res.forEach((res) => {
                        if(team == res.title) {
                            teams.push(res);
                        }
                    })
                })
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
          }
        }
      ]
    });
    alert.present();
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
    })
  }


  goToTeam($event, tournament) {
    this.nav.push(TeamDetailDemo, {tournament: tournament});
  }
 
}