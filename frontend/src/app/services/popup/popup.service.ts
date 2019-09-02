import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupModalComponent } from '../../static/popup-modal/popup-modal.component';
import { PopupModalData } from '../../models/popup-modal-data/popup-modal-data';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(public dialog: MatDialog) { }

  openDialog(popupModalData: PopupModalData): void {
    this.dialog.open(PopupModalComponent, {
      width: '50em',
      data: { warn: popupModalData.warn, info: popupModalData.info }
    });
  }
}
