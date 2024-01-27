import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  crud_message: String = 'EVSE management: listing, creation, edition or deletion.' 
  crud_button: String = 'EVSE Manager'
  top_five_report_message: String = 'Report of the top 5 V2G experiences.'
  top_five_report_button: String = 'V2G Top 5'
  surveys_report_message: String = 'Invoices of the best experiences between dates filtering by EVSEs.'
  surveys_report_button: String = 'Top experiences by EVSEs between dates.'

  ngOnInit() {
    this.crud_button
    this.top_five_report_message 
    this.top_five_report_button
    this.surveys_report_message
    this.surveys_report_button
  }

}
