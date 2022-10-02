import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ListRequest, ListSuccess } from 'src/actions/user-action';
import { FlightSearchAdapterService } from 'src/app/core/model/flight-search-adapter.service';
import { flightSearchModel } from 'src/app/model/flightSearchModel';
import { flightSearchRequest, Leg, Passengers, Pricing } from 'src/app/model/flightSearchRequest';
import { DatatransferService } from 'src/app/service/datatransfer.service';
import { SearchServiceService } from 'src/app/service/search-service.service';
import { StaticdataService } from 'src/app/service/staticdata.service';
import { getUserLoaded, getUserLoading, getUsers, RootReducerState } from 'src/reducers';

declare var $: any;  //jQuery

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flightType; itinerary; pax; triptype; cabin; sub;
  oneWay: Leg; return: Leg; multi: Leg;
  selectedDeparture; selectedArrival; departureDate; returnDate; guests;
  _departureDate; _returnDate;

  flightSearch: flightSearchRequest = new flightSearchRequest();
  cityList: string[];
  _flightsearchmodel: flightSearchModel;

  guestList = this.staticdata.guestList;
  citydata = this.staticdata.citydata;

  set data(value: object) { this.dataService.flightData = value; }
  set dataMulti(value: object) { this.dataService.flightData_Multi = value; }

  @ViewChild('depdate') depdate: ElementRef;
  @ViewChild('retrndate') retrndate: ElementRef;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private searchService: SearchServiceService,
    private _FlightSearchAdapterService: FlightSearchAdapterService, private dataService: DatatransferService,
    private store: Store<RootReducerState>, private staticdata: StaticdataService) { }

  ngOnInit(): void {
    $(
      function () {
        $("#departure_date").datepicker({ dateFormat: "d MM, yy" });
        $("#return_date").datepicker({ dateFormat: "d MM, yy" });
      })

    this.sub = this._activatedRoute.paramMap.subscribe(params => {
      this.flightType = params.get('flighttype');
      this.itinerary = params.get('itinerary');
      this.pax = params.get('pax');
      this.triptype = params.get('triptype');
      this.cabin = params.get('cabin');

      console.log(this.itinerary + " - " + this.pax + " - " + this.triptype + " - " + this.cabin);

      this.getUrlParameters();
      if (this.flightType != "multi") {
        this.createSearchRequest(this.dateFormat(this.departureDate, "yyyy-MM-dd"), this.dateFormat(this.returnDate, "yyyy-MM-dd"));
      } else {
        this.createSearchRequest_multi();
      }

      this.searchFlight();
    });
  }

  public counter() {
    return new Array(this.itinerary.split(';').length);
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
    this.sub.unsubscribe();
  }

  onBack(): void {
    this._router.navigate(['dashboard']);
  }

  getUrlParameters() {
    this.selectedDeparture = this.itinerary.split('_')[0];
    this.selectedArrival = this.itinerary.split('_')[1];
    this.departureDate = this.itinerary.split('_')[2];//"2022-04-15";
    this.returnDate = this.itinerary.split('_').length == 4 ? this.itinerary.split('_')[3] : "";
    this.guests = parseInt(this.pax.split('-')[1]);
  }

  createSearchRequest_multi() {
    console.log(this.itinerary);
    this.flightSearch.legs = [];
    let multisegment = this.itinerary.split(';');
    multisegment.forEach(element => {
      let leginfo = element.split('_');
      let segmentLeg = new Leg();
      segmentLeg.from = leginfo[0];
      segmentLeg.to = leginfo[1];
      segmentLeg.departureDate = leginfo[2];
      this.flightSearch.legs.push(segmentLeg);
    });

    this.setFlightSearchParameter();
  }

  createSearchRequest(localDepDate, localRetDate) {
    console.log("createSearchRequest - " + this.selectedDeparture + " - " + this.selectedArrival + " - " + localDepDate + " - " + localRetDate);

    this.oneWay = new Leg();
    this.oneWay.from = this.selectedDeparture;
    this.oneWay.to = this.selectedArrival;
    this.oneWay.departureDate = localDepDate;//this.departureDate;
    this.flightSearch.legs = [this.oneWay];

    if (localRetDate != "") {
      this.return = new Leg();
      this.return.from = this.selectedArrival;
      this.return.to = this.selectedDeparture;
      this.return.departureDate = localRetDate;
      this.flightSearch.legs.push(this.return);
    }

    this.setFlightSearchParameter();
  }

  setFlightSearchParameter() {
    this.flightSearch.maxSolutions = 200;
    this.flightSearch.pricing = new Pricing();
    this.flightSearch.pricing.currency = "INR";
    this.flightSearch.cabins = [this.cabin];
    this.flightSearch.passengers = new Passengers();
    this.flightSearch.passengers.ADT = parseInt(this.guests);
    this.flightSearch.requestId = "4e2fd1f8-2221-4b6c-bb6e-cf05c367cf60";
  }

  searchFlight() {
    console.log(this.flightSearch);

    this.searchService.searchFlight(this.flightSearch).subscribe(
      (responsedata: any) => {
        this.hideloader();
        if (responsedata.success) {
          this._flightsearchmodel = this._FlightSearchAdapterService.adapt(responsedata);
        }
        else {
          alert("No flight found");
          this._router.navigate(['dashboard']);
          //this._flightsearchmodel.payload = [];
        }

        if (this.flightType != "multi") {
          //setting return date
          this.returnDate = this.retrndate.nativeElement.value;
        }

        console.log(responsedata);
        //console.log(this._flightsearchmodel);
      },
      (error) => {
        this.hideloader();
        alert('Request failed with error')
        console.error(error);
        this._router.navigate(['dashboard']);
      })
  }

  // searchFlight_withRedux() {
  //   const loading$ = this.store.select(getUserLoading);
  //   const loaded$ = this.store.select(getUserLoaded);
  //   const getUserData$ = this.store.select(getUsers);

  //   combineLatest([loaded$, loading$]).subscribe((data) => {
  //     if (!data[0] && !data[1]) {
  //       this.store.dispatch(new ListRequest());

  //       this.searchService.searchFlight(this.flightSearch).subscribe(
  //         (responsedata: any) => {
  //           console.log("data");
  //           if (responsedata) {
  //             console.log("hideloader");
  //             this.hideloader();
  //           }
  //           console.log("flights response");
  //           console.log(responsedata);

  //           this.store.dispatch(new ListSuccess({ data: responsedata }));
  //         },
  //         (error) => {
  //           this.hideloader();
  //           alert('Request failed with error')
  //           console.error(error);
  //           this._router.navigate(['dashboard']).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //     }
  //   });
  //   getUserData$.subscribe((data) => {
  //     console.log("redux");
  //     console.log(data);
  //     this._flightsearchmodel = this._FlightSearchAdapterService.adapt(data);
  //   });
  // }

  bookFlight(flight, _direction) {
    this.data = { "type": "single", "flight": flight, "direction": _direction };
    this._router.navigate(['flightbooking']);
  }

  

  searchUpdatedFlight(form: NgForm) {
    if (form.valid) {
      this.showloader();
      this.createSearchRequest(this.dateFormat(this.depdate.nativeElement.value, "yyyy-MM-dd"), this.dateFormat(this.retrndate.nativeElement.value, "yyyy-MM-dd"));
      this.searchFlight();
    }
  }

  hideloader() {
    //document.getElementById('loader')!.style.display = 'none';
    document.getElementById('loading')!.style.display = 'none';
  }

  showloader() {
    //document.getElementById('loader')!.style.display = 'block';
    document.getElementById('loading')!.style.display = 'block';
  }

  bookFlight_multi(flight, _direction) {
    this.data = { "type": "multi", "flight": flight, "direction": _direction };
    this._router.navigate(['flightbooking']);
  }
  
  dateFormat(inputDate, format) {

    if (inputDate == "") {
      return "";
    }
    //parse the input date
    const date = new Date(inputDate);

    //extract the parts of the date
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    //replace the month
    format = format.replace("MM", month.toString().padStart(2, "0"));

    //replace the year
    if (format.indexOf("yyyy") > -1) {
      format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
      format = format.replace("yy", year.toString().substr(2, 2));
    }

    //replace the day
    format = format.replace("dd", day.toString().padStart(2, "0"));

    return format;
  }

}
