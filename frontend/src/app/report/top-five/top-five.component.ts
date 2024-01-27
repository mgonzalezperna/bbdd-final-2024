import { Component, OnInit } from '@angular/core';
import { Experience } from '../../domain/Experience';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'top-five-experiences',
  templateUrl: './top-five.component.html',
  styleUrls: ['../report.component.css']
})
export class TopFiveComponent implements OnInit {

  top_five_experiences: Experience[] = []
  loading: boolean = false
  server_error: String = ""

  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  async fetchTop5() {
    this.server_error = ""
    this.loading = true
    try {
      this.top_five_experiences = await this.reportService.topFive()
    } catch (error) {
      this.server_error = String(error)
      console.log(error)
    }
    this.loading = false
  }

}
