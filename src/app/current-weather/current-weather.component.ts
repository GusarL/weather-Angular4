import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForecastCurrent } from '../model/forecastCurrent.interface';
import { ForecastCurrentModel } from '../model/forecastCurrent.model';

import { WeatherApiService } from '../services/weather-api.service';
import { PassDataService } from '../services/pass-data.service';
import { ZipcodeService } from '../services/zipcode.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {

  public currentDate: number = Date.now();

  public cityZipcode: string | number;
  public fetchCurrent: boolean;
  public fetchingData = true;
  public fetch16: boolean;

  private subscription: Subscription;
  private subscription16: Subscription;
  private subscriptionCurrent: Subscription;

  private weatherIconCode: string;
  public weatherIcon: string;

  public forecastCurrent: ForecastCurrent =  ForecastCurrentModel;

  constructor(private weatherApiService: WeatherApiService,
              private passData: PassDataService,
              private zipcodeService: ZipcodeService) { }

  ngOnInit() {
    this.subscription = this.passData.currentSearchValue.subscribe(cityZipcode => {
      this.cityZipcode = cityZipcode;
      this.fetchingData = true;
      this.fetchForecast();
    });

    this.subscription16 = this.passData.currentLoadind16.subscribe( visible => {
      this.fetch16 = visible;
    });

    this.subscriptionCurrent = this.passData.currentLoadindCurrent.subscribe( visible => {
      this.fetchCurrent = visible;
    });
  }

  fetchForecast(): void  {
    this.passData.changeLoadindCurrent(true);
    if (!this.zipcodeService.isZipCode(this.cityZipcode)) {

      this.weatherApiService.getForecastCurrentWeatherByCity(this.cityZipcode)
        .subscribe(forecastCurrent => {
          if (forecastCurrent) {
            this.forecastCurrent = forecastCurrent;
            this.handleResponse();
          } else {
            this.passData.changeOpenPopup(true);
            this.fetchingData = true;
          }
        });

    } else {

      this.weatherApiService.getForecastCurrentWeatherByZipcode(this.cityZipcode)
        .subscribe(forecastCurrent => {
          if (forecastCurrent) {
            this.forecastCurrent = forecastCurrent;
            this.handleResponse();
          } else {
            this.passData.changeOpenPopup(true);
            this.fetchingData = true;
          }
        });
    }
  }

  selectIcon (): void  {
    switch (this.weatherIconCode) {
      case '2':
        this.weatherIcon = 'thunderstorm';
        break;
      case '3':
        this.weatherIcon = 'drizzle';
        break;
      case '5':
        this.weatherIcon = 'rain';
        break;
      case '6':
        this.weatherIcon = 'snow';
        break;
      case '7':
        this.weatherIcon = 'atmosphere';
        break;
      case '800':
        this.weatherIcon = 'clear';
        break;
      case '80':
        this.weatherIcon = 'clouds';
        break;
      default:
        this.weatherIcon = '';
    }
  }

  calculateWeatherIconCode(): void {
    this.weatherIconCode = this.forecastCurrent.weather.code.charAt(0);

    if (this.weatherIconCode === '8') {
      if (this.forecastCurrent.weather.code === '800') {
        this.weatherIconCode = '800';
      } else {
        this.weatherIconCode = this.forecastCurrent.weather.code.slice(0, 2);
      }
    }
  }

  handleResponse (): void {
    this.calculateWeatherIconCode();
    this.selectIcon();
    this.passData.changeLoadindCurrent(false);
    this.fetchingData = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription16.unsubscribe();
    this.subscriptionCurrent.unsubscribe();
  }
}
