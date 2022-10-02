import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  private readonly SELFLT = "SELFLT";
  private readonly SELFLTMUL = "SELFLTMUL";
  private readonly SRCH = "SRCH";
  constructor() { }

  flightData1: object;
  serviceData: string;
  bookingData: object;

  getUser() {
    return sessionStorage.getItem("user");
  }

  //flight data
  get flightData(): object {
    return JSON.parse(sessionStorage.getItem(this.SELFLT)!);
  }

  set flightData(value: object) {
    sessionStorage.setItem(this.SELFLT, JSON.stringify(value));
  }

  //multi segment flight data
  get flightData_Multi(): object {
    return JSON.parse(sessionStorage.getItem(this.SELFLTMUL)!);
  }

  set flightData_Multi(value: object) {
    sessionStorage.setItem(this.SELFLTMUL, JSON.stringify(value));
  }

  //flight search data
  get flightSearch(): string {
    return JSON.parse(sessionStorage.getItem(this.SRCH)!);
  }

  set flightSearch(value: string) {
    sessionStorage.setItem(this.SRCH, JSON.stringify(value));
  }

}
