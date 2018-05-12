import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";

import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class CreateAdminService {
  subUrl: string = "/dashBoard";

  constructor(
    private http: Http,
    private api: ApiService,
    private auth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  async getBranches() {
    const branches = await this.db.collection(`/CIB EG`).ref.get();

    return branches.docs.map(doc => {
      return doc.id;
    });
  }

  async createUser(user) {
    user.privilage = "admin";

    const password = (
      Math.floor(Math.random() * 999999999) + 111111111
    ).toString();
    const newAuth = await this.auth.auth.createUserWithEmailAndPassword(
      user.email,
      password
    );

    const insertQuery = await this.db
      .collection(`/Users/`)
      .doc(user.email)
      .set(user);

    return { newPassword: password, email: user.email };
  }
}
