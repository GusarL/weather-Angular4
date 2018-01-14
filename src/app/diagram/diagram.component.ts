import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, ViewEncapsulation, OnDestroy} from '@angular/core';

import { Forecast16 } from '../model/forecast16.interface';
import { Forecast16Model } from '../model/forecast16.model';

import { WeatherApiService } from '../services/weather-api.service';
import { PassDataService } from '../services/pass-data.service';
import { ZipcodeService } from '../services/zipcode.service';

import { DatePipe } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';

import * as d3 from 'd3';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})

export class DiagramComponent implements OnInit, OnChanges, OnDestroy {
  @Input('diagramTitle') diagramTitle;
  @ViewChild('chart') private chartContainer: ElementRef;

  private cityZipcode: string | number;
  public fetchData: boolean;
  public hide: boolean;

  private subscription: Subscription;

  public forecast16: Forecast16 = Forecast16Model;
  public chartData;

  private margin: any = { top: 20, bottom: 20, left: 27, right: 60};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private previousSVG: any;

  constructor(private weatherApiService: WeatherApiService,
              private passData: PassDataService,
              private datePipe: DatePipe,
              private zipcodeService: ZipcodeService) { }

  ngOnInit() {
    this.subscription = this.passData.currentSearchValue.subscribe(cityZipcode => {
      this.cityZipcode = cityZipcode;
      this.fetchData = true;
      this.fetchForecast16();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.diagramTitle.currentValue) {
      this.generateData(changes.diagramTitle.currentValue);
      this.updateChart();
    }
  }

  fetchForecast16(): void {
    this.passData.changeLoadind16(true);
    if (!this.zipcodeService.isZipCode(this.cityZipcode)) {

      this.weatherApiService.getForecast16DaysByCity(this.cityZipcode)
        .subscribe(forecast16 => {
          if (forecast16) {
            this.forecast16 = forecast16;
            this.handleResponse();
          } else {
            this.passData.changeOpenPopup(true);
            this.hide = true;
          }
        });

    } else {

      this.weatherApiService.getForecast16DaysByZipcode(this.cityZipcode)
        .subscribe(forecast16 => {
          if (forecast16) {
            this.forecast16 = forecast16;
            this.handleResponse();
          } else {
            this.passData.changeOpenPopup(true);
            this.hide = true;
          }
        });
    }
  }

  handleResponse (): void {
    this.generateData('temp');
    if (this.previousSVG) {
      this.deleteChart();
    }
    this.createChart();
    this.updateChart();
    this.passData.changeLoadind16(false);
    this.hide = false;
  }

  onFethcedCurrent(): void {
    this.fetchData  = false;
  }

  generateData(prop): void {
    this.chartData = [];
    this.forecast16.data.forEach((day, index) => {
      const date = Date.parse(day.datetime);
      const formattedData = (this.datePipe.transform(date, 'dd MMM'));

      this.chartData.push([formattedData, day[prop]]);
    });
  }

  createChart(): void {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    this.previousSVG = svg;

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.chartData.map(d => d[0]);
    const maximum = Number(d3.max(this.chartData, d => d[1]));
    const yDomain: [number, number] = [0, maximum];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)//works
      .call(d3.axisBottom(this.xScale));

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart(): void {
    // update scales & axis
    this.xScale.domain(this.chartData.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.chartData, d => d[1])]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.chartData);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', '#ffc6d5');

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', '#ffc6d5')
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }

  deleteChart(): void {
    this.previousSVG.remove();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
