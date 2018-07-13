import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
 
@Component({
  selector: 'edit-tournament-page',
  templateUrl: 'edit.tournament.page.html'
})
export class EditTournamentPage {
 
  title: any;
  description: any;
  selectedTeams: any;
 
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
 
  }
 
  update(): void {
 
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
    this.selectedTeams = this.navParams.get('selectedTeams');
  }
}