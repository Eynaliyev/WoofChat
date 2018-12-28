import { Component, OnInit } from "@angular/core";
import { HomePage } from "../home/home.page";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
	loader: any;

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public authSrvc: AuthService,
		public userSrvc: UserService,
		private utilSrvc: UtilService
	) {}

	ngOnInit() {}

	goToMeetSomebody() {
		this.navCtrl.setRoot(HomePage);
	}
	facebookLogin(lastTry?: boolean): void {
		const env = this;
		this.authSrvc
			.signInWithFacebook()
			.then(
				authData => {
					this.loader
						.dismiss()
						.then(() => {
							this.userSrvc.setAccessToken(authData["credential"].accessToken);
							this.userSrvc
								.setCurrentUser(authData["user"]["providerData"][0])
								.then(() => env.goToMeetSomebody())
								.catch(err => {
									console.log("Error:", err);
								});
						})
						.catch(err => {
							console.log("Error:", err);
						});
				},
				error =>
					this.loader
						.dismiss()
						.then(() => {
							console.error("login failed: ", error);
							this.utilSrvc.doAlert(error.message, {
								text: "Ok",
								role: "cancel"
							});
						})
						.catch(err => {
							console.log("Error:", err);
						})
			)
			.catch(() => {
				if (lastTry) {
					// do nothing, this was a last try
				} else {
					this.facebookLogin(true);
				}
			});
		this.presentLoading();
	}
	presentLoading() {
		this.loader = this.loadingCtrl.create({
			content: "Authenticating..."
		});
		this.loader.present();
	}
}
