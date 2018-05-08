import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import "ngx-bootstrap";
import { HttpModule } from "@angular/http";
import { LocalStorageModule } from "angular-2-local-storage";
import { RouterModule, Routes } from "@angular/router";
import { Daterangepicker } from "ng2-daterangepicker";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
// Firebase
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule } from "angularfire2/auth";
import { environment } from "../environments/environment.prod";
//flash
import { FlashMessagesService } from "angular2-flash-messages";
//loading
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BusyModule } from "angular2-busy";

//Modal
import { ModalModule } from "ngx-bootstrap";
import { ModalContentComponent } from "./services/modal.service";
import { DepositePurchase } from "./modals/deposit-purchase/deposit-purchase.component";

//layouts
import { LayoutComponent } from "./layouts/layout/layout.component";

//components
import { HomeComponent } from "../pages/home/home.component";
import { LoginComponent } from "../pages/login/login.component";
import { LogoutComponent } from "../pages/logout/logout.component";

//services
import { LoginService } from "./services/login.service";
import { ApiService } from "./services/api.service";
import { dashBoardService } from "./services/dashboard.service";

import { guestAccess } from "./services/access-controls/guest.service";
import { haveAccess } from "./services/access-controls/have-access.service";

import { GlobalVariablesService } from "./services/global-variables.service";

//pipe
import { CapitalizeFirstPipe } from "./services/pipe/capitalizefirst.pipe";

//routing
import { AppRoutingModule } from "./app.routing";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    LogoutComponent,
    ModalContentComponent,
    DepositePurchase,
    CapitalizeFirstPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: "my-app",
      storageType: "localStorage"
    }),
    Daterangepicker,
    BusyModule,
    ModalModule.forRoot()
  ],
  providers: [
    LoginService,
    ApiService,
    FlashMessagesService,
    dashBoardService,
    guestAccess,
    haveAccess,
    GlobalVariablesService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalContentComponent, DepositePurchase]
})
export class AppModule {}
