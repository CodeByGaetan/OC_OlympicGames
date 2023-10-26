import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataItem, LegendPosition } from '@swimlane/ngx-charts';
import { Observable, map } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  private olympics$!: Observable<Olympic[]>;

  constructor(private olympicService: OlympicService, private router: Router) { }

  dataSet!: Observable<DataItem[]>;

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
    this.olympics$ = this.olympicService.getOlympics()
    this.dataSet = this.olympics$.pipe(
      map(items => items.map<DataItem>(item => {
        return {
          // extra: item.id,
          name: item.country,
          value: item.participations.reduce((prev, curr) => (prev + curr.medalsCount), 0)
        }
      })
      )
    )
  }

  onSelect(item: DataItem): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    console.log('Item clicked', item);
    this.router.navigateByUrl(`${item.name}`)
  }

  onActivate(data: string): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));

  }

  onDeactivate(data: string): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
