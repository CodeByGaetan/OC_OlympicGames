import { Component, Input, OnInit } from '@angular/core';
import { Statistic } from '../../../core/models/statistic.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() statistics!: Statistic[];

  constructor() { }

  ngOnInit(): void {
  }

}
