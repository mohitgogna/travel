import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class StaticdataService {

  constructor(private environment: AppConfigService) {
    console.log(this.environment);
    this.guestList_func();
  }

  readonly citydata = [
    { name: 'Delhi', code: 'DEL' },
    { name: 'Mumbai', code: 'BOM' },
    { name: 'Chennai', code: 'MAA' },
    { name: 'Bangalore', code: 'BLR' },
    { name: 'Ahmedabad', code: 'AMD' },
    { name: 'Hyderabad', code: 'HYD' },
    { name: 'Jaipur', code: 'JAI' },
    { name: 'Udaipur', code: 'UDR' },
    { name: 'Dublin', code: 'DUB' },
    { name: 'Hongkong', code: 'HK' },
    { name: 'Kuala Lampur', code: 'KUL' },
    { name: 'NewYork', code: 'NYC' },
    { name: 'Jakarta', code: 'JKT' },
    { name: 'Bangkok', code: 'BKK' },
    { name: 'Dubai', code: 'DXB' }
  ];

 // readonly guestList :any[] = [];
  readonly guestList = [
    { name: '1 Guest', code: '1' },
    { name: '2 Guest', code: '2' },
    { name: '3 Guest', code: '3' },
    { name: '4 Guest', code: '4' },
    { name: '5 Guest', code: '5' }
  ];
  
  public guestList_func() {
    // for (let i = 0; i < this.environment.config.guest; i++) {
    //   var tmp = { name: i + " Guest", code: i.toString() };
    //   this.guestList.push(tmp);
    // }
  }
}