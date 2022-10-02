
export class flightSearchModel {
    constructor(
        public timestamp: string,
        public success: boolean,
        public message: string,
        //public payload: Payload[]

        public payload:FlightPayload[]
        ) { }
}

export class Payload {
    constructor(
        public totalPrice: string,
        public basePrice: string,
        public taxes: string,
        public platingCarrier: string,
        public directions: Direction[],
        public bookingComponents: BookingComponent[],
        public passengerFares: PassengerFares,
        public passengerCounts: PassengerCounts) { }        
}

export class FlightPayload {
    constructor(
        public totalPrice: string,
        public basePrice: string,
        public taxes: string,
        public platingCarrier: string,
        public directions: Direction[],
        public bookingComponents: BookingComponent[],
        public passengerFares: PassengerFares,
        public passengerCounts: PassengerCounts

        //public flights:Direction[]
        ) { }        
}

export class Direction {
    constructor(
        public from: string,
        public to: string,
        public platingCarrier: string,
        public segments: Segment[]) { }
}

export class Segment {
    constructor(
        public from: string,
        public to: string,
        public group: number,
        public departure: string,
        public arrival: string,
        public airline: string,
        public flightNumber: string,
        public uapi_segment_ref: string,
        public uapiSegmentReference: string,
        public details: Detail[],
        public serviceClass: string,
        public plane: string[],
        public duration: string[],
        public techStops: any[],
        public bookingClass: string,
        public baggage: Baggage[],
        public fareBasisCode: string) { }
}

export class Detail {
    constructor(
        public origin: string,
        public originTerminal: string,
        public destination: string,
        public destinationTerminal: string,
        public departure: string,
        public flightTime: string,
        public travelTime: string,
        public equipment: string) { }
}

export class Baggage {
    constructor(
        public units: string,
        public amount: number) { }
}

export class BookingComponent {
    // totalPrice: string
    // basePrice: string
    // taxes: string
    public uapi_fare_reference: string
}

export class PassengerFares {
    constructor(
        public ADT: Adt) { }
}

export class Adt {
    constructor(
        public totalPrice: string,
        public basePrice: string,
        public taxes: string,
        public equivalentBasePrice: string) { }
}

export class PassengerCounts {
    constructor(
        public ADT: number) { }
}

