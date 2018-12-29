import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AgmCoreModule } from "@agm/core";
import { Environment } from "../environments/environment";
import { Geolocation } from "@ionic-native/geolocation";

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		AgmCoreModule.forRoot({
			apiKey: Environment.googleMapKey
		})
	],
	providers: [
		StatusBar,
		SplashScreen,
		Geolocation,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
