import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { Statistic } from 'src/app/core/models/statistic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  public olympics$!: Observable<Olympic[]>;
  
  title!: string;
  statistics!: Statistic[];
  view!: [number,number];

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.title = "Medals per Country";
    this.olympics$.pipe(
      tap(stats => {
        this.statistics = [{
          statName: "Number of JOs",
          value: (stats[0] === undefined ? 0 : stats[0].participations.length)
        },{
          statName: "Number of countries",
          value: stats.length
        }];
        this.onResize()
      })
    ).subscribe();
  }

  onResize() {
    const header = document.getElementById("headerContainer")?.offsetHeight ?? 0
    console.log(header);
    this.view = [innerWidth-40, innerHeight-header-40];
  }
}
