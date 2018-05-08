import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class LoginService {
  subUrl: string = "/login";
  baseUrl: string;

  constructor(
    private http: Http,
    private api: ApiService,
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  async userLogin(user) {
    const auth = await this.auth.auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );
    const c = await this.db
      .collection("/Users")
      .ref.where("privilage", "==", "admin")
      .where("email", "==", user.email)
      .get();

    return { user: c.docs[0].data(), auth };
  }
}
