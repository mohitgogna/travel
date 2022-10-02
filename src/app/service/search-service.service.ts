import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FlightSearchResponse } from '../model/flightSearchResponse';
import { flightSearchRequest, Leg } from '../model/flightSearchRequest';
import { searchLeg, searchOtherInfo } from '../model/UI_Model/flightSearch';
import { bookingRequest } from '../model/bookingRequest';
import { baseUrl } from 'src/environments/environment';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {


  constructor(private httpClient: HttpClient, private environment: AppConfigService) { }

  searchFlight(_flightSearchReq: flightSearchRequest) {
    console.log(_flightSearchReq);
    //return this.httpClient.post<flightSearchRequest>(`${baseUrl}/air/search`, _flightSearchReq);
    return this.httpClient.post<flightSearchRequest>(this.environment.config.apiBaseUrl +
      this.environment.config.apiEndpoints.flightSearch, _flightSearchReq);
    

    //return this.httpClient.get("./assets/data_oneway.json")
  }

  bookFlight(_bookingRequest: bookingRequest) {
    console.log("_bookingRequest");
    console.log(_bookingRequest);
    //return this.httpClient.post<bookingRequest>(`${baseUrl}/air/book`, _bookingRequest);
    return this.httpClient.post<bookingRequest>(this.environment.config.apiBaseUrl +
      this.environment.config.apiEndpoints.flightBooking, _bookingRequest);
  }

}
