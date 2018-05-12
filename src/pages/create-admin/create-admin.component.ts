import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormsModule
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { CreateAdminService } from "../../app/services/create-admin.service";
import { GlobalVariablesService } from "../../app/services/global-variables.service";

import { Modal } from "ngx-modialog/plugins/bootstrap";

@Component({
  selector: "create-admin",
  templateUrl: "./create-admin.component.html",
  styleUrls: ["./create-admin.component.css"]
})
export class CreateAdminComponent implements OnInit {
  public form: FormGroup;

  public branches: String[];

  constructor(
    private title: Title,
    private service: CreateAdminService,
    private formBuilder: FormBuilder,
    private modal: Modal,
    private globals: GlobalVariablesService
  ) {
    this.title.setTitle("Create Admin");
  }

  initForm() {
    let formValitdations = {
      email: ["", [<any>Validators.required, <any>Validators.email]],
      mobile: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(11),
          <any>Validators.maxLength(11)
        ]
      ],
      counter: ["", [<any>Validators.required]],
      name: ["", [<any>Validators.required]],
      branch: ["", [<any>Validators.required]],
      address: ["", [<any>Validators.required]]
    };

    this.form = this.formBuilder.group(formValitdations);
  }

  async ngOnInit() {
    //
    this.initForm();
    this.branches = await this.service.getBranches();

    //console.log(this.branches);
  }

  public async createUser(body, valid) {
    if (!valid) {
      this.modal
        .alert()
        .title("Wrong Info")
        .message("The data you supplied is wrong, please submit all the data")
        .open();
    }
    console.log(body);
    const inserted = await this.service.createUser(body);

    this.modal
      .alert()
      .title("Created")
      .message(
        `Inserted a new account with email: ${inserted.email} and password: ${
          inserted.newPassword
        }`
      )
      .open();
  }

  ngOnDestroy() {
    this.globals.unSubscribe();
  }
}
