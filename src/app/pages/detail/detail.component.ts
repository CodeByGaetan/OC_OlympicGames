import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';
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

  // Detect resize on header
  obs : ResizeObserver = new ResizeObserver(entries => {
    console.log(entries)
    // for (let entry of entries) {
      // const cr = entry.contentRect;
      this.resizeGraph();
    // }
  });

  constructor(private olympicService: OlympicService,
  private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Detect resize on header
    const container = document.getElementById('headerDetail');
    if (container) {
      this.obs.observe(container);
    }

    console.log("Init Detail");
    const olympicName : string = this.route.snapshot.params['countryName'];
    this.olympic$ = this.olympicService.getOlympicByName(olympicName);
    this.olympic$.pipe(
      tap(item => {

        // console.log("pipe Detail : " + item.country);

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

        // this.resizeGraph();
  
      })
    ).subscribe();
  }

  resizeGraph() {
    const headerHeight = document.getElementById("headerDetail")?.offsetHeight ?? 0
    // const chartWidth = document.getElementById("chartContainer")?.offsetWidth ?? 0
    // const chartHeight = document.getElementById("chartContainer")?.offsetHeight ?? 0
    // console.log("Detail, hauteur du Header : " + headerHeight);
    this.view = [innerWidth-40,  Math.max(innerHeight-headerHeight-40, 200)];
    // this.view = [chartWidth, chartHeight];
  }
}
