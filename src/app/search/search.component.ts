import { Component } from '@angular/core';

import { PassDataService } from '../services/pass-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
   public cityZipcode: string | number;

  constructor(private passData: PassDataService) { }

  onSubmit(): void  {
    this.passData.changeSearchValue(this.cityZipcode);
  }
}
