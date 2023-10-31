import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { Statistic } from 'src/app/core/models/statistic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  olympic$!: Observable<Olympic>;
  
  title!: string;
  statistics!: Statistic[];
  view!: [number,number];

  constructor(private olympicService: OlympicService,
  private route: ActivatedRoute) {}

  ngOnInit(): void {
    const olympicName : string = this.route.snapshot.params['countryName'];
    this.olympic$ = this.olympicService.getOlympicByName(olympicName);
    this.olympic$.pipe(
      tap(item => {
        this.title = item.country;
        this.statistics = [{
          statName: "Number of entries",
          value: item.participations.length
        },{
          statName: "Total number of medals",
          value: item.participations.reduce((prev,curr) => prev + curr.medalsCount,0)
        },{
          statName: "Total number of athletes",
          value: item.participations.reduce((prev,curr) => prev + curr.athleteCount,0)
        }];
        this.onResize()
      })
    ).subscribe();
  }

  onResize() {
    const headerHeight = document.getElementById("headerContainer")?.offsetHeight ?? 0
    // const chartWidth = document.getElementById("chartContainer")?.offsetWidth ?? 0
    // const chartHeight = document.getElementById("chartContainer")?.offsetHeight ?? 0
    console.log(headerHeight);
    this.view = [innerWidth-40, innerHeight-headerHeight-40];
    // this.view = [chartWidth, chartHeight];
  }
}
