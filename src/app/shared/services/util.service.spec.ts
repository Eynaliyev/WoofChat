import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { AlertController } from "@ionic/angular";

import { UtilService } from "./util.service";
// tslint:disable-next-line:prefer-const
let alertSpy;
describe("UtilService", () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [{ provide: AlertController, useValue: alertSpy }]
		})
	);

	it("should be created", () => {
		const service: UtilService = TestBed.get(UtilService);
		expect(service).toBeTruthy();
	});
});
