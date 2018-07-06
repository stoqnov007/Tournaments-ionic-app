import { Component, ViewChild } from '@angular/core';
import { Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamPage,TournamentPage } from '../pages/pages_exports';
import { TeamsDemo } from './../pages/teamsDemo/teams-demo';
import { TournamentDemo } from './../pages/tournamentsDemo/tournaments-demo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyTeamPage;

  
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
      this.initializeApp();
    }
    

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goHome(){
    this.nav.popToRoot;
  }

  goToTournaments(){
    this.nav.push(TournamentPage);
  }

  goToDemoTournaments() {
    this.nav.push(TournamentDemo);
  }

  goToDemoTeams() {
    this.nav.push(TeamsDemo);
  }
}
