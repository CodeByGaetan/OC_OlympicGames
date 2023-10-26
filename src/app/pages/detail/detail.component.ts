import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { Statistic } from 'src/app/core/models/statistic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public olympic$!: Observable<Olympic>;
  
  title!: string;
  statistics!: Statistic[];

  constructor(private olympicService: OlympicService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const olympicName : string = this.route.snapshot.params['countryName'];
    this.olympic$ = this.olympicService.getOlympicByName(olympicName);
    this.olympic$.pipe(
      tap(item => {
        this.title = item.country
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
      })
    ).subscribe();
  }
}
