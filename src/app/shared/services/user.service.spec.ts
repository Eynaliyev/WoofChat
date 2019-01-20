import { TestBed } from "@angular/core/testing";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";
import { UserService } from "./user.service";
import { HttpClientModule } from "@angular/common/http";
import { UtilService } from "./util.service";
class MockUtilService {}
class MockAngularFireDatabase {}
class MockAngularFirestore {
	doc(id: string) {
		return {
			about: "",
			birthday: "07/20/1992",
			company: "",
			currentCoords: [],
			currentLocation: [],
			email: "rustam.eynaliyev@gmail.com",
			firstName: "Rustam",
			gender: "male",
			id: "10214421283799938",
			interests: [],
			languages: ["en_US"],
			lastName: "Eynaliyev",
			photos: [{ imgUrl: "" }],
			profilePhoto: {
				imgUrl:
					"https://platform-lookaside.fbsbx.com/platform/prof…00&width=200&ext=1537215079&hash=AeSs3WAO9X4_R0kF"
			},
			relationshipStatus: [],
			reputationScore: 0,
			socialProfiles: [],
			universityName: "",
			vipStatus: {},
			warning: ""
		};
	}
}

describe("UserService", () => {
	let service: UserService;
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [
				{ provide: UtilService, useValue: MockUtilService },
				{ provide: AngularFireDatabase, useValue: MockAngularFireDatabase },
				{ provide: AngularFirestore, useValue: MockAngularFirestore }
			]
		});
		service = TestBed.get(UserService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	/*it("should return a user Observable", () => {
		expect(service.getUserById("id")).toBeTruthy();
	});*/
});
