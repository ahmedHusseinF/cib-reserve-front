import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { LoginService } from "../../app/services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  errorMsg = null;
  successMsg = null;
  public loginForm: FormGroup;

  constructor(
    private title: Title,
    private service: LoginService,
    private formbuilder: FormBuilder,
    private router: Router
  ) {
    this.title.setTitle("Login");
  }

  initForm() {
    let formvalidation = {
      email: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(11),
          <any>Validators.maxLength(150),
          <any>Validators.email
        ]
      ],
      password: [
        "",
        [
          <any>Validators.required,
          <any>Validators.minLength(7),
          <any>Validators.maxLength(15)
        ]
      ]
    };

    this.loginForm = this.formbuilder.group(formvalidation);
  }

  ngOnInit() {
    this.initForm();
  }

  public login(body, valid) {
    console.log(body);
    this.errorMsg = ``;
    this.successMsg = ``;

    if (!valid) {
      this.errorMsg = "Enter Email and Password";
      return;
    }

    this.service
      .userLogin(body)
      .then(async res => {
        console.log(res, "login component auth");

        if (res.user) {
          localStorage.setItem("name", res.user.name);
          localStorage.setItem("token", res.auth.refreshToken);
          sessionStorage.setItem("priv", res.user.privilage);
          sessionStorage.setItem("branch", res.user.branch);
          sessionStorage.setItem("counter", res.user.counter);
          this.successMsg = "Logged in Successfully";
          await this.router.navigateByUrl("/dashboard/home");
        } else {
          this.errorMsg = "Something went wrong";
        }
      })
      .catch((err: { code: String; message: String }) => {
        console.error(err);
        if (err.code.includes("invalid-email")) {
          this.errorMsg = "Invalid Email Address";
        }
        if (err.code.includes("wrong-password")) {
          this.errorMsg = "Wrong Password, please try again";
        }
      });
  }
}
