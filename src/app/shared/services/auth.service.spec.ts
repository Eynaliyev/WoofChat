import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "./user.service";
import {
	AngularFirestore,
	AngularFirestoreDocument
} from "@angular/fire/firestore";

import { AuthService } from "./auth.service";
class MockUserService {}
class MockAngularFireAuth {}
class MockAngularFirestore {}

describe("AuthService", () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [
				{ provide: AngularFireAuth, useValue: MockAngularFireAuth },
				{ provide: AngularFirestore, useValue: MockAngularFirestore },
				{ provide: UserService, useValue: MockUserService }
			]
		})
	);

	it("should be created", () => {
		const service: AuthService = TestBed.get(AuthService);
		expect(service).toBeTruthy();
	});
});
