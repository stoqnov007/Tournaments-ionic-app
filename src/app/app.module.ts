import { AddTournamentPage } from './../pages/add/add-tournament-page';
import { AddTeamsPage } from './../pages/add/add-teams-page';
import { TournamentDemo } from './../pages/tournamentsDemo/tournaments-demo';
import { TeamsDemo } from './../pages/teamsDemo/teams-demo';
import { LoginPage } from './../pages/login/login.page';
import { SignupPage } from './../pages/signup/signup.page';
import { Dbservice } from './shared/db.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyTeamPage, TournamentPage, TeamsPage,TeamDetailsPage, Game, StandingPage, TeamHomePage, MapPage} from '../pages/pages_exports';
import { TournamentService,FavouriteTournamentService } from './shared/shared-pages';
import { Auth } from './shared/auth';

@NgModule({
  declarations: [
    MyApp,
    MyTeamPage,
    AddTournamentPage,
    AddTeamsPage,
    TournamentPage,
    TournamentDemo,
    TeamsDemo,
    LoginPage,
    SignupPage,
    TeamsPage,
    TeamDetailsPage,
    Game,
    StandingPage,
    TeamHomePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'}),
     IonicStorageModule.forRoot(),
     HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamPage,
    AddTournamentPage,
    AddTeamsPage,
    TournamentPage,
    TournamentDemo,
    TeamsDemo,
    TeamsPage,
    LoginPage,
    SignupPage,
    TeamDetailsPage,
    Game,
    StandingPage,
    TeamHomePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TournamentService,
    HttpModule,
    FavouriteTournamentService,
    Auth,
    Dbservice,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

