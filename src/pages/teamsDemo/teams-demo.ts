import { MyTeamPage } from './../myTeams/my-teams.page';
import { Dbservice } from '../../app/shared/db.service';
import { Component } from "@angular/core";
import { NavController, ModalController } from 'ionic-angular';
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
  //updatedData = [];
 
  constructor(public nav: NavController, public teamService: Dbservice, public modalCtrl: ModalController) {
 
  }
 
  ionViewDidLoad(){
 
    this.teamService.getTeams().then((data) => {
      //console.log(data);
      this.teams = data;
    });
 
  }

  ionViewWillEnter() {
    this.teamService.getTeams().then((data) => {
        //console.log(data);
        this.teams = data;
      });
  }
 
  addTeam(){
 
    let modal = this.modalCtrl.create(AddTeamsPage, {});
    modal.onDidDismiss(team => {
      if(team){
        this.teams.push(team);
        this.teamService.createTeam(team).subscribe((data) => {
            
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
            favourite: team.favourite
        }
        this.editTeam(team._id, data)
    })
  }

  editTeam(id, newData) {

    let modal = this.modalCtrl.create(AddTeamsPage, newData);
    //console.log(newData)
    modal.onDidDismiss(team => {
      if(team){
        this.teamService.updateTeam(id, team).then((data) => {
            this.teams = data;
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