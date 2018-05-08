import { Injectable } from '@angular/core';
//modal
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ModalContentComponent } from "./modal.service";
import { DepositePurchase } from "../modals/deposit-purchase/deposit-purchase.component";

@Injectable()
export class GlobalVariablesService {
  constructor(private modalService: BsModalService) {}

  private subscribtions:any=[];
  bsModalRef: BsModalRef;
  public modalInput:any;

  unSubscribe(subscribtion?){
    if(subscribtion)
      return this.subscribtions.push(subscribtion);
    this.subscribtions.forEach(s => s.unsubscribe());
    this.subscribtions = [];
  }

  public showModal(msg:string,type:string='success',size:string='md',
    input:object[]=null){

    msg = msg ? msg :'Something went wrong, please try again later' 

    ModalContentComponent.prototype.title = msg
    ModalContentComponent.prototype.type = type;
    if(input){
      ModalContentComponent.prototype.input = input;
    }
    this.bsModalRef = this.modalService.show(ModalContentComponent,
      {class:`modal-${size}`});

    if(input) return this.modalService.onHide.map(res=>{
      let modal_input = this.modalInput;
      delete this.modalInput;
      return res==null ?  modal_input:null;
    });
  }

  showMpinConfirm(data,apiSubscFunc){
    DepositePurchase.prototype.data = data;
    DepositePurchase.prototype.confirmApi = apiSubscFunc;
    this.bsModalRef = this.modalService.show(DepositePurchase);
  }


}
