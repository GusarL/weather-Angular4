/**
 * Created by lyudmila on 12.01.18.
 */

import { Tab } from '../model/tab.interface';

export let Tabs: Tab[] =  [
                            {
                              name: 'Wind',
                              active: false,
                              characteristic: 'wind_spd',
                              class: 'wind'
                            },
                            {
                              name: 'Temperature',
                              active: true,
                              characteristic: 'temp',
                              class: 'temperature'
                            },
                            {
                              name: 'Presure',
                              active: false,
                              characteristic: 'pres',
                              class: 'presure'
                            },
                            {
                              name: 'Humidity',
                              active: false,
                              characteristic: 'rh',
                              class: 'humidity'
                            }
                          ];
