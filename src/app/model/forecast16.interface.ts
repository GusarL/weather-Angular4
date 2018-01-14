/**
 * Created by lyudmila on 08.01.18.
 */
export interface Weather {
  icon: string;
  code: string;
  description: string;
}

export interface WeatherData {
  wind_cdir: string;
  rh: number;
  wind_spd: number;
  pop: number;
  wind_cdir_full: string;
  slp: number;
  app_max_temp: number;
  pres: number;
  dewpt: number;
  snow: number;
  uv: number;
  ts: number;
  wind_dir: number;
  weather: Weather;
  app_min_temp: number;
  max_temp: number;
  snow_depth: number;
  precip: number;
  max_dhi: number;
  datetime: string;
  temp: number;
  min_temp: number;
  clouds: number;
  vis: number;
}

export interface Forecast16 {
  data: WeatherData[];
  city_name: string;
  lon: string;
  timezone: string;
  lat: string;
  country_code: string;
  state_code: string;
}
