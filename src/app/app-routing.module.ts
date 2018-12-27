import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: "full" },
	{ path: "home", loadChildren: "./home/home.module#HomePageModule" },
	{
		path: "chatroom",
		loadChildren: "./chatroom/chatroom.module#ChatroomPageModule"
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
