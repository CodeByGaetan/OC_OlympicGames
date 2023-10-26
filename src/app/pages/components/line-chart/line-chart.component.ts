import { Component, Input, OnInit } from '@angular/core';
import { Series } from '@swimlane/ngx-charts';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() olympic$!: Observable<Olympic>;
  dataSet$!: Observable<Series[]>;

  // options
  view: [number, number] = [700, 300];
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = false;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Number of Medals';
  timeline: boolean = false;

  ngOnInit(): void {
    this.dataSet$ = this.olympic$.pipe(
      map(olympicItem => [
        {
          name : olympicItem.country,
          series: olympicItem.participations.map(item => ({name:item.year,value:item.medalsCount}))
        }]
      )
    )
  }

}
