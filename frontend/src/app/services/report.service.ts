import { Injectable } from '@angular/core';
import { API_URL, userLoggedIn, userLoggedInId } from './configuration';
import { HttpClient } from '@angular/common/http';
import { EVSE } from '../domain/EVSE';
import { Experience } from '../domain/Experience';
import { Report, Report_EVSE } from '../domain/Report';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  EVSE: EVSE[] = []

  constructor(private http: HttpClient) {
  }

  async topFive() {
    const url = API_URL + "/experiences-v2g"
    return await lastValueFrom(this.http.get<Experience[]>(url))
  }

  async reportInvoicesNoEVSE(date_from: String, date_to: String) {
    const url = API_URL + "/transaction-report-by-dates"
    const json : any = {}
    json.date_from = date_from
    json.date_to = date_to
    return await lastValueFrom(this.http.post<Report_EVSE[]>(url, json))
  }

  async reportInvoicesEVSE(date_from: String, date_to: String, EVSE_model: String) {
    const url = API_URL + "/transaction-report-by-dates-and-evse"
    const json : any = {}
    json.date_from = date_from 
    json.date_to = date_to
    json.EVSE = EVSE_model
    return await lastValueFrom(this.http.post<Report_EVSE[]>(url, json))
 }
}