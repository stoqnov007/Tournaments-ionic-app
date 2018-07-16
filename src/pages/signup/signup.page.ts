import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Auth } from '../../app/shared/auth';
import { MyTeamPage } from '../myTeams/my-teams.page';
 
@Component({
  selector: 'signup.page',
  templateUrl: 'signup.page.html'
})
export class SignupPage {
 
  role: string;
  signupEmail: FormControl;
  signupPass: FormControl;
  loading: any;
  signupForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public menuCtrl: MenuController, 
              public formBuilder: FormBuilder,
              private toastCtrl: ToastController,
              public authService: Auth, 
              public loadingCtrl: LoadingController) {

                // this.signupForm = new FormGroup({
                //   loginEmail: new FormControl('', [Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required]),
                //   loginPass: new FormControl('', Validators.required)
                // });

                this.signupForm = formBuilder.group({
                  signupEmail: ['', Validators.compose([Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
                  signupPass: ['', Validators.compose([Validators.minLength(6), Validators.required])]
              });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Your account was created successfully. Welcome to the Tournaments!',
      duration: 5000,
      position: 'top'
    });
  
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
  
    toast.present();
}
 
  register(){
 
    this.showLoader();
 
    let details = {
        email: this.signupEmail,
        password: this.signupPass,
        role: this.role
    };
 
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(MyTeamPage);
      this.menuCtrl.enable(true, 'authenticated');
      this.menuCtrl.enable(false, 'unauthenticated');
      this.presentToast();
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