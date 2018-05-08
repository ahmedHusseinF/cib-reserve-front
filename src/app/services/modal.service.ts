import { Component, ViewChild, ElementRef } from '@angular/core'
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { GlobalVariablesService } from './global-variables.service'

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h5 class="modal-title pull-left text-{{type}}">{{title}}</h5>
      <button style="margin-top:-35px;" type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div *ngIf="input" class="modal-body form-group">
      <input #bodyInput [(ngModel)]="globals.modalInput" name="modalInput" style="width:100%; padding: 5px;
      font-size:16px;">
    </div>
    <div class="modal-footer" style="padding: 8px;">
      <button type="button" class="btn btn-primary btn-lg" (click)="bsModalRef.hide()">OK</button>
    </div>
  `
})
export class ModalContentComponent {
  @ViewChild('bodyInput') inputTag: ElementRef;
  public title;
  public type;
  public input;

  constructor(public bsModalRef: BsModalRef, public globals: GlobalVariablesService) { }
  ngAfterViewInit() {
    if (this.input)
      for (let obj of this.input) {
        this.inputTag.nativeElement.setAttribute(Object.keys(obj)[0],
          obj[Object.keys(obj)[0]]);
      }
    delete this.input;  
  }
}