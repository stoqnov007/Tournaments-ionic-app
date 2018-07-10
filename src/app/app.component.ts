import { Response, Headers } from '@angular/http';
import { Component, ViewChild} from '@angular/core';
import { Nav, Platform, NavParams, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamPage,TournamentPage } from '../pages/pages_exports';
import { TeamsDemo } from './../pages/teamsDemo/teams-demo';
import { TournamentDemo } from './../pages/tournamentsDemo/tournaments-demo';
import { LoginPage } from './../pages/login/login.page';
import { Auth } from '../app/shared/auth';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
 
  rootPage: any = MyTeamPage;
  init: boolean = false;
  user: boolean = true;
  
    constructor(public platform: Platform, 
      public storage: Storage, 
      public auth: Auth, 
      public statusBar: StatusBar,
      public menuCtrl: MenuController, 
      public splashScreen: SplashScreen) {
      this.initializeApp();
      
    }
    

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('token').then((res) => {
        if(res) {
          this.menuCtrl.enable(true, 'authenticated');
          this.menuCtrl.enable(false, 'unauthenticated');
        }
        else {
          this.menuCtrl.enable(false, 'authenticated');
          this.menuCtrl.enable(true, 'unauthenticated');
        }
      })
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

  goToLogin() {
    this.nav.push(LoginPage);
  }

  logout() {
    this.auth.logout();
    this.user = false;
    this.menuCtrl.enable(false, 'authenticated');
    this.menuCtrl.enable(true, 'unauthenticated')
  }
}
