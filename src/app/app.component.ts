import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { LoginPage } from "./login/login.page";
import { User } from "./shared/models/user.model";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html"
})
export class AppComponent {
	public pages: any[] = [];
	public rootPage: any = LoginPage;
	public currentUser: User;

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
