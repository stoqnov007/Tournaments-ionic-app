import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
 
@Component({
  selector: 'add-teams-page',
  templateUrl: 'add-teams-page.html'
})
export class AddTeamsPage {
 
  title: any;
  coach: any;
  favourite: any;
  toolbarTitle: string = "Add Team";
 
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
 
  }
 
  save(): void {
 
    let team = {
      title: this.title,
      coach: this.coach,
      favourite: this.favourite
    };
 
    this.viewCtrl.dismiss(team);
 
  }
 
  close(): void {
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter() {
    this.title = this.navParams.get('title');
    this.coach = this.navParams.get('coach');
    this.favourite = this.navParams.get('favourite');
    this.toolbarTitle = this.navParams.get('toolbarTitle') || "Add Team";
  }
}