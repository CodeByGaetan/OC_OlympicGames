import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  refresh = false;
  message!: string;
  
  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const name : string = this.route.snapshot.params['name'];
    switch (name) {
      case undefined:
        this.message = "No corresponding page found";
        this.refresh = false;
        break;
      case 'olympics':
        this.message = "No olympics data found";
        this.refresh = true;
        break;
      default:
        this.message = `No olympic data found for the country named : ${name}`;
        this.refresh = false;
        break;
    }
  }

  reloadData() : void {
    if (this.refresh) {
      this.olympicService.loadInitialData().pipe(take(1)).subscribe();
    }
  }

}
