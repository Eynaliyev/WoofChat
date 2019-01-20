import { Component, OnInit } from "@angular/core";
import { HomePage } from "../home/home.page";
import { UserService } from "../shared/services/user.service";
import { AuthService } from "../shared/services/auth.service";
import { LoadingController } from "@ionic/angular";
import { UtilService } from "../shared/services/util.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
	loader: any;

	constructor(
		public loadingCtrl: LoadingController,
		public authSrvc: AuthService,
		public userSrvc: UserService,
		private utilSrvc: UtilService
	) {}

	ngOnInit() {}

	goToHomePage() {
		// this.navCtrl.setRoot(HomePage);
	}
	facebookLogin(lastTry?: boolean): void {
		this.authSrvc
			.signInWithFacebook()
			.then(authData => this.loader.dismiss().then(() => this.goToHomePage()))
			.catch(err => {
				this.handleLoginError(err);
				this.retryLogin(lastTry);
			});
		this.presentLoading();
	}
	retryLogin(lastTry) {
		if (lastTry) {
			return; // do nothing, this was a last try
		} else {
			this.facebookLogin(true);
		}
	}
	handleLoginError(err) {
		this.loader.dismiss().then(() => {
			console.error("login failed: ", err);
			this.utilSrvc.doAlert(err.message, {
				text: "Ok",
				role: "cancel"
			});
		});
	}
	presentLoading() {
		this.loader = this.loadingCtrl.create({
			message: "Authenticating..."
		});
		this.loader.present();
	}
}
