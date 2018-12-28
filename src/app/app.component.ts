import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { LoginPage } from "./login/login.page";
import { User } from "./shared/models/user.model";
import { HomePage } from "./home/home.page";
import { ContactsPage } from "./contacts/contacts.page";
import { MyProfilePage } from "./my-profile/my-profile.page";
import * as firebase from "firebase";
import { UserService } from "./shared/services/user.service";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
	public pages: any[] = [
		{
			title: "Meet people Nearby",
			component: HomePage,
			icon: "ios-locate-outline"
		},
		{
			title: "Contacts",
			component: ContactsPage,
			icon: "ios-chatboxes-outline"
		},
		{
			title: "Edit Profile",
			component: MyProfilePage,
			icon: "ios-contacts-outline"
		}
	];
	public rootPage: any = LoginPage;
	public currentUser: User;
	private activePage: any;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private authSrvc: AuthService,
		private userSrvc: UserService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
	ngOnInit() {
		firebase.auth().onAuthStateChanged(
			user => {
				if (user) {
					this.userSrvc
						.setCurrentUser(user["providerData"][0])
						.then(() => {
							return this.userSrvc
								.getCurrentUser()
								.take(2)
								.subscribe(
									result => {
										if (result) {
											this.currentUser = result;
											console.log("current user :", this.currentUser);
											this.rootPage = HomePage;
										} else {
											this.rootPage = LoginPage;
										}
									},
									err => {
										console.error(err);
									}
								);
						})
						.catch(err => {
							console.error("Error:", err);
							this.rootPage = LoginPage;
						});
				} else {
					this.rootPage = LoginPage;
				}
			},
			err => {
				console.error(err);
				this.rootPage = LoginPage;
			}
		);
	}
}
