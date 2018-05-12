import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { dashBoardService } from "../../app/services/dashboard.service";
import { GlobalVariablesService } from "../../app/services/global-variables.service";
import { Modal } from "ngx-modialog/plugins/bootstrap";

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
    private modal: Modal,
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
      this.dayTimeFrames = res;
    });
  }

  async showModalToReview(slot) {
    let modalAnswer = await this.modal
      .prompt()
      .title("Review this client")
      .open();
    try {
      await this.service.submitReview(await modalAnswer.result, slot);
      this.modal
        .alert()
        .message("Submitted the note")
        .open();
    } catch (e) {
      //canceled review
    }
  }

  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
