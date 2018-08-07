import { Dbservice } from '../../app/shared/db.service';
import { Component } from "@angular/core";
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController, LoadingController, AlertController } from 'ionic-angular';
 
@Component({
  selector: 'team-detail',
  templateUrl: 'teamDetailDemo.html'
})
export class TeamDetailDemo {
 
  tournaments: any;
  tournamentTeams = [];
  title: string;
  error: string;
  teamId: any;
  teamCoach: string;
  isFavourite: boolean;
  isFavouriteArray = [];
  //updatedData = [];
 
  constructor(public nav: NavController, 
              public tournamentService: Dbservice, 
              private _loadingController: LoadingController,
              private alertCtrl: AlertController,
              public navParams: NavParams,
              public storage: Storage,
              public modalCtrl: ModalController) {
 
  }

  ionViewDidLoad() {
    let loader = this._loadingController.create({
      content: 'Loading...'
    })

    loader.present().then(() =>{
        this.isFavouriteArray.push(this.storage.get('favTeamId'));
        this.storage.get('favTeamId').then((val) => {
            console.log('Your favTeamId: ', val);
          });
        //var teams = this.teams;
        this.title = this.navParams.get('tournament').title;
        this.teamId = this.navParams.get('tournament')._id;
        this.teamCoach = this.navParams.get('tournament').coach;
        this.isFavourite = this.navParams.get('tournament').favourite;
        //console.log(this.title)
        loader.dismiss();
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

  goToTeam($event, tournament) {
    //this.nav.push(TournamentTeams, tournament);
  }

  addToFavourites() {
    this.storage.get('favTeamId').then((val) => {
        this.isFavouriteArray.push(val);
        this.isFavouriteArray.push(this.teamId);
      });
    this.storage.set('favTeamId', this.isFavouriteArray);
  }
 
}