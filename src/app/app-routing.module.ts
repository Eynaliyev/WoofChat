import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "home", loadChildren: "./home/home.module#HomePageModule" },
	{ path: "login", loadChildren: "./login/login.module#LoginPageModule" },
	{
		path: "contacts",
		loadChildren: "./contacts/contacts.module#ContactsPageModule"
	},
	{
		path: "user-profile",
		loadChildren: "./user-profile/user-profile.module#UserProfilePageModule"
	},
	{
		path: "my-profile",
		loadChildren: "./my-profile/my-profile.module#MyProfilePageModule"
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			enableTracing: true, // <-- debugging purposes only
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
