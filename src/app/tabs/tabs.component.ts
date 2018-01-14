import { Component, OnInit, OnDestroy } from '@angular/core';

import { PassDataService } from '../services/pass-data.service';

import { Tabs } from '../model/tabs.model';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})

export class TabsComponent implements OnInit, OnDestroy {
  public cityZipcode: string | number;
  public tabs = Tabs;
  public diagramTitle: string;

  private subscriptionCurrent: Subscription;
  private subscription16: Subscription;
  private subscriptionCityZipcode: Subscription;
  public fetchCurrent: boolean;
  public fetch16: boolean;

  constructor(private passData: PassDataService) { }

  ngOnInit() {
    this.subscriptionCityZipcode = this.passData.currentSearchValue.subscribe(cityZipcode => {
      this.cityZipcode = cityZipcode;
    });

    this.subscriptionCurrent = this.passData.currentLoadindCurrent.subscribe( visible => {
      this.fetchCurrent = visible;
    });

    this.subscription16 = this.passData.currentLoadind16.subscribe( visible => {
      this.fetch16 = visible;
    });
  }

  selectTab(tab): void  {
    this.tabs.forEach(function (item) {
      if (item.active === true) {
        item.active = false;
      }
    });
    tab.active = true;
    this.diagramTitle = tab.characteristic;
  }

  ngOnDestroy() {
    this.subscriptionCurrent.unsubscribe();
    this.subscription16.unsubscribe();
    this.subscriptionCityZipcode.unsubscribe();
  }
}
