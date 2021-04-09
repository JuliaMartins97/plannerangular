import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) {}

  // tslint:disable-next-line: typedef
  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){
  const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
  bsModalRef.content.type = 'type';
  bsModalRef.content.message = message;

  if (dismissTimeout) {
    setTimeout(() => bsModalRef.hide(), dismissTimeout);
  }
  }

  // tslint:disable-next-line: typedef
  showAlertDanger(message: string) {
  this.showAlert(message, AlertTypes.DANGER);
  }

  // tslint:disable-next-line: typedef
  showAlertSuccess(message: string) {
  this.showAlert(message, AlertTypes.SUCCESS, 2000);
  }

}
