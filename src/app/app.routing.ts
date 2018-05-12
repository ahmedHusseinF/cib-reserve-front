import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";

import { LayoutComponent } from "./layouts/layout/layout.component";
import { HomeComponent } from "../pages/home/home.component";
import { LogoutComponent } from "../pages/logout/logout.component";
import { CreateAdminComponent } from "../pages/create-admin/create-admin.component";

import { guestAccess } from "./services/access-controls/guest.service";
import { haveAccess } from "./services/access-controls/have-access.service";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: LayoutComponent,
    canActivate: [haveAccess],
    data: {
      title: "Home"
    },
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [haveAccess]
      },
      {
        path: "admin/create",
        component: CreateAdminComponent,
        canActivate: [haveAccess]
      }
    ]
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [haveAccess]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
