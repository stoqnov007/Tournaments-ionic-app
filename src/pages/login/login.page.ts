import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../app/shared/auth';
import { MyTeamPage } from '../myTeams/my-teams.page';
import { SignupPage } from '../signup/signup.page';
 
@Component({
  selector: 'login.page',
  templateUrl: 'login.page.html'
})
export class LoginPage {
 
    email: string;
    password: string;
    loading: any;
    error: string;
    loginForm: FormGroup;
    constructor(public navCtrl: NavController, 
                public menuCtrl: MenuController, 
                public authService: Auth, 
                public formBuilder: FormBuilder,
                private alertCtrl: AlertController,
                private toastCtrl: ToastController,
                public loadingCtrl: LoadingController) {

                    this.loginForm = formBuilder.group({
                        email: ['', Validators.compose([Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
                        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
                    });
 
    }
 
    ionViewDidLoad() {
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(MyTeamPage);
            this.menuCtrl.enable(true, 'authenticated');
            this.menuCtrl.enable(false, 'unauthenticated')
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }

    presentToast() {
        let toast = this.toastCtrl.create({
          message: 'Logged in successfully',
          duration: 4000,
          position: 'top'
        });
      
        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });
      
        toast.present();
    }

    presentAlert(title: string, subtitle: string) {
        let alert = this.alertCtrl.create({
          title: title,
          subTitle: this.error,
          buttons: ['Dismiss']
        });
        alert.present();
      }
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            email: this.email,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(MyTeamPage);
            this.menuCtrl.enable(true, 'authenticated');
            this.menuCtrl.enable(false, 'unauthenticated');
            this.presentToast();
        }, (err) => {
            this.error = "The email or password you've entered doesn't match any account."
            this.loading.dismiss();
            this.presentAlert("Login Error:", this.error);
            console.log(err);
        });
 
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}