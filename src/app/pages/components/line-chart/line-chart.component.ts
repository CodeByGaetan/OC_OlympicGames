import { Component, Input, OnInit } from '@angular/core';
import { Series } from '@swimlane/ngx-charts';
import { Observable, map, tap } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  @Input() olympic$!: Observable<Olympic>;
  dataSet$!: Observable<Series[]>;
  xAxisTicks: number[] = [];

  ngOnInit(): void {
    this.dataSet$ = this.olympic$.pipe(
      tap(olympicItem => this.xAxisTicks = olympicItem.participations.map(item => item.year)),
      map(olympicItem => [
        {
          name : olympicItem.country,
          series: olympicItem.participations.map(item => ({name:item.year,value:item.medalsCount}))
        }]
      )
    )
  }

  formatPercent(val:number) {
    return val;
  } 

}
