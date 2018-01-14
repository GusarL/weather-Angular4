import { Component, OnInit, OnDestroy, EventEmitter,  Output } from '@angular/core';

import { PassDataService } from '../services/pass-data.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit, OnDestroy {
  public show: boolean;
  private subscription: Subscription;

  @Output() onClosed = new EventEmitter<boolean>();

  constructor(private passData: PassDataService) { }

  ngOnInit() {
    this.subscription = this.passData.openPopup.subscribe(visibility => {
      this.show = visibility;
    });
  }

  hidePopup(): void {
    this.show = false;
    // this.passData.changeOpenPopup(false);
    this.onClosed.emit(true);
  }

  outerClose(): void {
    this.hidePopup();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
