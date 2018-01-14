import {Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Response} from '@angular/http';

@Injectable()
export class WeatherApiService {

  private forecast16DaysUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
  private forecastCurrentUrl = 'https://api.weatherbit.io/v2.0/current';

  private keyAPI = '6334e6b1872047df91fa98196f2bf055';

  constructor(private http: HttpClient) { }

  getForecast16DaysByCity (city): Observable<any> {
    return this.http.get(this.forecast16DaysUrl + '?city=' + city + '&key=' + this.keyAPI)
      .retry(3)
      .map(response => {
        if (response) {
          return response;
        }
      })
      .catch(this.handleError);
  }

  getForecastCurrentWeatherByCity(city): Observable<any> {
    return this.http.get(this.forecastCurrentUrl + '?city=' + city + '&key=' + this.keyAPI)
      .retry(3)
      .map(response => {
        if (response) {
          return response['data'][0];
        }
      })
      .catch(this.handleError);
  }

  getForecast16DaysByZipcode (zipcode): Observable<any>  {
    return this.http.get(this.forecast16DaysUrl + '?postal_code=' + zipcode + '&key=' + this.keyAPI)
      .retry(3)
      .map(response => {
        if (response) {
          return response;
        }
      })
      .catch(this.handleError);
  }

  getForecastCurrentWeatherByZipcode(zipcode): Observable<any> {
    return this.http.get(this.forecastCurrentUrl + '?postal_code=' + zipcode + '&key=' + this.keyAPI)
      .retry(3)
      .map(response => {
        if (response) {
          return response['data'][0];
        }
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {

      const body = error.json() || { error: null };
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    return Observable.throw(errMsg);
  }

}
