import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController } from 'ionic-angular';
import { Auth } from '../../app/shared/auth';
import { MyTeamPage } from '../myTeams/my-teams.page';
 
@Component({
  selector: 'signup.page',
  templateUrl: 'signup.page.html'
})
export class SignupPage {
 
  role: string;
  email: string;
  password: string;
  loading: any;
 
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public authService: Auth, public loadingCtrl: LoadingController) {
 
  }
 
  register(){
 
    this.showLoader();
 
    let details = {
        email: this.email,
        password: this.password,
        role: this.role
    };
 
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(MyTeamPage);
      this.menuCtrl.enable(true, 'authenticated');
      this.menuCtrl.enable(false, 'unauthenticated')
    }, (err) => {
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
}