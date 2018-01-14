import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PassDataService {
  private searchSource$ = new Subject<string | number>();
  private openPopup$ = new Subject<boolean>();
  private loadindCurrent$ = new BehaviorSubject<boolean>(false);
  private loadind16$ = new BehaviorSubject<boolean>(false);

  currentSearchValue = this.searchSource$.asObservable();
  openPopup = this.openPopup$.asObservable();
  currentLoadindCurrent = this.loadindCurrent$.asObservable();
  currentLoadind16 = this.loadind16$.asObservable();

  constructor() { }

  changeSearchValue(searchValue: string | number) {
    this.searchSource$.next(searchValue);
  }

  changeLoadindCurrent(loadindCurrent: boolean) {
    this.loadindCurrent$.next(loadindCurrent);
  }

  changeLoadind16(loadind16: boolean) {
    this.loadind16$.next(loadind16);
  }

  changeOpenPopup(open: boolean) {
    this.openPopup$.next(open);
  }
}
