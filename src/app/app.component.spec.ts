import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, async } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { UserService } from "./shared/services/user.service";
class MockUserService {}
describe("AppComponent", () => {
	let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

	beforeEach(async(() => {
		statusBarSpy = jasmine.createSpyObj("StatusBar", ["styleDefault"]);
		splashScreenSpy = jasmine.createSpyObj("SplashScreen", ["hide"]);
		platformReadySpy = Promise.resolve();
		platformSpy = jasmine.createSpyObj("Platform", { ready: platformReadySpy });

		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [HttpClientModule],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
			providers: [
				{ provide: UserService, useValue: MockUserService },
				{ provide: StatusBar, useValue: statusBarSpy },
				{ provide: SplashScreen, useValue: splashScreenSpy },
				{ provide: Platform, useValue: platformSpy }
			]
		}).compileComponents();
	}));

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it("should initialize the app", async () => {
		TestBed.createComponent(AppComponent);
		expect(platformSpy.ready).toHaveBeenCalled();
		await platformReadySpy;
		expect(statusBarSpy.styleDefault).toHaveBeenCalled();
		expect(splashScreenSpy.hide).toHaveBeenCalled();
	});

	it("should have 3 pages", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const component = fixture.componentInstance;
		expect(component.pages.length).toBe(3);
	});

	it("should have a root page", () => {
		const fixture = TestBed.createComponent(AppComponent);
		const component = fixture.componentInstance;
		expect(component.rootPage).toBeDefined();
	});
});
