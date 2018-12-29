import { TestBed } from "@angular/core/testing";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";
import { UserService } from "./user.service";
import { HttpClientModule } from "@angular/common/http";
import { UtilService } from "./util.service";
class MockUtilService {}
class MockAngularFireDatabase {}
class MockAngularFirestore {}

describe("UserService", () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [
				{ provide: UtilService, useValue: MockUtilService },
				{ provide: AngularFireDatabase, useValue: MockAngularFireDatabase },
				{ provide: AngularFirestore, useValue: MockAngularFirestore }
			]
		})
	);

	it("should be created", () => {
		const service: UserService = TestBed.get(UserService);
		expect(service).toBeTruthy();
	});
});
