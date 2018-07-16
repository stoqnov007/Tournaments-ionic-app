import { MyTeamPage } from './../myTeams/my-teams.page';
import { Dbservice } from '../../app/shared/db.service';
import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController  } from 'ionic-angular';
import { AddTeamsPage } from '../add/add-teams-page';
 
@Component({
  selector: 'teams-demo',
  templateUrl: 'teams-demo.html'
})
export class TeamsDemo {
 
  teams: any;
  title: string;
  coach: string;
  favourite: boolean;
  error: string;
  //updatedData = [];
 
  constructor(public nav: NavController, 
              public teamService: Dbservice,
              private alertCtrl: AlertController, 
              private _loadingController: LoadingController,
              public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){

    let loader = this._loadingController.create({
      content: 'Loading...'
    })

    loader.present().then(() =>{
      this.teamService.getTeams().then((data) => {
        //console.log(data);
        this.teams = data;
        loader.dismiss();
      });
    })
 
  }

  ionViewWillEnter() {
    this.teamService.getTeams().then((data) => {
        //console.log(data);
        this.teams = data;
      });
  }

  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: this.error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  presentConfirm(team) {
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
            this.deleteTeam(team)
          }
        }
      ]
    });
    alert.present();
  }
 
  addTeam(){
    
    let loader = this._loadingController.create({
      content: 'Adding...'
    })

    let modal = this.modalCtrl.create(AddTeamsPage, {});
    modal.onDidDismiss(team => {
      if(team){
        loader.present().then(() =>{
          this.teamService.createTeam(team).then((data) => {
            // Error handling
            if(data.errors) {
              this.error = data.errors.title.message;
              // Show Alert with error message
              this.presentAlert("Error", this.error);
            }
            else{
              this.teams.push(team);
            }
          }).then((msg) => {
            //console.log("The msg 2 is: " + msg)
              this.teamService.getTeams().then((data) => {
                  //console.log(data);
                  this.teams = data;
                  loader.dismiss();
                })
          });
        });
      }
    });
    modal.present();
  }

  getTeamById(team) {
    this.teamService.getTeamById(team._id).then((res) => {
        let data = {
            title: team.title,
            coach: team.coach,
            favourite: team.favourite,
            toolbarTitle: "Edit Team"
        }
        this.editTeam(team._id, data)
    })
  }

  editTeam(id, newData) {
    let loader = this._loadingController.create({
      content: 'Editing...'
    })

    let modal = this.modalCtrl.create(AddTeamsPage, newData);
    modal.onDidDismiss(team => {
      if(team){
        loader.present().then(() =>{
          this.teamService.updateTeam(id, team).then((data) => {
              this.teams = data;
              loader.dismiss();
          });
        });
      }
    });
    modal.present();
  }
 
  deleteTeam(team){
 
    //Remove locally
      let index = this.teams.indexOf(team);
 
      if(index > -1){
        this.teams.splice(index, 1);
      }  
 
    //Remove from database
    this.teamService.deleteTeam(team._id);
  }

  // goHome() {
  //   this.nav.setRoot(MyTeamPage);
  // }
 
}