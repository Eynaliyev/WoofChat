import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { LoginPage } from "./login/login.page";
import { User } from "./shared/models/user.model";
import { HomePage } from "./home/home.page";
import { ContactsPage } from "./contacts/contacts.page";
import { MyProfilePage } from "./my-profile/my-profile.page";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html"
})
export class AppComponent {
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
		private statusBar: StatusBar
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
