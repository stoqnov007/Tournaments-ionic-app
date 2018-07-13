import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
import { Dbservice } from '../../app/shared/db.service';
 
@Component({
  selector: 'add-tournament-page',
  templateUrl: 'add.tournament.page.html'
})
export class AddTournamentPage {
 
  title: any;
  description: any;
  toolbarTitle: string = "Add Tournament";
  teams: any;
  selectedTeams: any;
  tournamentId: any;
 
  constructor(public viewCtrl: ViewController, 
              public teamService: Dbservice,
              public navParams: NavParams) {
 
  }

  ionViewDidLoad(){
 
    this.teamService.getTeams().then((data) => {
      //console.log(data);
      this.teams = data;
     // console.log(" selected teams: " + this.selectedTeams);
    });
    this.tournamentId = this.navParams.get('tournamentId');
    this.teamService.getTournamentById(this.tournamentId).then((tournament) => {
      this.selectedTeams = tournament.selectedTeams || [];
    })
 
  }
 
  save(): void {
 
    let tournament = {
      title: this.title,
      description: this.description,
      selectedTeams: this.selectedTeams
    };
 
    this.viewCtrl.dismiss(tournament);
 
  }
 
  close(): void {
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter() {

    this.title = this.navParams.get('title');
    this.description = this.navParams.get('description');
    this.selectedTeams = this.navParams.get('selectedTeams') || [];
    this.toolbarTitle = this.navParams.get('toolbarTitle') || "Add Tournament";
    this.tournamentId = this.navParams.get('tournamentId') || "";
  }

  selectTeams(team) {
    //console.log(team);
    this.selectedTeams.push(team);
  }

  getSelectedTeams(selectedTeams) {
    this.selectedTeams = selectedTeams;
  }
}