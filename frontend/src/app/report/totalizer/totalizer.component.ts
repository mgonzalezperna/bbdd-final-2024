import { Component, OnInit } from '@angular/core';
import { EVSE } from '../../domain/EVSE';
import { Report_EVSE } from '../../domain/Report';
import { EVSEsService } from '../../services/EVSE.service';
import { ReportService } from '../../services/report.service';
import { Validators } from '@angular/forms';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'totalizer',
  templateUrl: './totalizer.component.html',
  styleUrls: ['../report.component.css'],
})
export class TotalizerComponent implements OnInit {
  selectedModel: String = String("All")
  listModels = new Set().add(this.selectedModel)
  server_error: String = ""
  report_invoices: Report_EVSE[] = []
  loading: boolean = false
  loading_report: boolean = false
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private EVSEService: EVSEsService, private reporteService: ReportService) { }

  async ngOnInit() {
    this.loading = true
    try {
      let listEVSE = await this.EVSEService.requestList()
      listEVSE.map(evse=>this.listModels.add(String(evse.model)))
    }
    catch (error) {
      this.server_error = String(error)
      console.log(error) // mostrar errores
    }
    this.loading = false
  }

  get errorMsgDate() {
    return this.range.hasError('required') ? "Date range is required" : ''
  }

  cantSubmit() {
    return this.range.get("start")!.value==null || this.range.get("end")!.value==null
  }

  dateFromFormatted() {
    if (this.range.get("start") ){
      return formatDate(this.range!.get("start")!.value!)
    }
    throw new Error("Date From is invalid!");
  }

  dateToFormatted() {
    if (this.range.get("end")){
      return formatDate(this.range!.get("end")!.value!)
    }
    throw new Error("Date End is invalid!");
  }

  async fetchReportInvoices() {
    this.loading_report = true
    this.report_invoices = []
    console.log(this.selectedModel)
    if (this.selectedModel) {
      if (this.selectedModel == "All") {
        this.report_invoices = await this.reporteService.reportInvoicesNoEVSE(this.dateFromFormatted(), this.dateToFormatted())
      } else {
        this.report_invoices = await this.reporteService.reportInvoicesEVSE(this.dateFromFormatted(), this.dateToFormatted(), this.selectedModel)
    }} else {
        throw new Error("EVSE is empty!")
    }
    this.loading_report = false
  }
}

function formatDate(fecha: Date) {
  // AA-MM-DD
  return `${fecha.getFullYear()}-${agregarCero(
    fecha.getMonth() + 1
  )}-${agregarCero(fecha.getDate())}`;
}

function agregarCero(dia: number) {
  if (dia < 10) return `0${dia}`;
  else return dia;
}