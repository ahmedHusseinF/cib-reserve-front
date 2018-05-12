import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";

import { AngularFirestore } from "angularfire2/firestore";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";

@Injectable()
export class dashBoardService {
  subUrl: string = "/dashBoard";
  todayReservations: QueryDocumentSnapshot[] = [];
  dayTimes = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

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
    const timeFrames = await this.db
      .collection(`/CIB EG/${this.branchName}/TimeFrames`)
      .ref.get();

    timeFrames.docs.map(val => {
      val.ref.get();
    });

    let slots = [];

    const now = new Date();

    const todayDay = now.getDate();
    const todayMonth = now.getMonth() + 1;
    const todayYear = now.getFullYear();
    console.log({ todayDay, todayMonth, todayYear });

    for (let timeFrame of timeFrames.docs) {
      let dateData = await timeFrame.data();

      if (
        todayDay == dateData.day &&
        todayMonth == dateData.month &&
        todayYear == dateData.year
      ) {
        const timeSlots = await timeFrame.ref.collection("TimeSlots").get();

        for (let timeSlot of timeSlots.docs) {
          if (this.counterNumber != timeSlot.get("counterId")) {
            continue;
          }

          this.todayReservations.push(timeSlot);

          let clientId = timeSlot.get("clientId"),
            start = timeSlot.get("start"),
            end = timeSlot.get("end"),
            status = "coming";

          let passedHour = this.getDayTimeIndex(parseInt(end.split(":")[0]));
          let passedMin = this.getDayTimeIndex(parseInt(end.split(":")[1]));

          let passed_ =
            passedHour < this.getDayTimeIndex(now.getHours()) ||
            (passedHour == now.getHours() &&
              passedMin > this.getDayTimeIndex(now.getMinutes()));

          if (passed_) {
            status = timeSlot.get("notes") == "" ? "passed" : "reviewed";
          }

          slots.push({
            slotId: timeSlot.id,
            clientId,
            start,
            end,
            status
          });
        }
      }
    }

    //console.log(counters);

    return slots;
  }

  async submitReview(note, slot) {
    for (let reservation of this.todayReservations) {
      if (reservation.id == slot.slotId) {
        await reservation.ref.update({ notes: note });
      }
    }
  }

  getDayTimeIndex(time) {
    return this.dayTimes.findIndex(val => {
      return val == time;
    });
  }
}
