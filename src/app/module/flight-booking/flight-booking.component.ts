import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { bookingRequest, passenger, phone } from 'src/app/model/bookingRequest';
import { flightSearchModel, Payload } from 'src/app/model/flightSearchModel';
import { DatatransferService } from 'src/app/service/datatransfer.service';
import { SearchServiceService } from 'src/app/service/search-service.service';

declare var $: any;  //jQuery

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {
  _flightbookingData;  _flightinfo; _flightType;
  _bookingRequest: bookingRequest = new bookingRequest();
  _passenger: passenger = new passenger();
  _phone: phone = new phone();

  get data(): object { return this.dataService.flightData; }

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private dataService: DatatransferService,
    private searchService: SearchServiceService) { }

  ngOnInit(): void {

    $(
      function () {
        $("#departure_date").datepicker({ dateFormat: "d MM, yy" });
        $("#return_date").datepicker({ dateFormat: "d MM, yy" });
      }
    );

    let dataJson = JSON.parse(JSON.stringify(this.data));
    console.log(dataJson);
    this._flightType=dataJson.type;    
    this._flightinfo = dataJson.flight;
    this._flightbookingData = dataJson.direction;
    //this._flightbookingData = this._flightType=="multi"?dataJson.direction:"";
    

    this.hideloader();
  }

  bookFlight() {
    //this.showloader();
    // if (this._flightinfo.directions.length == 1) {
    //   this._bookingRequest.segments = [this._flightinfo.directions[0][0].segments[0]];
    // } else {
    //   this._bookingRequest.segments = [this._flightinfo.directions[0][0].segments[0], this._flightinfo.directions[1][0].segments[0]];
    // }

    

    this._passenger.ageCategory=this.getAge(this._passenger.birthDate)
    if(this._flightType=="multi"){
      this._bookingRequest.segments = [];
      this._flightbookingData.forEach(element => {
        this._bookingRequest.segments.push(...element.segments);        
      });
    } else{
      this._bookingRequest.segments = this._flightbookingData.segments;
    }
    

    this._bookingRequest.passengers = [this._passenger];
    this._bookingRequest.phone = this._phone;

    console.log(this._bookingRequest);
    //this.searchService.bookFlight(this._bookingRequest);
    
    this.searchService.bookFlight(this._bookingRequest).subscribe(
      (data: any) => {
        // if (data) {
        //   console.log("hideloader");
        //   this.hideloader();
        // }
        if (data.success) {
          //this.flightsearchmodel = this._FlightSearchAdapterService.adapt(data);
          console.log("flight booking response");
          console.log(data);
          this._router.navigate(['confirmation']);
        }
        else {
          alert(`Flight booking failed ${data.message}`);
        }

      },
      (error) => {
        alert('Booking request failed with error')
        console.error(error);
        //this._router.navigate(['dashboard']);
      })
  }

  getAge(dateOfBirth):string{
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if(age > 18){
      return "ADT";
    } else{
      return "CHLD";
    }
  }

  changeCountry(e) {
    console.log(e.target.value);
    this._phone.countryCode = e.target.value;
  }

  hideloader() {
    document.getElementById('loader')!.style.display = 'none';
  }

  showloader() {
    console.log("showloader");
    // let abc = document.getElementById("loader");
    // if (abc) {
    //   abc.style.display = "block";
    // }
    document.getElementById('loader')!.style.display = 'block';
  }
}
