import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { LocalStorageService } from "angular-2-local-storage";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class dashBoardService {
  subUrl: string = "/dashBoard";

  constructor(
    private http: Http,
    private api: ApiService,
    private db: AngularFirestore
  ) {}

  get branchName() {
    return sessionStorage.getItem("branch");
  }

  get counterNumber() {
    return sessionStorage.getItem("counter");
  }

  async dashBoard() {
    const counters = await this.db
      .collection(
        `/CIB EG/${this.branchName}/Counters/${this.counterNumber}/TimeFrame`
      )
      .ref.get();

    return counters.docs;
  }
}
