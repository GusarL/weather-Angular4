import { Component, OnInit, OnDestroy } from '@angular/core';

import { PassDataService } from '../services/pass-data.service';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private subscriptionCurrent: Subscription;
  private subscription16: Subscription;
  private subscriptionOpenPopup: Subscription;

  public fetchCurrent: boolean;
  public fetch16: boolean;
  public hide: boolean;

  constructor(private passData: PassDataService) { }

  ngOnInit() {
    this.subscriptionCurrent = this.passData.currentLoadindCurrent.subscribe( visible => {
      this.fetchCurrent = visible;
    });

    this.subscription16 = this.passData.currentLoadind16.subscribe( visible => {
      this.fetch16 = visible;
    });

    this.subscriptionOpenPopup = this.passData.openPopup.subscribe(visibility => {
      this.hide = visibility;
    });
  }

  onClosed ($event): void {
    this.hide = true;
  }

  ngOnDestroy() {
    this.subscriptionCurrent.unsubscribe();
    this.subscription16.unsubscribe();
    this.subscriptionOpenPopup.unsubscribe();
  }
}
