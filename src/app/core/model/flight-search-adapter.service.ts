import { Injectable } from '@angular/core';
import { FlightPayload, flightSearchModel, PassengerCounts, Payload, Segment } from 'src/app/model/flightSearchModel';
import { FlightSearchResponse } from 'src/app/model/flightSearchResponse';
import { Adapter } from '../adapter';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchAdapterService implements Adapter<flightSearchModel> {

  //constructor() { }

  adapt(item: any): flightSearchModel {
    let result = this.convert_segment(item);
    return result;
    //return new flightSearchModel(item.timestamp, item.success, item.message, item.payload);//new Date(item.departure));    
    //return this.convert(item);

  }

  convert(item: FlightSearchResponse): flightSearchModel {
    let _payloadList: FlightPayload[] = [];
    let _payload: FlightPayload;
    let _segmentList: Segment[];

    item.payload.forEach(element1 => {
      let _segmentList: Segment[] = [];

      element1.directions.forEach(element2 => {
        element2.forEach(element3 => {
          element3.segments.forEach(element4 => {
            let _Segment: Segment = new Segment(
              element4.from,
              element4.to,
              element4.group,
              element4.departure,
              element4.arrival,
              element4.airline,
              element4.flightNumber,
              element4.uapi_segment_ref,
              element4.uapiSegmentReference,
              element4.details,
              element4.serviceClass,
              element4.plane,
              element4.duration,
              element4.techStops,
              element4.bookingClass,
              element4.baggage,
              element4.fareBasisCode);

            _segmentList.push(_Segment)
          });
        });
      });

      // _payload = new FlightPayload(element1.totalPrice, element1.basePrice, element1.taxes, element1.platingCarrier, [],
      //   element1.bookingComponents, element1.passengerFares, element1.passengerCounts, _segmentList);
      // _payloadList.push(_payload);
    });

    let _flightSearchModel: flightSearchModel = new flightSearchModel(item.timestamp,
      item.success,
      item.message,
      //item.payload,
      _payloadList);

    return _flightSearchModel;
  }

  convert_segment(item: FlightSearchResponse): flightSearchModel {

    const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())));

    // let output=cartesian(...item.payload[0].directions);
    // console.log(output);

    let _payloadList: FlightPayload[] = [];
    let _payload;
    item.payload.forEach(element1 => {

      _payload = new FlightPayload(element1.totalPrice, element1.basePrice, element1.taxes, element1.platingCarrier, cartesian(...element1.directions), element1.bookingComponents,
        element1.passengerFares, element1.passengerCounts);
      // _payload.totalPrice=element1.totalPrice;
      // _payload.basePrice=element1.basePrice;
      // _payload.taxes=element1.taxes;
      // _payload.platingCarrier=element1.platingCarrier;
      // _payload.bookingComponents=element1.bookingComponents;
      // _payload.passengerFares=element1.passengerFares;
      // _payload.passengerCounts=element1.passengerCounts;
      //_payload.directions=cartesian(...element1.directions);

      _payloadList.push(_payload);
    });

    return new flightSearchModel(item.timestamp, item.success, item.message, _payloadList);
  }
  // convert_segment(item: FlightSearchResponse): flightSearchModel {
  //   let _segmentList: Segment[];
  //   let _segment: Segment;

  //   let i3_count: number = 0;
  //   for (let i1 = 0; i1 < item.payload.length; i1++) {
  //     _segmentList = [];
  //     for (let i2 = 0; i2 < item.payload[i1].directions.length; i2++) {
  //       for (let i3 = i3_count; i3 < item.payload[i1].directions[i2].length; i3++) {

  //         for (let i4 = 0; i4 < item.payload[i1].directions[i2][i3].segments.length; i4++) {
  //           _segmentList.push(item.payload[i1].directions[i2][i3].segments[i4]);
  //         }//item.payload.directions[][].segments
  //         i3_count = i3;
  //         break;
  //       }//item.payload.directions[]
  //     }//item.payload.directions
  //   }//item.payload
  // }
}
