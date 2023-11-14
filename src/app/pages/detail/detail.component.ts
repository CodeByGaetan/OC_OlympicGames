import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Olympic } from 'src/app/core/models/olympic.model';
import { Statistic } from 'src/app/core/models/statistic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {

  olympic$!: Observable<Olympic>;
  title!: string;
  statistics!: Statistic[];
  view!: [number, number];

  private destroy$!: Subject<boolean>;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get olympic name for header and olympic$
    const olympicName: string = this.route.snapshot.params['countryName'];
    this.title = olympicName;
    this.olympic$ = this.olympicService.getOlympicByName(olympicName);

    this.destroy$ = new Subject<boolean>();

    // Get header data from olympic$
    this.olympic$.pipe(
      takeUntil(this.destroy$),
      tap(item => {
        this.statistics = [{
          statName: "Number of entries",
          value: item.participations.length
        }, {
          statName: "Total number of medals",
          value: item.participations.reduce((prev, curr) => prev + curr.medalsCount, 0)
        }, {
          statName: "Total number of athletes",
          value: item.participations.reduce((prev, curr) => prev + curr.athleteCount, 0)
        }];
      })
    ).subscribe();
  }

  // Size the chart after data loaded
  ngAfterViewInit(): void {
    this.resizeGraph();
    this.changeDetector.detectChanges();
  }

  // Resize the chart when window size change
  resizeGraph(): void {
    const headerHeight = document.getElementById("headerDetail")?.offsetHeight ?? 0;
    this.view = [innerWidth - 40, Math.max(innerHeight - headerHeight - 40, 200)];
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
