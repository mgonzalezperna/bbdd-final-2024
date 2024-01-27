import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort} from '@angular/material/sort';
import { Experience } from '../../../domain/Experience';
import { compare } from '../../../compare';

@Component({
  selector: 'top-five-list',
  templateUrl: './top-five-list.component.html',
  styleUrls: ['./top-five-list.component.css']
})
export class TopFiveListComponent implements OnInit {
  displayed_columns: String[] = ['start_datetime', 'duration_secs', 'experience_score', 'comments']
  @Input() top_five_experiences: Experience[] = []

  constructor() { }

  ngOnInit() { }

  sortData(sort: Sort) {
    const data = this.top_five_experiences.slice();
    if (!sort.active || sort.direction === '') {
      this.top_five_experiences = data
      return;
    }

    this.top_five_experiences = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'start_datetime': return compare(a.start_datetime, b.start_datetime, isAsc)
        case 'duration_secs': return compare(a.duration_secs, b.duration_secs, isAsc)
        case 'experience_score': return compare(a.experience_score, b.experience_score, isAsc)
        case 'comments': return compare(a.comments, b.comments, isAsc)
        default: return 0;
      }
    })
  }

}

