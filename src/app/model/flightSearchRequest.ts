export class flightSearchRequest {
    legs: Leg[];
    passengers: Passengers;
    cabins: string[];
    requestId: string;
    maxSolutions: number;
    pricing: Pricing;
}

export class Leg {
    from: string;
    to: string;
    departureDate: string|undefined;
}

export class Passengers {
    ADT: number
}

export class Pricing {
    currency: string
}
