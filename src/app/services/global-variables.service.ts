import { Injectable } from "@angular/core";
//modal
//import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from "ngx-bootstrap/modal/modal-options.class";
import { ModalContentComponent } from "./modal.service";
import { DepositePurchase } from "../modals/deposit-purchase/deposit-purchase.component";

@Injectable()
export class GlobalVariablesService {
  constructor() {}

  private subscribtions: any = [];
  bsModalRef: BsModalRef;
  public modalInput: any;

  unSubscribe(subscribtion?) {
    if (subscribtion) return this.subscribtions.push(subscribtion);
    this.subscribtions.forEach(s => s.unsubscribe());
    this.subscribtions = [];
  }
}
