import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomePage } from "./home.page";

describe("HomePage", () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;
	let compiled;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HomePage],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		compiled = fixture.debugElement.nativeElement;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should render title in a ion-title tag", () => {
		expect(compiled.querySelector("ion-title").textContent).toContain(
			"Ionic Blank"
		);
	});
});
