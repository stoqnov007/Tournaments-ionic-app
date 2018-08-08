webpackJsonp([0],{

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Auth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Auth = (function () {
    function Auth(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    Auth.prototype.checkAuthentication = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //Load token if exists
            _this.storage.get('token').then(function (value) {
                _this.token = value;
                var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
                headers.append('Authorization', _this.token);
                _this.http.get('https://tournamentsapi.azurewebsites.net/api/protected', { headers: headers })
                    .subscribe(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    Auth.prototype.createAccount = function (details) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            _this.http.post('https://tournamentsapi.azurewebsites.net/api/register', JSON.stringify(details), { headers: headers })
                .subscribe(function (res) {
                var data = res.json();
                _this.token = data.token;
                _this.storage.set('token', data.token);
                resolve(data);
            }, function (err) {
                reject(err);
            });
        });
    };
    Auth.prototype.login = function (credentials) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            return _this.http.post('https://tournamentsapi.azurewebsites.net/api/login', JSON.stringify(credentials), { headers: headers })
                .subscribe(function (res) {
                //console.log(res.status);
                var data = res.json();
                _this.token = data.token;
                _this.storage.set('token', data.token);
                resolve(data);
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        })
            .then(function (msg) {
            return msg;
        });
    };
    Auth.prototype.logout = function () {
        this.storage.set('token', '');
    };
    Auth = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], Auth);
    return Auth;
}());
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyTeamPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_exports__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyTeamPage = (function () {
    function MyTeamPage(_nav, _tournamentService, _loadingController, _favouriteTournamentService) {
        this._nav = _nav;
        this._tournamentService = _tournamentService;
        this._loadingController = _loadingController;
        this._favouriteTournamentService = _favouriteTournamentService;
    }
    // ionViewDidLoad(){
    // }            
    MyTeamPage.prototype.ionViewDidLoad = function () {
        this.favTeams = this._favouriteTournamentService.getTheFavourites();
    };
    MyTeamPage.prototype.goToTournaments = function () {
        this._nav.push(__WEBPACK_IMPORTED_MODULE_2__pages_exports__["h" /* TournamentPage */]);
    };
    MyTeamPage.prototype.favTeamTapped = function (favTeam) {
        var _this = this;
        var loader = this._loadingController.create({
            content: "Loading..."
        });
        loader.present().then(function () {
            _this._tournamentService.getCurrentTournamentData(favTeam.tournamentId)
                .subscribe(function (data) { return _this._nav.push(__WEBPACK_IMPORTED_MODULE_2__pages_exports__["f" /* TeamHomePage */], favTeam.team); });
            loader.dismiss();
        });
    };
    MyTeamPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\myTeams\my-teams.page.html"*/'<ion-header>\n    <ion-navbar color="danger">\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>My Teams</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content center text-center>\n\n    <ion-card *ngIf="!favTeams">\n        <img src="http://sites.wrk.ru/sites/uk/co/co/tiscali/myweb/theblackhole/allpages/j-smile_wow/lgeoops.jpg">\n        <ion-card-content>\n            <h1 text-uppercase> No Teams for now to Display</h1>\n        </ion-card-content>\n        <!--<ion-note>\n            11h ago\n        </ion-note>-->\n    </ion-card>\n\n    <ion-card *ngIf="favTeams">\n        <ion-card-content>\n            <ion-list>\n                <ion-list-header>\n                    <h2>My Favourite Teams</h2>\n                </ion-list-header>\n                <button ion-item *ngFor="let favTeam of favTeams" (click)="favTeamTapped(favTeam)">\n                    <ion-icon name="star"></ion-icon>  {{favTeam.team.name}}\n                    <p>{{favTeam.tournamentName}}</p>\n                </button>\n            </ion-list>\n        </ion-card-content>\n        <ion-note right>\n            Tap individuals to get more info\n        </ion-note>\n    </ion-card>\n\n    <div padding>\n        <h6>To Find more news and details about teams and Tournaments</h6>\n    </div>\n    <div class="col text-center">\n        <button full center ion-button round (click)="goToTournaments()"><ion-icon name="search"></ion-icon>Find a Tournament</button>\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\myTeams\my-teams.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__["b" /* TournamentService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__["a" /* FavouriteTournamentService */]])
    ], MyTeamPage);
    return MyTeamPage;
}());
//# sourceMappingURL=my-teams.page.js.map

/***/ }),

/***/ 296:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 296;

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTournamentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_db_service__ = __webpack_require__(85);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AddTournamentPage = (function () {
    function AddTournamentPage(viewCtrl, teamService, navParams) {
        this.viewCtrl = viewCtrl;
        this.teamService = teamService;
        this.navParams = navParams;
        this.toolbarTitle = "Add Tournament";
    }
    AddTournamentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.teamService.getTeams().then(function (data) {
            //console.log(data);
            _this.teams = data;
            // console.log(" selected teams: " + this.selectedTeams);
        });
        this.tournamentId = this.navParams.get('tournamentId');
        this.teamService.getTournamentById(this.tournamentId).then(function (tournament) {
            _this.selectedTeams = tournament.selectedTeams || [];
        });
    };
    AddTournamentPage.prototype.save = function () {
        var tournament = {
            title: this.title,
            description: this.description,
            selectedTeams: this.selectedTeams
        };
        this.viewCtrl.dismiss(tournament);
    };
    AddTournamentPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    AddTournamentPage.prototype.ionViewWillEnter = function () {
        this.title = this.navParams.get('title');
        this.description = this.navParams.get('description');
        this.selectedTeams = this.navParams.get('selectedTeams') || [];
        this.toolbarTitle = this.navParams.get('toolbarTitle') || "Add Tournament";
        this.tournamentId = this.navParams.get('tournamentId') || "";
    };
    AddTournamentPage.prototype.selectTeams = function (team) {
        //console.log(team);
        this.selectedTeams.push(team);
    };
    AddTournamentPage.prototype.getSelectedTeams = function (selectedTeams) {
        this.selectedTeams = selectedTeams;
    };
    AddTournamentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-tournament-page',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\add\add.tournament.page.html"*/'<!-- !!! This page is used only in the modal, so dont show it !!! -->\n\n<!-- !!! This page is used only in the modal, so dont show it !!! -->\n\n<!-- !!! This page is used only in the modal, so dont show it !!! -->\n\n<ion-header>\n\n    <ion-toolbar transparent>\n\n     <ion-title>{{toolbarTitle}}</ion-title>\n\n     <ion-buttons end>\n\n       <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>\n\n     </ion-buttons>\n\n    </ion-toolbar>\n\n   </ion-header>\n\n    \n\n   <ion-content>\n\n     <ion-list no-lines>\n\n       <ion-item>\n\n         <ion-label floating>Title</ion-label>\n\n         <ion-input [(ngModel)]="title" type="text" name="title"></ion-input>\n\n       </ion-item>\n\n    \n\n       <ion-item>\n\n         <ion-label floating>Description</ion-label>\n\n         <ion-textarea [(ngModel)]="description" name="description"></ion-textarea>\n\n       </ion-item>\n\n    \n\n       <!-- <ion-item>\n\n         <ion-range min="0" max="100" pin="true" [(ngModel)]="rating">\n\n           <ion-icon range-left name="sad"></ion-icon>\n\n           <ion-icon range-right name="happy"></ion-icon>\n\n         </ion-range>\n\n       </ion-item> -->\n\n\n\n       <ion-item>\n\n          <ion-label>Select Teams</ion-label>\n\n          <ion-select (ngModelChange)="getSelectedTeams(selectedTeams)" [(ngModel)]="selectedTeams" multiple="true">\n\n            <ion-option \n\n              *ngFor="let team of teams" \n\n              value="{{team.title}}" \n\n              selected = "{team.selected}"\n\n              [id]="team._id"\n\n              (ionSelect)="selectTeams(team)">\n\n                        {{team.title}}\n\n            </ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n    \n\n     </ion-list>\n\n    \n\n     <button ion-button full color="secondary" (click)="save()">Save</button>\n\n    \n\n   </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\add\add.tournament.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__app_shared_db_service__["a" /* Dbservice */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AddTournamentPage);
    return AddTournamentPage;
}());
//# sourceMappingURL=add-tournament-page.js.map

