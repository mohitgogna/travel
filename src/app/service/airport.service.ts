import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, tap } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AirportResponse } from '../model/airport';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private httpClient: HttpClient, private environment: AppConfigService) { }

  getAllAirports(){
    return this.httpClient.get(this.environment.config.apiBaseUrl +
      this.environment.config.apiEndpoints.airports_all);
  }

  // getAllAirports():Observable<AirportResponse> {

  //   return this.httpClient.get<AirportResponse>(this.environment.config.apiBaseUrl +
  //     this.environment.config.apiEndpoints.airports_all);
  // }

  getDomesticAirports() {
    return this.httpClient.get(this.environment.config.apiBaseUrl +
      this.environment.config.apiEndpoints.airports_India);
  }
}
