import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AlertController } from "@ionic/angular";

/*
  Generated class for the UtilService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable({
	providedIn: "root"
})
export class UtilService {
	constructor(public http: HttpClient, public alertCtrl: AlertController) {}
	// generate a random name to put in firebase storage
	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return (
			s4() +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			"-" +
			s4() +
			s4() +
			s4()
		);
	}
	// generats a uniqueId for a relationship e.g. sent request and etc
	uniqueRelId(from: string, to: string): string {
		if (from <= to) {
			return from.concat("_" + to);
		} else {
			return to.concat("_" + from);
		}
	}
	// calculates how much tiem in human words has passed since a specific date
	timeSince(date) {
		const newDate = Date.now();
		const seconds = Math.floor((newDate - date) / 1000);
		let interval = Math.floor(seconds / 31536000);
		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		return Math.floor(seconds) + " seconds ago";
	}
	doAlert(message, buttonText): void {
		const alert = this.alertCtrl.create({
			message: message,
			buttons: [buttonText]
		});
		alert.then(alrt => alrt.present());
	}
	presentFakedoorAlert(action: string) {
		const alert = this.alertCtrl.create({
			header: "Sorry",
			message: "This function is not available at this time",
			buttons: [
				{
					text: "Got it",
					role: "cancel",
					handler: () => {}
				}
			]
		});
		alert.then(alrt => alrt.present());
	}
	finInstance(array: Array<any>, object): number {
		array.forEach((ins, index) => {
			if (this.deepEqual(ins, object)) {
				return index;
			}
		});
		return -1;
	}
	deepEqual(obj1, obj2): boolean {
		return JSON.stringify(obj1) === JSON.stringify(obj2);
	}
}
