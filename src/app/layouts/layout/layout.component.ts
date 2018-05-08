import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"]
})
export class LayoutComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, public api: ApiService) {}

  ngOnInit() {}

  //used to remove loading error
  ngAfterViewChecked() {
    this.api.loading;
    this.cdRef.detectChanges();
  }

  getUserName() {
    return localStorage.getItem("name");
  }
}
