export class searchLeg {
    // from: string;
    // to: string;
    // departureDate: string;

    constructor(public from: string,
        public to: string,
        public departureDate: string){

    }
}

export class searchOtherInfo{
    passengers:Passengers;
    class:string;
}

export class Passengers {
    ADT: number
}

export class Pricing {
    currency: string
}