import { Component } from '@angular/core';
import { ViewController, NavParams} from 'ionic-angular';
 
@Component({
  selector: 'add-tournament-page',
  templateUrl: 'add.tournament.page.html'
})
export class AddTournamentPage {
 
  title: any;
  description: any;
  rating: any;
 
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
 
  }
 
  save(): void {
 
    let tournament = {
      title: this.title,
      description: this.description,
      rating: this.rating
    };
 
    this.viewCtrl.dismiss(tournament);
 
  }
 
  close(): void {
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter() {
    this.title = this.navParams.get('title');
    this.description = this.navParams.get('description');
    this.rating = this.navParams.get('rating');
  }
}