/***/ }),

/***/ 424:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddTeamsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AddTeamsPage = (function () {
    function AddTeamsPage(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.toolbarTitle = "Add Team";
    }
    AddTeamsPage.prototype.save = function () {
        var team = {
            title: this.title,
            coach: this.coach,
            favourite: this.favourite
        };
        this.viewCtrl.dismiss(team);
    };
    AddTeamsPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    AddTeamsPage.prototype.ionViewWillEnter = function () {
        this.title = this.navParams.get('title');
        this.coach = this.navParams.get('coach');
        this.favourite = this.navParams.get('favourite');
        this.toolbarTitle = this.navParams.get('toolbarTitle') || "Add Team";
    };
    AddTeamsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'add-teams-page',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\add\add-teams-page.html"*/'<!-- !!! This page is used only in the modal, so dont show it !!! -->\n\n<!-- !!! This page is used only in the modal, so dont show it !!! -->\n\n<!-- !!! This page is used only in the modal, so dont show it !!! -->\n\n<ion-header>\n\n    <ion-toolbar transparent>\n\n     <ion-title>{{toolbarTitle}}</ion-title>\n\n     <ion-buttons end>\n\n       <button ion-button icon-only (click)="close()"><ion-icon name="close"></ion-icon></button>\n\n     </ion-buttons>\n\n    </ion-toolbar>\n\n   </ion-header>\n\n    \n\n   <ion-content>\n\n     <ion-list no-lines>\n\n       <ion-item>\n\n         <ion-label floating>Title</ion-label>\n\n         <ion-input [(ngModel)]="title" type="text" name="title"></ion-input>\n\n       </ion-item>\n\n    \n\n       <ion-item>\n\n          <ion-label floating>Coach</ion-label>\n\n          <ion-input [(ngModel)]="coach" type="text" name="title"></ion-input>\n\n       </ion-item>\n\n    \n\n       <ion-item>\n\n          <ion-label>Add to Favourite</ion-label>\n\n          <ion-toggle [(ngModel)]="favourite"></ion-toggle>\n\n        </ion-item>\n\n    \n\n     </ion-list>\n\n    \n\n     <button ion-button full color="secondary" (click)="save()">Save</button>\n\n    \n\n   </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\add\add-teams-page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], AddTeamsPage);
    return AddTeamsPage;
}());
//# sourceMappingURL=add-teams-page.js.map

/***/ }),

