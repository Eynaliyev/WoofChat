import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginPage } from "./login.page";
import { UserService } from "../shared/services/user.service";
import { AuthService } from "../shared/services/auth.service";
import { UtilService } from "../shared/services/util.service";
import { LoadingController } from "@ionic/angular";
class MockUserService {}
class MockAuthService {}
class MockUtilService {}

describe("LoginPage", () => {
	let component: LoginPage;
	let fixture: ComponentFixture<LoginPage>;
	// tslint:disable-next-line:prefer-const
	let loadingSpy;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LoginPage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: LoadingController, useValue: loadingSpy },
				{ provide: AuthService, useValue: MockAuthService },
				{ provide: UserService, useValue: MockUserService },
				{ provide: UtilService, useValue: MockUtilService }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
