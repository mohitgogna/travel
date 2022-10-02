export class FlightSearchResponse {
    timestamp: string
    success: boolean
    message: string
    payload: Payload[]
  }
  
  export class Payload {
    totalPrice: string
    basePrice: string
    taxes: string
    platingCarrier: string
    directions: Direction[][]
    bookingComponents: BookingComponent[]
    passengerFares: PassengerFares
    passengerCounts: PassengerCounts
  }
  
  export class Direction {
    from: string
    to: string
    platingCarrier: string
    segments: Segment[]
  }
  
  export class Segment {
    from: string
    to: string
    group: number
    departure: string
    arrival: string
    airline: string
    flightNumber: string
    uapi_segment_ref: string
    uapiSegmentReference: string
    details: Detail[]
    serviceClass: string
    plane: string[]
    duration: string[]
    techStops: any[]
    bookingClass: string
    baggage: Baggage[]
    fareBasisCode: string
  }
  
  export class Detail {
    origin: string
    //originTerminal?: string
    originTerminal: string
    destination: string
    //destinationTerminal?: string
    destinationTerminal: string
    departure: string
    flightTime: string
    travelTime: string
    equipment: string
  }
  
  export class Baggage {
    units: string
    amount: number
  }
  
  export class BookingComponent {
    totalPrice: string
    basePrice: string
    taxes: string
    uapi_fare_reference: string
  }
  
  export class PassengerFares {
    ADT: Adt
  }
  
  export class Adt {
    totalPrice: string
    basePrice: string
    taxes: string
    //equivalentBasePrice?: string
    equivalentBasePrice: string
  }
  
  export class PassengerCounts {
    ADT: number
  }
  