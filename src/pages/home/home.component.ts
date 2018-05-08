import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { LocalStorageService } from "angular-2-local-storage";
import { dashBoardService } from "../../app/services/dashboard.service";
import { GlobalVariablesService } from "../../app/services/global-variables.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  dayTimeFrames: any = [];
  num: number = 200;
  show: boolean = true;

  balance: any;

  constructor(
    private title: Title,
    private service: dashBoardService,
    private globals: GlobalVariablesService
  ) {
    this.title.setTitle("Home");
  }

  get counterNumber() {
    return sessionStorage.getItem("counter");
  }

  ngOnInit() {
    this.service.dashBoard().then(res => {
      console.log(res, "home component");
    });
  }

  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
