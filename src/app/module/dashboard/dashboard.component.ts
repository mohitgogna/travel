import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { flightSearchRequest, Leg, Passengers, Pricing } from 'src/app/model/flightSearchRequest';
import { SearchServiceService } from 'src/app/service/search-service.service';
import { searchLeg, searchOtherInfo } from 'src/app/model/UI_Model/flightSearch';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import { StaticdataService } from 'src/app/service/staticdata.service';
import { AirportService } from 'src/app/service/airport.service';
import { mapTo, Observable } from 'rxjs';
import { AirportResponse } from 'src/app/model/airport';

declare var $: any;  //jQuery

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  selectedDeparture;
  selectedArrival;
  departureDate;
  returnDate
  guests;
  guestAdult; guestChild; guestInfant;
  flightClass = "Economy";
  isReturn = true;

  flightSearch: flightSearchRequest = new flightSearchRequest();
  citydata;// = this.staticdata.citydata;
  citydata_1: Observable<AirportResponse>;
  guestList; domesticInter;


  @ViewChild('depdate') depdate: ElementRef;
  @ViewChild('returndate') returndate: ElementRef;

  constructor(private searchService: SearchServiceService, private router: Router, private staticdata: StaticdataService
    , private fb: FormBuilder, private _AirportService: AirportService) {
    console.log("dashboard ctor");

    this.searchForm = this.fb.group({
      name: '',
      flights: this.fb.array([]),
    });

    this.guestList = this.staticdata.guestList;
  }


  multisegDepDate: Date;

  ngOnInit(): void {

    $(
      function () {
        $("#departure_date").datepicker({ dateFormat: "d MM, yy" });
        $("#return_date").datepicker({ dateFormat: "d MM, yy" });
      }
    );

    this.selectedDeparture = "DEL";
    this.selectedArrival = "BOM";
    this.guestAdult = "1";
    this.departureDate = formatDate(new Date(), 'd MMM, yyyy', 'en');

    this.flightClass = "Economy";
    this.domesticInter = "Domestic";

    this.multisegDepDate = new Date('01/01/2020');
    this.getAirport();
    console.log(this.multisegDepDate);
  }

  // guestChange(e) {
  //   this.guests = e.target.value;
  // }

  searchFlight(form: NgForm) {
    let itinerary = this.selectedDeparture + "_" + this.selectedArrival + "_" + this.depdate.nativeElement.value;

    if (this.returndate.nativeElement.value != "") {
      itinerary = itinerary + "_" + this.returndate.nativeElement.value;
    }

    if (this.guestAdult != undefined && this.guestAdult > 0) {
      this.guests = "A-" + this.guestAdult;
    }
    if (this.guestChild != undefined && this.guestChild > 0) {
      this.guests = this.guests + "_C-" + this.guestChild;
    }
    if (this.guestInfant != undefined && this.guestInfant > 0) {
      this.guests = this.guests + "_I-" + this.guestInfant;
    }

    if (form.valid) {
      console.log("valid");
      this.router.navigate(['./flightlist', "single", itinerary, this.guests, "triptype", this.flightClass])
    }
    else {
      console.log("invalid");
    }
  }

  searchForm: FormGroup;

  flights(): FormArray {
    return this.searchForm.get("flights") as FormArray
  }

  newQuantity(): FormGroup {
    let lastArrival = this.searchForm.value.flights.length > 0 ?
      this.searchForm.value.flights[this.searchForm.value.flights.length - 1].arrivalcity : this.selectedArrival;

    //this.searchForm.value.flights[this.searchForm.value.flights.length-1].arrivalcity

    return this.fb.group({
      departurecity: lastArrival,
      arrivalcity: '',
      travelDate: '',
    })
  }

  addQuantity() {
    this.flights().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.flights().removeAt(i);
  }

  onSubmit() {
    console.log(this.searchForm.value.flights);
    console.log(this.departureDate);
    console.log(this.selectedDeparture);
    //let multiItinerary = this.selectedDeparture + "_" + this.searchForm.value.flights[0].city + "_" + this.departureDate + ";";
    let multiItinerary = this.selectedDeparture + "_" + this.selectedArrival + "_" + this.departureDate + ";";

    if (this.guestAdult != undefined && this.guestAdult > 0) {
      this.guests = "A-" + this.guestAdult;
    }
    if (this.guestChild != undefined && this.guestChild > 0) {
      this.guests = this.guests + "_C-" + this.guestChild;
    }
    if (this.guestInfant != undefined && this.guestInfant > 0) {
      this.guests = this.guests + "_I-" + this.guestInfant;
    }

    for (let i = 0; i < this.searchForm.value.flights.length; i++) {

      multiItinerary = multiItinerary + this.searchForm.value.flights[i].departurecity + "_" + this.searchForm.value.flights[i].arrivalcity + "_" +
        this.searchForm.value.flights[i].travelDate + ";";

      // if (this.searchForm.value.flights.length == (i + 1)) {
      //   multiItinerary = multiItinerary + this.searchForm.value.flights[i].departurecity + "_" + this.selectedDeparture + "_" +
      //     this.searchForm.value.flights[i].travelDate;
      // } else {
      //   multiItinerary = multiItinerary + this.searchForm.value.flights[i].city + "_" + this.searchForm.value.flights[i + 1].city + "_" +
      //     this.searchForm.value.flights[i].travelDate + ";";
      // }
    }

    multiItinerary = multiItinerary.slice(0, multiItinerary.lastIndexOf(';'));

    this.router.navigate(['./flightlist', "multi", multiItinerary, this.guests, "triptype", this.flightClass])

    // let itinerary = this.selectedDeparture + "_" + this.selectedArrival + "_" + this.depdate.nativeElement.value;

    // if(this.returndate.nativeElement.value!=""){
    //   itinerary=itinerary+"_" + this.returndate.nativeElement.value;
    // }

    //this.router.navigate(['./flightlist', itinerary, "A-" + this.guests, "triptype", "Economy"])

  }

  getAirport() {
    console.log(this.domesticInter);
    if (this.domesticInter == "Domestic") {
      this.getDomestic();
    } else {
      this.getInternational();
    }
  }

  getDomestic() {
    this._AirportService.getDomesticAirports().subscribe(
      (response: any) => {
        console.log("getDomestic-start");
        console.log(response);
        this.citydata = response.payload;
        console.log("getDomestic-end");
      },
      (error) => {
        console.log("Error occured in domestic airport fetch");
      }
    )
  }

  getInternational() {
    this._AirportService.getAllAirports().subscribe(
      (response: any) => {
        console.log("getInternational-start");
        console.log(response);
        this.citydata = response.payload;
        console.log("getInternational-end");
      },
      (error) => {
        console.log("Error occured in international airport fetch");
      }
    )
  }
  toggleReturn() {
    this.isReturn = !this.isReturn;
  }

  toggleDomestic() {
    //reverse condition as ngModel value gives last selected redio btn value instead of new value
    if (this.domesticInter != "Domestic") {
      this.getDomestic();
    } else {
      this.getInternational();
    }
  }
}
