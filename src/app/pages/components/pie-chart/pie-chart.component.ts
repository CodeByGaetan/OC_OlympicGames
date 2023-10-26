import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataItem, LegendPosition } from '@swimlane/ngx-charts';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @Input() olympics$!: Observable<Olympic[]>;

  constructor(private router: Router) { }

  dataSet$!: Observable<DataItem[]>;

  view: [number, number] = [1000, 500];

  // options
  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  animations = false;
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  ngOnInit(): void {
    this.dataSet$ = this.olympics$.pipe(
      map(items => items.map<DataItem>(item => {
        return {
          name: item.country,
          value: item.participations.reduce((prev, curr) => (prev + curr.medalsCount), 0)
        }
      })
      )
    )
  }

  onSelect(item: DataItem): void {
    this.router.navigateByUrl(`${item.name}`)
  }

}
