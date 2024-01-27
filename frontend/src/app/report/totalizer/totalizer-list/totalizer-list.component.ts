import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { Report_EVSE } from '../../../domain/Report';
import { compare } from '../../../compare';

@Component({
  selector: 'totalizer-list',
  templateUrl: './totalizer-list.component.html',
  styleUrls: ['./totalizer-list.component.css']
})
export class TotalizerListComponent {
  @Input() report_invoices: Report_EVSE[] =  []
  displayed_columns: String[] = ['EVSE_model', 'avg_score', 'max_power_transfered', 'min_power_transfered', 'total_invoices']

  constructor() {}

  sortData(sort: Sort) {
    const data = this.report_invoices.slice();
    if (!sort.active || sort.direction === '') {
      this.report_invoices = data
      return;
    }

    this.report_invoices = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'EVSE_model': return compare(a.EVSE_model, b.EVSE_model, isAsc)
        case 'avg_score': return compare(a.avg_score, b.avg_score, isAsc)
        case 'max_power_transfered': return compare(a.max_power_transfered, b.max_power_transfered, isAsc)
        case 'min_power_transfered': return compare(a.min_power_transfered, b.min_power_transfered, isAsc)
        case 'total_invoices': return compare(a.total_invoices, b.total_invoices, isAsc)
        default: return 0;
      }
    })
  }

}