import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SearchComponent } from './search/search.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { TabsComponent } from './tabs/tabs.component';
import { DiagramComponent } from './diagram/diagram.component';

import { WeatherApiService } from './services/weather-api.service';
import { PassDataService } from './services/pass-data.service';
import { ZipcodeService } from './services/zipcode.service';
import { LoaderComponent } from './loader/loader.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';

import { ClickOutsideDirective } from './directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    SearchComponent,
    CurrentWeatherComponent,
    TabsComponent,
    DiagramComponent,
    LoaderComponent,
    ErrorPopupComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [ WeatherApiService,
               PassDataService,
               ZipcodeService],
  bootstrap: [AppComponent]
})

export class AppModule { }
