import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import * as firebase from "firebase";
import { UserService } from "./user.service";
import { User } from "../models/user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import {
	AngularFirestore,
	AngularFirestoreDocument
} from "@angular/fire/firestore";
/*
  Generated class for the AuthService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable({
	providedIn: "root"
})
export class AuthService {
	constructor(
		public http: Http,
		private _firebaseAuth: AngularFireAuth,
		public userService: UserService,
		private afs: AngularFirestore
	) {
		console.log("Hello AuthService");
	}
	signInWithFacebook(): Promise<User> {
		let authData;
		// check for platform if web return a promise,
		if (document.URL.includes("https://") || document.URL.includes("http://")) {
			console.log("we're in the browser");
			const provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope("email");
			provider.addScope("public_profile");
			if (
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				)
			) {
				// some code..
				console.log("we're on mobile");
				authData = this._firebaseAuth.auth.signInWithPopup(provider);
			} else {
				console.log("we're on desktop");
				authData = this._firebaseAuth.auth.signInWithPopup(provider);
			}
			const accessToken = authData["credential"].accessToken;
			const userData = authData["user"]["providerData"][0];
			this.userService.setAccessToken(accessToken);
			this.userService.setCurrentUser(userData);
			return new Promise((res, rej) => {
				res(userData);
			});
		} else {
			// code for handling fb login when deployed to device with cordova
			console.log("we're on the device natively");
		}
	}
	logout(): Promise<any> {
		localStorage.removeItem("currentUser");
		return firebase.auth().signOut();
	}
	public get(path: string): Promise<AngularFirestoreDocument<{}>> {
		return new Promise(res => {
			res(this.afs.doc(path));
		});
	}
}
