import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { User, Photo } from "../models/user.model";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";
import * as moment from "moment";
import { UtilService } from "./util.service";

@Injectable({
	providedIn: "root"
})
export class UserService {
	public currentUser: BehaviorSubject<User>;
	private access_token = ``;

	constructor(
		public http: HttpClient,
		private afs: AngularFirestore,
		private db: AngularFireDatabase,
		public utilSrvc: UtilService
	) {}
	getUserById(id: string): Observable<any> {
		return this.afs.doc(`/users/${id}`).valueChanges();
	}
	getCurrentUser(): BehaviorSubject<User> {
		return this.currentUser;
	}
	setAccessToken(token): void {
		this.access_token = token;
	}
	setCurrentUser(usr): Promise<any> {
		const uid = usr["uid"];
		return new Promise<any>(resolve => {
			this.getUserById(uid).subscribe(
				user => {
					if (user) {
						const parsedUser = this.toUser(user);
						this.currentUser
							? this.currentUser.next(parsedUser)
							: (this.currentUser = new BehaviorSubject(parsedUser));
						localStorage.setItem("currentUser", JSON.stringify(user));
						resolve(true);
					} else {
						this.fetchGraphData()
							.then(parsedData => {
								this.createUser(parsedData)
									.then(() => resolve(true))
									.catch(error => this.handleError(error));
							})
							.catch(err => {
								this.handleError(err);
							});
					}
				},
				error => {
					this.handleError(error);
				}
			);
		});
	}
	fetchGraphData(): Promise<any> {
		const url = `https://graph.facebook.com/v2.12/me?access_token=${
			this.access_token
		}&fields=id,name,gender,locale,picture.type(large),email,first_name,last_name,birthday`;
		return new Promise<any>(resolve => {
			this.http.get(url).subscribe(
				userInfo => {
					console.log("user info from fb api: ", JSON.stringify(userInfo));
					const parsedData = JSON.parse(userInfo["_body"]);
					resolve(parsedData);
				},
				err => {
					this.handleError(err);
				}
			);
		});
	}
	mapFbtoModel(data): User {
		const photosData = this.parsePhotosData(data);
		const profilePhotoData = this.parseFBProfilePhotoData(data);
		const res = {
			about: data.about ? data.about : "",
			birthday: data.birthday ? data.birthday : "",
			currentCoords: data.currentCoords ? data.currentCoords : [],
			email: data.email ? data.email : "",
			firstName: data.first_name ? data.first_name : "",
			gender: data.gender ? data.gender : "",
			id: data.id ? data.id : "",
			languages: data.locale ? [data.locale] : [],
			lastName: data.last_name ? data.last_name : "",
			company: data.company ? data.company : "",
			currentLocation: data.currentLocation ? data.currentLocation : [],
			interests: data.interests ? data.interests : [],
			photos: photosData,
			profilePhoto: profilePhotoData,
			relationshipStatus: data.relationshipStatus
				? data.relationshipStatus
				: [],
			reputationScore: data.reputationScore ? data.reputationScore : 0,
			socialProfiles: data.socialProfiles ? data.socialProfiles : [],
			universityName: data.universityName ? data.universityName : "",
			vipStatus: data.vipStatus ? data.vipStatus : {},
			warning: data.warning ? data.warning : ""
		};
		return res;
	}
	parsePhotosData(data): Photo[] {
		if (data.photos) {
			return data.photos.forEach(photo => {
				photo = {
					imgUrl: photo.imgUrl
				};
			});
		} else {
			return [{ imgUrl: "" }];
		}
	}
	parseFBProfilePhotoData(data): Photo {
		if (data.picture.data.url) {
			return {
				imgUrl: data.picture.data.url
			};
		} else {
			return { imgUrl: "" };
		}
	}
	// create user in firebase
	createUser(userCredentials): Promise<any> {
		// convert info to our model
		const user = this.mapFbtoModel(userCredentials);
		// set it in the backend
		console.log("creating user: ", user);
		return this.afs
			.doc(`/users/${user.id}`)
			.set(user)
			.then(() => console.log("user set: ", user))
			.catch(error => this.handleError(error));
	}
	updateUser(userData: User): Promise<any> {
		localStorage.setItem("currentUser", JSON.stringify(userData));
		this.currentUser
			? this.currentUser.next(userData)
			: (this.currentUser = new BehaviorSubject(userData));
		return this.afs
			.doc(`users/${userData.id}`)
			.set(userData, { merge: true })
			.then(() => console.log("updating info: ", userData.id))
			.catch(error => this.handleError(error));
	}
	// converts the backend user into the viewmodel of the user
	toUser(data): User {
		const photosData = this.parsePhotosData(data);
		const profilePhotoData = this.parseProfilePhotoData(data);
		const user = {
			about: data.about ? data.about : "",
			birthday: data.birthday ? data.birthday : "",
			currentCoords: data.currentCoords ? data.currentCoords : [],
			email: data.email ? data.email : "",
			firstName: data.firstName ? data.firstName : "",
			gender: data.gender ? data.gender : "",
			id: data.id ? data.id : "",
			languages: data.languages ? data.languages : [],
			lastName: data.lastName ? data.lastName : "",
			company: data.company ? data.company : "",
			currentLocation: data.currentLocation ? data.currentLocation : [],
			interests: data.interests ? data.interests : [],
			photos: photosData,
			profilePhoto: profilePhotoData,
			relationshipStatus: data.relationshipStatus
				? data.relationshipStatus
				: [],
			reputationScore: data.reputationScore ? data.reputationScore : 0,
			socialProfiles: data.socialProfiles ? data.socialProfiles : [],
			universityName: data.universityName ? data.universityName : "",
			vipStatus: data.vipStatus ? data.vipStatus : {},
			warning: data.warning ? data.warning : ""
		};
		return user;
	}
	parseProfilePhotoData(data): Photo {
		if (data.profilePhoto) {
			return {
				imgUrl: data.profilePhoto.imgUrl
			};
		} else {
			return { imgUrl: "" };
		}
	}
	addImage(userId: string, image): Promise<any> {
		const photos = this.afs.collection(`users/${userId}/photos`);
		return photos.add(image).catch(error => this.handleError(error));
	}
	deleteImage(userId: string, imageUrl: string): Promise<any> {
		const image = this.afs.doc(`users/${userId}/photos/${imageUrl}`);
		return image.delete().catch(error => this.handleError(error));
	}
	// creates an individual room for the two users
	createConversation(fromId: string, toId: string) {
		const roomId = this.utilSrvc.uniqueRelId(fromId, toId);
		const dbRef = this.afs.doc(`chatrooms/${roomId}`);
		this.getUserById(toId).subscribe(user => {
			const conversation: any = {
				createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
				participants: [this.currentUser, user]
			};
			this.sendWelcomeConversationMessage(roomId);
			return dbRef.set(conversation);
		});
	}
	sendWelcomeConversationMessage(roomId) {
		const defaultMessage = {
			content: "you are now connected!",
			createdAt: moment().format("DD/MM/YYYY, hh:mm:ss"),
			senderId: 1111
		};
		this.db.list(`messages/${roomId}`).push(defaultMessage);
	}
	removeConversation(id) {
		const dbRef = this.afs.doc(`chatrooms/${id}`);
		return dbRef.delete();
	}
	private handleError(error: any): Promise<any> {
		console.error("Error: ", error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