/***/ 425:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TournamentTeams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__teamDetailDemo_teamDetailDemo__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_shared_db_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TournamentTeams = (function () {
    //updatedData = [];
    function TournamentTeams(nav, tournamentService, _loadingController, alertCtrl, navParams, modalCtrl) {
        this.nav = nav;
        this.tournamentService = tournamentService;
        this._loadingController = _loadingController;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.tournamentTeams = [];
        this.teams = [];
    }
    TournamentTeams.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Loading...'
        });
        this.tournamentId = this.navParams.get('tournament')._id;
        loader.present().then(function () {
            //var teams = this.teams;
            _this.tournamentService.getTournamentTeams()
                .then(function (res) {
                var teams = _this.tournamentTeams;
                var tournamentTeams = [];
                tournamentTeams.push(_this.navParams.get('tournament').selectedTeams);
                _this.navParams.get('tournament').selectedTeams.forEach(function (team) {
                    res.forEach(function (res) {
                        if (team == res.title) {
                            teams.push(res);
                        }
                    });
                });
                loader.dismiss();
            });
        });
    };
    TournamentTeams.prototype.presentAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: this.error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    TournamentTeams.prototype.presentConfirm = function (tournament) {
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    TournamentTeams.prototype.getTournamentById = function (tournament) {
        //console.log('tournament: ' + JSON.stringify(tournament))
        this.tournamentService.getTournamentById(tournament._id).then(function (res) {
            //console.log(res);
            var data = {
                title: tournament.title,
                description: tournament.description,
                selectedTeams: tournament.selectedTeams,
                tournamentId: tournament._id,
                toolbarTitle: "Edit Tournament"
            };
            //this.title = tournament.title;
            //this.description = tournament.description;
            //this.updatedData = [];
            //this.updatedData.push(data);
            //console.log(tournament);
        });
    };
    TournamentTeams.prototype.goToTeam = function ($event, tournament) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_0__teamDetailDemo_teamDetailDemo__["a" /* TeamDetailDemo */], { tournament: tournament });
    };
    TournamentTeams = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({
            selector: 'tournament-teams',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\tournamentTeamsDemo\tournamentTeams.html"*/'<ion-header>\n\n        <ion-navbar color="danger">\n\n            <ion-title>Teams</ion-title>\n\n        </ion-navbar>\n\n      \n\n      </ion-header>\n\n          \n\n         <ion-content>\n\n          \n\n           <ion-list no-lines>\n\n             <ion-item-sliding *ngFor="let team of tournamentTeams">\n\n          \n\n               <ion-item>\n\n          \n\n                 <!-- <ion-avatar item-left>\n\n                   <img src="https://api.adorable.io/avatars/75/{{tournament.title}}">\n\n                 </ion-avatar> -->\n\n                 <button ion-item (click)="goToTeam($event,team)">\n\n                    {{team.title}}\n\n                </button>\n\n                 <!-- <h2>{{tournament.title}}</h2> -->\n\n                 <!-- <p>{{tournament.description}}</p> -->\n\n          \n\n                 <!-- <ion-icon *ngIf="tournament.rating < 50" danger name="sad"></ion-icon>\n\n                 <ion-icon *ngIf="tournament.rating >= 50" secondary name="happy"></ion-icon>\n\n                 {{tournament.rating}} -->\n\n          \n\n               </ion-item>\n\n          \n\n               <!-- <ion-item>\n\n                 <button ion-button color="danger" (click)="presentConfirm(tournament)">\n\n                   <ion-icon name="trash"></ion-icon>\n\n                   Delete\n\n                 </button>\n\n                 <button ion-button color="secondary" (click)="getTournamentById(tournament)">\n\n                  Edit\n\n                </button>\n\n               </ion-item> -->\n\n             </ion-item-sliding>\n\n          \n\n           </ion-list>\n\n          \n\n         </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\tournamentTeamsDemo\tournamentTeams.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__app_shared_db_service__["a" /* Dbservice */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* ModalController */]])
    ], TournamentTeams);
    return TournamentTeams;
}());
//# sourceMappingURL=tournamentTeams.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamDetailDemo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_shared_db_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TeamDetailDemo = (function () {
    //updatedData = [];
    function TeamDetailDemo(nav, tournamentService, _loadingController, alertCtrl, navParams, storage, modalCtrl) {
        this.nav = nav;
        this.tournamentService = tournamentService;
        this._loadingController = _loadingController;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.tournamentTeams = [];
        this.isFavouriteArray = [];
    }
    TeamDetailDemo.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Loading...'
        });
        loader.present().then(function () {
            _this.isFavouriteArray.push(_this.storage.get('favTeamId'));
            _this.storage.get('favTeamId').then(function (val) {
                console.log('Your favTeamId: ', val);
            });
            //var teams = this.teams;
            _this.title = _this.navParams.get('tournament').title;
            _this.teamId = _this.navParams.get('tournament')._id;
            _this.teamCoach = _this.navParams.get('tournament').coach;
            _this.isFavourite = _this.navParams.get('tournament').favourite;
            //console.log(this.title)
            loader.dismiss();
        });
    };
    TeamDetailDemo.prototype.presentAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: this.error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    TeamDetailDemo.prototype.presentConfirm = function (tournament) {
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    TeamDetailDemo.prototype.goToTeam = function ($event, tournament) {
        //this.nav.push(TournamentTeams, tournament);
    };
    TeamDetailDemo.prototype.addToFavourites = function () {
        var _this = this;
        this.storage.get('favTeamId').then(function (val) {
            _this.isFavouriteArray.push(val);
            _this.isFavouriteArray.push(_this.teamId);
        });
        this.storage.set('favTeamId', this.isFavouriteArray);
    };
    TeamDetailDemo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'team-detail',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teamDetailDemo\teamDetailDemo.html"*/'<ion-header>\n\n        <ion-navbar color="danger">\n\n            <ion-title>Teams</ion-title>\n\n        </ion-navbar>\n\n      \n\n      </ion-header>\n\n          \n\n         <ion-content>\n\n           <ion-card center text center>\n\n                <ion-row>\n\n                    <ion-col>\n\n                        <h1>{{title}}</h1>\n\n                        <!-- <h3 padding>Division: {{team.division}}</h3> -->\n\n                        <h3 padding>Coach: {{teamCoach}}</h3>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <ion-row>\n\n                    <ion-col width-75>\n\n                        <h2 padding>Add to Favourite</h2>\n\n                    </ion-col>\n\n                    <ion-col width-25>\n\n                        <ion-toggle padding item-right (ionChange)="addToFavourites()" [(ngModel)]="isFavourite" checked="isFavourite"></ion-toggle>\n\n                    </ion-col>\n\n                </ion-row>\n\n            </ion-card>\n\n\n\n            <ion-card>\n\n                    <ion-list>\n\n                        <ion-card-header>\n\n                            <h1>Previous Matches</h1>\n\n                        </ion-card-header>\n\n                        <ion-row>\n\n                            <ion-col>\n\n                                <!-- <ion-item *ngFor="let game of allGames" (click)="gameClicked($event,game)">\n\n                                    <ion-row>\n\n                                        <ion-col width-20>\n\n                                            <p>{{game.time | date:\'M/d/yy\'}}</p>\n\n                                            <p>{{game.time | date:\'shortTime\'}}</p>\n\n                                        </ion-col>\n\n                                        <ion-col width-70>\n\n                                            <p>{{game.opponent}}</p>\n\n                                        </ion-col>\n\n                                        <ion-col width-10>\n\n                                            <ion-badge item-right [color]="getWinOrLossClass(game)">{{winOrLossBadge(game)}}</ion-badge>\n\n                                        </ion-col>\n\n                                    </ion-row>\n\n                                </ion-item> -->\n\n                            </ion-col>\n\n                        </ion-row>\n\n                    </ion-list>\n\n                </ion-card>\n\n          \n\n         </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teamDetailDemo\teamDetailDemo.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__app_shared_db_service__["a" /* Dbservice */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* ModalController */]])
    ], TeamDetailDemo);
    return TeamDetailDemo;
}());
//# sourceMappingURL=teamDetailDemo.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TournamentDemo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_shared_db_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_add_tournament_page__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tournamentTeamsDemo_tournamentTeams__ = __webpack_require__(425);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TournamentDemo = (function () {
    //updatedData = [];
    function TournamentDemo(nav, tournamentService, _loadingController, alertCtrl, modalCtrl) {
        this.nav = nav;
        this.tournamentService = tournamentService;
        this._loadingController = _loadingController;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
    }
    TournamentDemo.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Loading...'
        });
        loader.present().then(function () {
            _this.tournamentService.getTournaments().then(function (data) {
                //console.log(data);
                _this.tournaments = data;
                loader.dismiss();
            });
        });
    };
    TournamentDemo.prototype.presentAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: this.error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    TournamentDemo.prototype.presentConfirm = function (tournament) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.deleteTournament(tournament);
                    }
                }
            ]
        });
        alert.present();
    };
    TournamentDemo.prototype.addTournament = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Adding...'
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_add_tournament_page__["a" /* AddTournamentPage */], {});
        modal.onDidDismiss(function (tournament) {
            if (tournament) {
                loader.present().then(function () {
                    _this.tournamentService.createTournament(tournament).then(function (data) {
                        // Error handling
                        if (data.errors) {
                            _this.error = data.errors.title.message;
                            // Show Alert with error message
                            _this.presentAlert("Error", _this.error);
                        }
                        else {
                            _this.tournaments.push(tournament);
                        }
                    }).then(function () {
                        _this.tournamentService.getTournaments().then(function (data) {
                            //console.log(data);
                            _this.tournaments = data;
                            loader.dismiss();
                        });
                    });
                });
            }
        });
        //this.nav.push(TournamentDemo);
        modal.present();
    };
    TournamentDemo.prototype.getTournamentById = function (tournament) {
        var _this = this;
        //console.log('tournament: ' + JSON.stringify(tournament))
        this.tournamentService.getTournamentById(tournament._id).then(function (res) {
            //console.log(res);
            var data = {
                title: tournament.title,
                description: tournament.description,
                selectedTeams: tournament.selectedTeams,
                tournamentId: tournament._id,
                toolbarTitle: "Edit Tournament"
            };
            //this.title = tournament.title;
            //this.description = tournament.description;
            //this.updatedData = [];
            //this.updatedData.push(data);
            //console.log(tournament);
            _this.editTournament(tournament._id, data);
        });
    };
    TournamentDemo.prototype.editTournament = function (id, newData) {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Editing...'
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_add_tournament_page__["a" /* AddTournamentPage */], newData);
        modal.onDidDismiss(function (tournament) {
            if (tournament) {
                loader.present().then(function () {
                    _this.tournamentService.updateTournament(id, tournament).then(function (data) {
                        _this.tournaments = data;
                        loader.dismiss();
                    });
                });
            }
        });
        modal.present();
    };
    TournamentDemo.prototype.deleteTournament = function (tournament) {
        //Remove locally
        var index = this.tournaments.indexOf(tournament);
        if (index > -1) {
            this.tournaments.splice(index, 1);
        }
        //Remove from database
        this.tournamentService.deleteTournament(tournament._id);
    };
    TournamentDemo.prototype.goToTournament = function ($event, tournament) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__tournamentTeamsDemo_tournamentTeams__["a" /* TournamentTeams */], { tournament: tournament });
    };
    TournamentDemo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'tournaments-demo',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\tournamentsDemo\tournaments-demo.html"*/' <ion-header>\n\n  <ion-navbar color="danger">\n\n      <ion-title>Manage Tournaments</ion-title>\n\n      <ion-buttons end>\n\n        <button ion-button icon-only (click)="addTournament()"><ion-icon name="add"></ion-icon></button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n    \n\n   <ion-content>\n\n    \n\n     <ion-list no-lines>\n\n       <ion-item-sliding *ngFor="let tournament of tournaments">\n\n    \n\n         <ion-item>\n\n    \n\n           <ion-avatar item-left>\n\n             <img src="https://api.adorable.io/avatars/75/{{tournament.title}}">\n\n           </ion-avatar>\n\n           <button ion-item (click)="goToTournament($event,tournament)">\n\n              {{tournament.title}}\n\n          </button>\n\n           <!-- <h2>{{tournament.title}}</h2> -->\n\n           <p>{{tournament.description}}</p>\n\n    \n\n           <!-- <ion-icon *ngIf="tournament.rating < 50" danger name="sad"></ion-icon>\n\n           <ion-icon *ngIf="tournament.rating >= 50" secondary name="happy"></ion-icon>\n\n           {{tournament.rating}} -->\n\n    \n\n         </ion-item>\n\n    \n\n         <ion-item>\n\n           <button ion-button color="danger" (click)="presentConfirm(tournament)">\n\n             <ion-icon name="trash"></ion-icon>\n\n             Delete\n\n           </button>\n\n           <button ion-button color="secondary" (click)="getTournamentById(tournament)">\n\n            Edit\n\n          </button>\n\n         </ion-item>\n\n       </ion-item-sliding>\n\n    \n\n     </ion-list>\n\n    \n\n   </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\tournamentsDemo\tournaments-demo.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__app_shared_db_service__["a" /* Dbservice */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */]])
    ], TournamentDemo);
    return TournamentDemo;
}());
//# sourceMappingURL=tournaments-demo.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsDemo; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_shared_db_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_add_teams_page__ = __webpack_require__(424);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TeamsDemo = (function () {
    //updatedData = [];
    function TeamsDemo(nav, teamService, alertCtrl, _loadingController, modalCtrl) {
        this.nav = nav;
        this.teamService = teamService;
        this.alertCtrl = alertCtrl;
        this._loadingController = _loadingController;
        this.modalCtrl = modalCtrl;
    }
    TeamsDemo.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Loading...'
        });
        loader.present().then(function () {
            _this.teamService.getTeams().then(function (data) {
                //console.log(data);
                _this.teams = data;
                loader.dismiss();
            });
        });
    };
    TeamsDemo.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.teamService.getTeams().then(function (data) {
            //console.log(data);
            _this.teams = data;
        });
    };
    TeamsDemo.prototype.presentAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: this.error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    TeamsDemo.prototype.presentConfirm = function (team) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delete',
            message: 'Do you want to delete this item?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Delete',
                    handler: function () {
                        _this.deleteTeam(team);
                    }
                }
            ]
        });
        alert.present();
    };
    TeamsDemo.prototype.addTeam = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Adding...'
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_add_teams_page__["a" /* AddTeamsPage */], {});
        modal.onDidDismiss(function (team) {
            if (team) {
                loader.present().then(function () {
                    _this.teamService.createTeam(team).then(function (data) {
                        // Error handling
                        if (data.errors) {
                            _this.error = data.errors.title.message;
                            // Show Alert with error message
                            _this.presentAlert("Error", _this.error);
                        }
                        else {
                            _this.teams.push(team);
                        }
                    }).then(function (msg) {
                        //console.log("The msg 2 is: " + msg)
                        _this.teamService.getTeams().then(function (data) {
                            //console.log(data);
                            _this.teams = data;
                            loader.dismiss();
                        });
                    });
                });
            }
        });
        modal.present();
    };
    TeamsDemo.prototype.getTeamById = function (team) {
        var _this = this;
        this.teamService.getTeamById(team._id).then(function (res) {
            var data = {
                title: team.title,
                coach: team.coach,
                favourite: team.favourite,
                toolbarTitle: "Edit Team"
            };
            _this.editTeam(team._id, data);
        });
    };
    TeamsDemo.prototype.editTeam = function (id, newData) {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Editing...'
        });
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_add_teams_page__["a" /* AddTeamsPage */], newData);
        modal.onDidDismiss(function (team) {
            if (team) {
                loader.present().then(function () {
                    _this.teamService.updateTeam(id, team).then(function (data) {
                        _this.teams = data;
                        loader.dismiss();
                    });
                });
            }
        });
        modal.present();
    };
    TeamsDemo.prototype.deleteTeam = function (team) {
        //Remove locally
        var index = this.teams.indexOf(team);
        if (index > -1) {
            this.teams.splice(index, 1);
        }
        //Remove from database
        this.teamService.deleteTeam(team._id);
    };
    TeamsDemo = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'teams-demo',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teamsDemo\teams-demo.html"*/' <ion-header>\n\n  <ion-navbar color="danger">\n\n      <ion-title>Manage Teams</ion-title>\n\n      <ion-buttons end>\n\n        <button ion-button icon-only (click)="addTeam()"><ion-icon name="add"></ion-icon></button>\n\n      </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n    \n\n   <ion-content>\n\n    \n\n     <ion-list no-lines>\n\n       <ion-item-sliding *ngFor="let team of teams">\n\n    \n\n         <ion-item>\n\n    \n\n           <h2>{{team.title}}</h2>\n\n           <p>{{team.coach}}</p>\n\n    \n\n         </ion-item>\n\n    \n\n         <ion-item>\n\n           <button ion-button color="danger" (click)="presentConfirm(team)">\n\n             <ion-icon name="trash"></ion-icon>\n\n             Delete\n\n           </button>\n\n           <button ion-button color="secondary" (click)="getTeamById(team)">\n\n            Edit\n\n          </button>\n\n         </ion-item>\n\n       </ion-item-sliding>\n\n    \n\n     </ion-list>\n\n    \n\n   </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teamsDemo\teams-demo.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_0__app_shared_db_service__["a" /* Dbservice */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */]])
    ], TeamsDemo);
    return TeamsDemo;
}());
//# sourceMappingURL=teams-demo.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_auth__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__myTeams_my_teams_page__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup_page__ = __webpack_require__(456);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = (function () {
    function LoginPage(navCtrl, menuCtrl, authService, formBuilder, alertCtrl, toastCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.loginForm = formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.showLoader();
        //Check if already authenticated
        this.authService.checkAuthentication().then(function (res) {
            console.log("Already authorized");
            _this.loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__myTeams_my_teams_page__["a" /* MyTeamPage */]);
            _this.menuCtrl.enable(true, 'authenticated');
            _this.menuCtrl.enable(false, 'unauthenticated');
        }, function (err) {
            console.log("Not already authorized");
            _this.loading.dismiss();
        });
    };
    LoginPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Logged in successfully',
            duration: 4000,
            position: 'top'
        });
        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });
        toast.present();
    };
    LoginPage.prototype.presentAlert = function (title, subtitle) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: this.error,
            buttons: ['Dismiss']
        });
        alert.present();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoader();
        var credentials = {
            email: this.email,
            password: this.password
        };
        this.authService.login(credentials).then(function (result) {
            _this.loading.dismiss();
            console.log(result);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__myTeams_my_teams_page__["a" /* MyTeamPage */]);
            _this.menuCtrl.enable(true, 'authenticated');
            _this.menuCtrl.enable(false, 'unauthenticated');
            _this.presentToast();
        }, function (err) {
            _this.error = "The email or password you've entered doesn't match any account.";
            _this.loading.dismiss();
            _this.presentAlert("Login Error:", _this.error);
            console.log(err);
        });
    };
    LoginPage.prototype.launchSignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup_page__["a" /* SignupPage */]);
    };
    LoginPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login.page',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\login\login.page.html"*/'<ion-header>\n\n        <ion-navbar color="danger">\n\n            <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n            <ion-title>Login</ion-title>\n\n        </ion-navbar>\n\n    </ion-header>\n\n     \n\n    <ion-content>\n\n     <form [formGroup]="loginForm">\n\n        <ion-row class="login-form">\n\n            <ion-col>\n\n                <ion-list inset>\n\n     \n\n                  <ion-item>\n\n                    <ion-label><ion-icon name="person"></ion-icon></ion-label>\n\n                    <ion-input formControlName="email" [(ngModel)]="email" placeholder="email" type="text"></ion-input>\n\n                  </ion-item>\n\n                  <ion-item *ngIf="!loginForm.controls.email.valid  && (loginForm.controls.password.dirty || submitAttempt)">\n\n                        <p>Please enter a valid email.</p>\n\n                    </ion-item>\n\n     \n\n                  <ion-item>\n\n                    <ion-label><ion-icon name="lock"></ion-icon></ion-label>\n\n                    <ion-input formControlName="password" [(ngModel)]="password" placeholder="password" type="password"></ion-input>\n\n                  </ion-item>\n\n                  <ion-item *ngIf="!loginForm.controls.password.valid  && (loginForm.controls.password.dirty || submitAttempt)">\n\n                        <p>The password must be minimum 6 symbols.</p>\n\n                    </ion-item>\n\n     \n\n                </ion-list>\n\n     \n\n                <button ion-button full [disabled]="!loginForm.valid"  (click)="login()" color="primary" class="login-button">Login</button>\n\n     \n\n            </ion-col>\n\n        </ion-row>\n\n    \n\n        <ion-row>\n\n            <ion-col>\n\n                <button ion-button (click)="launchSignup()" class="create-account">Create an Account</button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </form>\n\n    </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\login\login.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__app_shared_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());
