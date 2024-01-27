import { Injectable } from '@angular/core';
import { API_URL, userLoggedIn, userLoggedInId } from './configuration';
import { HttpClient } from '@angular/common/http';
import { EVSE } from '../domain/EVSE';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EVSEsService {
  EVSEs: EVSE[] = []

  constructor(private http: HttpClient) {
  }

  async requestList() {
    const url = API_URL + "/EVSEs"
    return await lastValueFrom(this.http.get<EVSE[]>(url))
  }

  async update(EVSE: EVSE) {
    const url = API_URL + `/EVSEs/${EVSE.idEVSE}/update`
    await lastValueFrom(this.http.post(url, EVSE.toJSON()))
  }

  async create(EVSE: EVSE) {
    const url = API_URL + `/EVSEs/create`
    await lastValueFrom(this.http.post(url, EVSE.toJSON()))
  }

  async delete(EVSE: EVSE) {
    const url = API_URL + `/EVSEs/${EVSE.idEVSE}/delete`
    await lastValueFrom(this.http.post(url, {}))
  }
}