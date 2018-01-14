/**
 * Created by lyudmila on 08.01.18.
 */
export interface Weather {
  icon: string;
  code: string;
  description: string;
}

export interface ForecastCurrent {
  rh: number;
  pod: string;
  pres: number;
  timezone: string;
  weather: Weather;
  country_code: string;
  clouds: number;
  vis: number;
  wind_spd: number;
  wind_cdir_full: string;
  app_temp: number;
  lon: number;
  state_code: string;
  ts: number;
  elev_angle: number;
  h_angle: number;
  dewpt: number;
  ob_time: string;
  uv: number;
  sunset: string;
  sunrise: string;
  city_name: string;
  precip: number | string | null;
  station: string;
  lat: number;
  dhi: number;
  datetime: string;
  temp: number;
  wind_dir: number;
  slp: number;
  wind_cdir: string;
}