//# sourceMappingURL=login.page.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Game; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_exports__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Game = (function () {
    function Game(navCtrl, navParams, _tournamentService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._tournamentService = _tournamentService;
        this.gameData = navParams.data;
    }
    Game.prototype.goToNavigation = function () {
        var tourneyData = this._tournamentService.getCurrentTournamentDetails();
        var location = tourneyData.locations[this.gameData.locationUrl];
        console.log(location);
        window.location = "geo:" + location.latitude + "," + location.longitude + ";u=35;";
    };
    Game.prototype.goToMap = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_exports__["b" /* MapPage */], this.gameData);
    };
    Game = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tournament',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\game\game.page.html"*/'<ion-header>\n\n    <ion-navbar color="danger">\n        <ion-title>Game</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n    <ion-card>\n        <ion-card-header>\n            <h1>{{gameData.team1}} {{gameData.homeAway}} {{gameData.team2}}</h1>\n            <h2>\n                <ion-icon name="calendar"></ion-icon> {{1468051200000 | date:\'dd MMM-yyyy\'}}\n            </h2>\n            <h1>Score: {{gameData.team1Score}} : {{gameData.team2Score}}</h1>\n        </ion-card-header>\n        <ion-card-content>\n            <ion-row>\n                <ion-col width-60>\n                    <h1>at {{gameData.location}}</h1>\n                </ion-col>\n                <ion-col width-20>\n                    <button outline round ion-button (click)="goToMap()"><ion-icon name="map"></ion-icon></button>\n                </ion-col>\n                <ion-col width-20>\n                    <button outline round ion-button (click)="goToNavigation()"><ion-icon name="navigate"></ion-icon></button>\n                </ion-col>\n            </ion-row>\n        </ion-card-content>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\game\game.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__["b" /* TournamentService */]])
    ], Game);
    return Game;
}());
//# sourceMappingURL=game.page.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_auth__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__myTeams_my_teams_page__ = __webpack_require__(259);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupPage = (function () {
    function SignupPage(navCtrl, menuCtrl, formBuilder, toastCtrl, authService, loadingCtrl) {
        // this.signupForm = new FormGroup({
        //   loginEmail: new FormControl('', [Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required]),
        //   loginPass: new FormControl('', Validators.required)
        // });
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        this.authService = authService;
        this.loadingCtrl = loadingCtrl;
        this.signupForm = formBuilder.group({
            signupEmail: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])],
            signupPass: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required])]
        });
    }
    SignupPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Your account has been created successfully. Welcome to the Tournaments!',
            duration: 5000,
            position: 'top'
        });
        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });
        toast.present();
    };
    SignupPage.prototype.register = function () {
        var _this = this;
        this.showLoader();
        var details = {
            email: this.signupEmail,
            password: this.signupPass,
            role: this.role
        };
        this.authService.createAccount(details).then(function (result) {
            _this.loading.dismiss();
            console.log(result);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__myTeams_my_teams_page__["a" /* MyTeamPage */]);
            _this.menuCtrl.enable(true, 'authenticated');
            _this.menuCtrl.enable(false, 'unauthenticated');
            _this.presentToast();
        }, function (err) {
            _this.loading.dismiss();
        });
    };
    SignupPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'signup.page',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\signup\signup.page.html"*/'<ion-header>\n\n \n\n        <ion-navbar color="secondary">\n\n          <ion-title>Create Account</ion-title>\n\n        </ion-navbar>\n\n       \n\n      </ion-header>\n\n       \n\n       \n\n      <ion-content padding>\n\n        <div [formGroup]="signupForm"> \n\n          <ion-row class="account-form">\n\n              <ion-col>\n\n                  <ion-list inset>\n\n       \n\n                      <ion-item>\n\n                          <ion-label><ion-icon name="mail"></ion-icon></ion-label>\n\n                          <ion-input name="signupEmail" formControlName="signupEmail" [(ngModel)]="signupEmail" placeholder="Email" type="email"></ion-input>\n\n                      </ion-item>\n\n                      <ion-item *ngIf="!signupForm.controls.signupEmail.valid  && (signupForm.controls.signupPass.dirty || submitAttempt)">\n\n                            <p>Please enter a valid email.</p>\n\n                        </ion-item>\n\n       \n\n                      <ion-item>\n\n                          <ion-label><ion-icon name="lock"></ion-icon></ion-label>\n\n                          <ion-input name="signupPass" formControlName="signupPass" [(ngModel)]="signupPass" placeholder="Password" type="password"></ion-input>\n\n                      </ion-item>\n\n                      <ion-item *ngIf="!signupForm.controls.signupPass.valid  && (signupForm.controls.signupPass.dirty || submitAttempt)">\n\n                            <p>The password must be minimum 6 symbols.</p>\n\n                        </ion-item>\n\n       \n\n                      <ion-item>\n\n                          <ion-label>Role</ion-label>\n\n                          <ion-select [(ngModel)]="role" [ngModelOptions]="{standalone: true}">\n\n                              <ion-option value="reader">Reader</ion-option>\n\n                              <ion-option value="creator">Creator</ion-option>\n\n                              <ion-option value="editor">Editor</ion-option>\n\n                          </ion-select>\n\n                      </ion-item>\n\n       \n\n                  </ion-list>\n\n       \n\n                  <button ion-button (click)="register()" [disabled]="!signupForm.valid"  class="continue-button">Register</button>\n\n       \n\n              </ion-col>\n\n          </ion-row>\n\n        </div>\n\n      </ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\signup\signup.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__app_shared_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], SignupPage);
    return SignupPage;
}());
//# sourceMappingURL=signup.page.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(563);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_add_add_tournament_page__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_add_add_teams_page__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_tournamentTeamsDemo_tournamentTeams__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tournamentsDemo_tournaments_demo__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_teamDetailDemo_teamDetailDemo__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_teamsDemo_teams_demo__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login_page__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup_page__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_db_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_storage__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_google_maps_core__ = __webpack_require__(887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__shared_shared_pages__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__shared_auth__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_9__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["c" /* MyTeamPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_add_add_tournament_page__["a" /* AddTournamentPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_add_add_teams_page__["a" /* AddTeamsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["h" /* TournamentPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_tournamentsDemo_tournaments_demo__["a" /* TournamentDemo */],
                __WEBPACK_IMPORTED_MODULE_2__pages_tournamentTeamsDemo_tournamentTeams__["a" /* TournamentTeams */],
                __WEBPACK_IMPORTED_MODULE_4__pages_teamDetailDemo_teamDetailDemo__["a" /* TeamDetailDemo */],
                __WEBPACK_IMPORTED_MODULE_5__pages_teamsDemo_teams_demo__["a" /* TeamsDemo */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login_page__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup_page__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["g" /* TeamsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["e" /* TeamDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["a" /* Game */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["d" /* StandingPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["f" /* TeamHomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["b" /* MapPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_10__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_11__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_13_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_18_angular2_google_maps_core__["AgmCoreModule"].forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM' }),
                __WEBPACK_IMPORTED_MODULE_15__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12__angular_http__["c" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_13_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["c" /* MyTeamPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_add_add_tournament_page__["a" /* AddTournamentPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_add_add_teams_page__["a" /* AddTeamsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["h" /* TournamentPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_tournamentsDemo_tournaments_demo__["a" /* TournamentDemo */],
                __WEBPACK_IMPORTED_MODULE_2__pages_tournamentTeamsDemo_tournamentTeams__["a" /* TournamentTeams */],
                __WEBPACK_IMPORTED_MODULE_4__pages_teamDetailDemo_teamDetailDemo__["a" /* TeamDetailDemo */],
                __WEBPACK_IMPORTED_MODULE_5__pages_teamsDemo_teams_demo__["a" /* TeamsDemo */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["g" /* TeamsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_login_login_page__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_signup_signup_page__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["e" /* TeamDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["a" /* Game */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["d" /* StandingPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["f" /* TeamHomePage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pages_exports__["b" /* MapPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_20__shared_shared_pages__["b" /* TournamentService */],
                __WEBPACK_IMPORTED_MODULE_12__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_20__shared_shared_pages__["a" /* FavouriteTournamentService */],
                __WEBPACK_IMPORTED_MODULE_21__shared_auth__["a" /* Auth */],
                __WEBPACK_IMPORTED_MODULE_8__shared_db_service__["a" /* Dbservice */],
                { provide: __WEBPACK_IMPORTED_MODULE_9__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_13_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TournamentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TournamentService = (function () {
    function TournamentService(_http) {
        this._http = _http;
        this.baseUrl = 'https://tournament-mobileapp-ionic2.firebaseio.com/';
        this.currentTournamentData = {};
    }
    TournamentService.prototype.getTournament = function () {
        var _this = this;
        var apiUrl = '/tournaments.json';
        return new Promise(function (resolve) {
            _this._http.get(_this.baseUrl + apiUrl).subscribe(function (res) { return resolve(res.json()); });
        });
    };
    ;
    TournamentService.prototype.getCurrentTournamentData = function (tournamentId) {
        var _this = this;
        return this._http.get(this.baseUrl + "/tournaments-data/" + tournamentId + ".json")
            .map(function (response) {
            _this.currentTournamentData = response.json();
            return _this.currentTournamentData;
        });
    };
    TournamentService.prototype.getCurrentTournamentDetails = function () {
        return this.currentTournamentData;
    };
    TournamentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], TournamentService);
    return TournamentService;
}());
//# sourceMappingURL=tournament-api.service.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tournament_api_service__ = __webpack_require__(604);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__tournament_api_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__favourite_teams_service__ = __webpack_require__(877);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__favourite_teams_service__["a"]; });


//# sourceMappingURL=shared-pages.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_game_page__ = __webpack_require__(430);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__game_game_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__myTeams_my_teams_page__ = __webpack_require__(259);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__myTeams_my_teams_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__teamDetail_team_detail_page__ = __webpack_require__(878);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__teamDetail_team_detail_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__teams_teams_page__ = __webpack_require__(879);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__teams_teams_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tournament_tournament__ = __webpack_require__(880);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_4__tournament_tournament__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Standings_standing_page__ = __webpack_require__(881);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__Standings_standing_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TeamHome_team_home_page__ = __webpack_require__(882);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_6__TeamHome_team_home_page__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__map_map_page__ = __webpack_require__(883);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7__map_map_page__["a"]; });








//# sourceMappingURL=pages_exports.js.map

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dbservice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Dbservice = (function () {
    function Dbservice(http) {
        this.http = http;
        this.apiUrl = 'https://tournamentsapi.azurewebsites.net/api';
        this.data = null;
    }
    // Tournaments
    Dbservice.prototype.getTournaments = function () {
        // if (this.data) {
        //   return Promise.resolve(this.data);
        // }
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + "/tournaments")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    Dbservice.prototype.getTournamentById = function (_id) {
        var _this = this;
        return new Promise(function (resolve) {
            return _this.http.get(_this.apiUrl + "/tournaments/" + _id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    Dbservice.prototype.createTournament = function (tournament) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve) {
            return _this.http.post(_this.apiUrl + "/tournaments", JSON.stringify(tournament), { headers: headers })
                .map(function (res) {
                //console.log(res.json())
                return res.json();
            })
                .subscribe(function (data) {
                if (data.message != undefined) {
                    // Error handling
                    // Get response from the server
                    _this.error = data;
                    resolve(_this.error);
                }
                _this.data = data;
                resolve(_this.data);
            });
        })
            .then(function (msg) {
            return msg;
        });
    };
    Dbservice.prototype.updateTournament = function (_id, newData) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve) {
            return _this.http.post(_this.apiUrl + "/tournaments/" + _id, JSON.stringify(newData), { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    Dbservice.prototype.deleteTournament = function (_id) {
        this.http.delete(this.apiUrl + "/tournaments/" + _id).subscribe(function (res) {
            console.log(res.json());
        });
    };
    // Teams
    Dbservice.prototype.getTeams = function () {
        // if (this.data) {
        //   return Promise.resolve(this.data);
        // }
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + "/teams")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    Dbservice.prototype.getTournamentTeams = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + "/teams")
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    Dbservice.prototype.getTeamById = function (_id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(_this.apiUrl + "/teams/" + _id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    Dbservice.prototype.createTeam = function (team) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve, reject) {
            return _this.http.post(_this.apiUrl + "/teams", JSON.stringify(team), { headers: headers })
                .map(function (res) {
                //console.log(res.json())
                return res.json();
            })
                .subscribe(function (data) {
                if (data.message != undefined) {
                    // Error handling
                    // Get response from the server
                    _this.error = data;
                    resolve(_this.error);
                }
                _this.data = data;
                resolve(_this.data);
            });
        })
            .then(function (msg) {
            return msg;
        });
    };
    Dbservice.prototype.updateTeam = function (_id, newData) {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return new Promise(function (resolve) {
            return _this.http.post(_this.apiUrl + "/teams/" + _id, JSON.stringify(newData), { headers: headers })
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    Dbservice.prototype.deleteTeam = function (_id) {
        this.http.delete(this.apiUrl + "/teams/" + _id).subscribe(function (res) {
            console.log(res.json());
        });
    };
    Dbservice = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], Dbservice);
    return Dbservice;
}());
//# sourceMappingURL=db.service.js.map

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavouriteTournamentService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FavouriteTournamentService = (function () {
    function FavouriteTournamentService() {
        this.favTeams = [
            {
                team: { id: 812, name: "Baltimore Stars", coach: "James", division: "6th grade" },
                tournamentId: "3dd50aaf-6b03-4497-b074-d81703f07ee8",
                tournamentName: "Cager Classic"
            },
            {
                team: { id: 6157, name: "Baltimore Elite 5th", coach: "Brian Jackson", division: "5th Black" },
                tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
                tournamentName: "Cager Classic"
            }
        ];
    }
    FavouriteTournamentService.prototype.addNewFavourite = function (team, tournamentId, tournamentName) {
        var newEntry = {
            team: team,
            tournamentId: tournamentId,
            tournamentName: tournamentName
        };
        this.favTeams.push(newEntry);
    };
    FavouriteTournamentService.prototype.removeFromFavourites = function (teamId) {
        for (var i = 0; i < this.favTeams.length; i++) {
            if (this.favTeams[i].team.id === teamId) {
                this.favTeams.splice(i - 1, 1);
            }
        }
        console.log(this.favTeams);
    };
    FavouriteTournamentService.prototype.getTheFavourites = function () {
        return this.favTeams;
    };
    FavouriteTournamentService.prototype.getIsFollowing = function (teamId) {
        var isFollowing = false;
        for (var i = 0; i < this.favTeams.length; i++) {
            if (this.favTeams[i].team.id === teamId) {
                isFollowing = true;
                break;
            }
            else {
                isFollowing = false;
            }
        }
        return isFollowing;
    };
    FavouriteTournamentService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], FavouriteTournamentService);
    return FavouriteTournamentService;
}());
//# sourceMappingURL=favourite-teams.service.js.map

/***/ }),

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_pages__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__game_game_page__ = __webpack_require__(430);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TeamDetailsPage = (function () {
    function TeamDetailsPage(navCtrl, navParams, _tournamentService, _toastr, _favouriteTournamentService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._tournamentService = _tournamentService;
        this._toastr = _toastr;
        this._favouriteTournamentService = _favouriteTournamentService;
        this.allGames = [];
        this.team = navParams.data;
    }
    TeamDetailsPage.prototype.ionViewDidLoad = function () {
        var tourn = this.tournamentData = this._tournamentService.getCurrentTournamentDetails();
        var gamesData = tourn.games;
        for (var i = 0; i < gamesData.length; i++) {
            if (gamesData[i].team1Id === this.team.id || gamesData[i].team2Id === this.team.id) {
                if (gamesData[i].team1Id === this.team.id) {
                    var opponentName = gamesData[i].team2;
                    var scoreDisplay = this.getScoreDisplay(gamesData[i].team1Score, gamesData[i].team2Score);
                    var homeAway = "vs";
                }
                else {
                    var opponentName = gamesData[i].team1;
                    var scoreDisplay = this.getScoreDisplay(gamesData[i].team2Score, gamesData[i].team1Score);
                    var homeAway = "at";
                }
                ;
                var gamesObj = {
                    team1: gamesData[i].team1,
                    team2: gamesData[i].team2,
                    gameId: gamesData[i].id,
                    opponent: opponentName,
                    team1Score: gamesData[i].team1Score,
                    team2Score: gamesData[i].team2Score,
                    time: Date.parse(gamesData[i].time),
                    location: gamesData[i].location,
                    locationUrl: gamesData[i].locationId,
                    scoreDisplay: scoreDisplay,
                    homeAway: homeAway
                };
                this.allGames.push(gamesObj);
            }
        }
        //Get isFollowing or not
        this.sliderFlag = this.isFollowing = this._favouriteTournamentService.getIsFollowing(this.team.id);
        console.log(this.isFollowing);
    };
    TeamDetailsPage.prototype.getScoreDisplay = function (team1Score, team2Score) {
        if (team1Score && team2Score) {
            var teamScore = team1Score;
            var opponentScore = team2Score;
            this.winIndicator = teamScore > opponentScore ? "W: " : teamScore === opponentScore ? "D: " : "L: ";
            return this.winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
    };
    TeamDetailsPage.prototype.gameClicked = function ($event, game) {
        this.navCtrl.parent.parent.push(__WEBPACK_IMPORTED_MODULE_3__game_game_page__["a" /* Game */], game);
    };
    TeamDetailsPage.prototype.winOrLossBadge = function (game) {
        return game.scoreDisplay ? game.scoreDisplay[0] : '';
    };
    TeamDetailsPage.prototype.getWinOrLossClass = function (game) {
        return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
    };
    TeamDetailsPage.prototype.addToFavourites = function (team) {
        if (!this.sliderFlag) {
            if (this.isFollowing) {
                this._favouriteTournamentService.addNewFavourite(team, this.tournamentData.tournament.id, this.tournamentData.tournament.name);
            }
            else {
                this._favouriteTournamentService.removeFromFavourites(team.id);
            }
            var toastr = this._toastr.create({
                message: this.toasterMsg(),
                duration: 2000,
                position: 'bottom',
                cssClass: 'primary'
            });
            toastr.present();
        }
        else {
            this.sliderFlag = !this.sliderFlag;
        }
    };
    TeamDetailsPage.prototype.toasterMsg = function () {
        if (this.isFollowing) {
            return 'Added to favourites';
        }
        else {
            return 'Removed from favourites';
        }
    };
    TeamDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tournament',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teamDetail\team-detail.page.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-card center text center>\n        <ion-row>\n            <ion-col>\n                <h3 padding>Division: {{team.division}}</h3>\n                <h3 padding>Coach: {{team.coach}}</h3>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col width-75>\n                <h2 padding>Add to Favourite</h2>\n            </ion-col>\n            <ion-col width-25>\n                <ion-toggle padding item-right (ionChange)="addToFavourites(team)" [(ngModel)]="isFollowing" checked="isFollowing"></ion-toggle>\n            </ion-col>\n        </ion-row>\n    </ion-card>\n    <ion-card>\n        <ion-list>\n            <ion-card-header>\n                <h1>Previous Matches</h1>\n            </ion-card-header>\n            <ion-row>\n                <ion-col>\n                    <ion-item *ngFor="let game of allGames" (click)="gameClicked($event,game)">\n                        <ion-row>\n                            <ion-col width-20>\n                                <p>{{game.time | date:\'M/d/yy\'}}</p>\n                                <p>{{game.time | date:\'shortTime\'}}</p>\n                            </ion-col>\n                            <ion-col width-70>\n                                <p>{{game.opponent}}</p>\n                            </ion-col>\n                            <ion-col width-10>\n                                <ion-badge item-right [color]="getWinOrLossClass(game)">{{winOrLossBadge(game)}}</ion-badge>\n                            </ion-col>\n                        </ion-row>\n                        <!--{{game.opponent}}<span style="float: right">{{game.scoreDisplay}}</span>-->\n                    </ion-item>\n                </ion-col>\n            </ion-row>\n        </ion-list>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teamDetail\team-detail.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_pages__["b" /* TournamentService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_pages__["a" /* FavouriteTournamentService */]])
    ], TeamDetailsPage);
    return TeamDetailsPage;
}());
//# sourceMappingURL=team-detail.page.js.map

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_exports__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TeamsPage = (function () {
    function TeamsPage(navCtrl, navParams, _tournamentService, _loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._tournamentService = _tournamentService;
        this._loadingController = _loadingController;
        this.searchKey = "";
        this.tournamentDetails = this.navParams.data;
    }
    TeamsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Loading...'
        });
        loader.present().then(function () {
            _this._tournamentService.getCurrentTournamentData(_this.tournamentDetails.id)
                .subscribe(function (data) {
                _this.teamsDetails = data.teams;
                _this.teamsDetailsInfo = _this.teamsDetails;
            });
            loader.dismiss();
        });
    };
    TeamsPage.prototype.itemTapped = function ($event, teamDetails) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_exports__["f" /* TeamHomePage */], teamDetails);
    };
    TeamsPage.prototype.updateTeams = function () {
        var searchKeyText = this.searchKey.toLowerCase();
        var updatedTeams = [];
        for (var i = 0; i < this.teamsDetailsInfo.length; i++) {
            if (this.teamsDetailsInfo[i].name.toLowerCase().indexOf(searchKeyText) >= 0) {
                updatedTeams.push(this.teamsDetailsInfo[i]);
            }
            else {
            }
        }
        this.teamsDetails = updatedTeams;
    };
    TeamsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tournament',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teams\teams.page.html"*/'<ion-header>\n\n    <ion-navbar color="danger">\n        <ion-title>{{tournamentDetails.name}} Teams</ion-title>\n    </ion-navbar>\n\n    <ion-navbar>\n        <ion-searchbar placeholder="Search your Teams here" [(ngModel)]="searchKey" (ionInput)="updateTeams(teamsDetails)"></ion-searchbar>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <button ion-item (click)="itemTapped($event,teamDetails)" *ngFor="let teamDetails of teamsDetails">\n            {{teamDetails.name}}\n    </button>\n</ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\teams\teams.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__["b" /* TournamentService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], TeamsPage);
    return TeamsPage;
}());
//# sourceMappingURL=teams.page.js.map

/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TournamentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_exports__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Tournament page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TournamentPage = (function () {
    function TournamentPage(navCtrl, navParams, _tournamentService, _loadingController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._tournamentService = _tournamentService;
        this._loadingController = _loadingController;
    }
    TournamentPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this._loadingController.create({
            content: 'Loading...'
        });
        loader.present().then(function () {
            _this._tournamentService.getTournament().then(function (data) { return _this.tournaments = data; });
            loader.dismiss();
        });
    };
    TournamentPage.prototype.itemTapped = function ($event, tournament) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_exports__["g" /* TeamsPage */], tournament);
    };
    TournamentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tournament',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\tournament\tournament.html"*/'<!--\n  Generated template for the Tournament page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="danger">\n        <ion-title>Pick a Tournament</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-list-header>\n            <h2>Availabe Tournaments</h2>\n        </ion-list-header>\n        <button *ngFor="let tournament of tournaments" ion-item (click)="itemTapped($event,tournament)">\n            {{tournament.name}}\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\tournament\tournament.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_shared_shared_pages__["b" /* TournamentService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], TournamentPage);
    return TournamentPage;
}());
//# sourceMappingURL=tournament.js.map

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StandingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_pages__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var StandingPage = (function () {
    function StandingPage(navCtrl, navParams, _tournamentService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._tournamentService = _tournamentService;
    }
    StandingPage.prototype.ionViewDidLoad = function () {
        this.unsortedTourney = this._tournamentService.getCurrentTournamentDetails().standings;
        this.onOrder();
    };
    StandingPage.prototype.onOrder = function () {
        this.tournamentData = this.unsortedTourney.sort(function (a, b) {
            return b.pointsDiff - a.pointsDiff;
        });
    };
    StandingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-standing',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\Standings\standing.page.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-card>\n\n    </ion-card>\n    <ion-card>\n        <ion-row>\n            <ion-col width-50>Team</ion-col>\n            <ion-col width-15>W</ion-col>\n            <ion-col width-15>L</ion-col>\n            <ion-col width-20>Points Diff</ion-col>\n        </ion-row>\n        <ion-row *ngFor="let tourney of tournamentData">\n            <ion-col width-50>{{tourney.teamName}}</ion-col>\n            <ion-col width-15>{{tourney.wins}}</ion-col>\n            <ion-col width-15>{{tourney.losses}}</ion-col>\n            <ion-col width-20>{{tourney.pointsDiff}}</ion-col>\n        </ion-row>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\Standings\standing.page.html"*/,
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_pages__["b" /* TournamentService */]])
    ], StandingPage);
    return StandingPage;
}());
//# sourceMappingURL=standing.page.js.map

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TeamHomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_exports__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamHomePage = (function () {
    function TeamHomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.teamDetailedTab = __WEBPACK_IMPORTED_MODULE_2__pages_exports__["e" /* TeamDetailsPage */];
        this.standingsTab = __WEBPACK_IMPORTED_MODULE_2__pages_exports__["d" /* StandingPage */];
        this.team = navParams.data;
    }
    TeamHomePage.prototype.goHome = function () {
        this.navCtrl.popToRoot();
    };
    TeamHomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-team-home',template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\TeamHome\team-home.page.html"*/'<ion-header>\n\n    <ion-navbar color="danger">\n        <ion-title>{{team.name}}</ion-title>\n        <ion-buttons end>\n            <button (click)="goHome()">\n                 <ion-icon name="home"></ion-icon>Home\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-tabs>\n    <ion-tab tabTitle="Team" [root]=teamDetailedTab [rootParams]="team" tabIcon="baseball"></ion-tab>\n    <ion-tab tabTitle="Standings" [root]=standingsTab [rootParams]="team" tabIcon="podium"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\TeamHome\team-home.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], TeamHomePage);
    return TeamHomePage;
}());
//# sourceMappingURL=team-home.page.js.map

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_pages__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapPage = (function () {
    function MapPage(navParams, _tournamentService) {
        this.navParams = navParams;
        this._tournamentService = _tournamentService;
        this.map = {
            lat: '',
            lng: '',
            zoom: 15,
            markerLabel: ''
        };
    }
    MapPage.prototype.ionViewDidLoad = function () {
        var games = this.navParams.data;
        var tourneyData = this._tournamentService.getCurrentTournamentDetails();
        var location = tourneyData.locations[games.locationUrl];
        this.map = {
            lat: location.latitude,
            lng: location.longitude,
            zoom: 12,
            markerLabel: games.location
        };
        console.log(this.map);
    };
    MapPage.prototype.getDirections = function () {
        window.location = "geo:" + this.map.lat + "," + this.map.lng + ";u=35";
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\map\map.page.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <ion-title>Map</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="map-page">\n    <ion-fab left bottom>\n        <button ion-fab class="fab-map" (click)="getDirections()">\n            <ion-icon name="navigate"></ion-icon>\n        </button>\n    </ion-fab>\n\n    <sebm-google-map id="map" style="width: 100%;height: 100%;opacity: 0;transition: opacity 150ms ease-in" [latitude]="map.lat" [longitude]="map.lng" [zoom]="map.zoom">\n        <sebm-google-map-marker [latitude]="map.lat" [longitude]="map.lng">\n            <sebm-google-map-info-window>\n                <strong>{{map.markerLabel}}</strong>\n            </sebm-google-map-info-window>\n        </sebm-google-map-marker>\n    </sebm-google-map>\n\n</ion-content>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\pages\map\map.page.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_shared_shared_pages__["b" /* TournamentService */]])
    ], MapPage);
    return MapPage;
}());
//# sourceMappingURL=map.page.js.map

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_pages_exports__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_teamsDemo_teams_demo__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tournamentsDemo_tournaments_demo__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login_page__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_shared_auth__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(164);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(platform, storage, auth, statusBar, menuCtrl, toastCtrl, splashScreen) {
        this.platform = platform;
        this.storage = storage;
        this.auth = auth;
        this.statusBar = statusBar;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_pages_exports__["c" /* MyTeamPage */];
        this.init = false;
        this.user = true;
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            _this.storage.get('token').then(function (res) {
                if (res) {
                    _this.menuCtrl.enable(true, 'authenticated');
                    _this.menuCtrl.enable(false, 'unauthenticated');
                }
                else {
                    _this.menuCtrl.enable(false, 'authenticated');
                    _this.menuCtrl.enable(true, 'unauthenticated');
                }
            });
        });
    };
    MyApp.prototype.goHome = function () {
        this.nav.popToRoot;
    };
    MyApp.prototype.goToTournaments = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_pages_exports__["h" /* TournamentPage */]);
    };
    MyApp.prototype.goToDemoTournaments = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__pages_tournamentsDemo_tournaments_demo__["a" /* TournamentDemo */]);
    };
    MyApp.prototype.goToDemoTeams = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__pages_teamsDemo_teams_demo__["a" /* TeamsDemo */]);
    };
    MyApp.prototype.goToLogin = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_login_login_page__["a" /* LoginPage */]);
    };
    MyApp.prototype.logout = function () {
        this.auth.logout();
        this.user = false;
        this.menuCtrl.enable(false, 'authenticated');
        this.menuCtrl.enable(true, 'unauthenticated');
        this.presentToast();
    };
    MyApp.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Logged out successfully',
            duration: 4000,
            position: 'top'
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]), 
        __metadata('design:type', __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\app\app.html"*/'<ion-menu id="unauthenticated" [content]="content">\n\n    <ion-header color="danger">\n\n        <ion-toolbar>\n\n            <ion-title>Elite Schedule</ion-title>\n\n        </ion-toolbar>\n\n    </ion-header>\n\n    <ion-content>\n\n        <ion-list>\n\n            <ion-list-header>Navigate</ion-list-header>\n\n            <button menuClose ion-item (click)="goHome()">Home</button>\n\n            <button menuClose ion-item (click)="goToTournaments()">Find a Tournament</button>\n\n            <button menuClose ion-item (click)="goToLogin()">Login</button>\n\n        </ion-list>\n\n    </ion-content>\n\n</ion-menu>\n\n\n\n<ion-menu id="authenticated" [content]="content">\n\n        <ion-header color="danger">\n\n            <ion-toolbar>\n\n                <ion-title>Elite Schedule</ion-title>\n\n            </ion-toolbar>\n\n        </ion-header>\n\n    \n\n        <ion-content>\n\n            <ion-list>\n\n                <ion-list-header>Navigate</ion-list-header>\n\n                <button menuClose ion-item (click)="goHome()">Home</button>\n\n                <button menuClose ion-item (click)="goToTournaments()">Find a Tournament</button>\n\n                <button menuClose ion-item (click)="logout()">Logout</button>\n\n            </ion-list>\n\n            <ion-list>\n\n                <ion-list-header>Admin menu</ion-list-header>\n\n                <button menuClose ion-item (click)="goToDemoTournaments()">Manage Tournaments</button>\n\n                <button menuClose ion-item (click)="goToDemoTeams()">Manage Teams</button>\n\n            </ion-list>\n\n        </ion-content>\n\n    \n\n    </ion-menu>\n\n\n\n\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\S.Stoyanov\Desktop\TournamentsApp-with-ionic2\src\app\app.html"*/
        }), 
        __metadata('design:paramtypes', [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_8__app_shared_auth__["a" /* Auth */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map

/***/ })

},[466]);
//# sourceMappingURL=main.js.map