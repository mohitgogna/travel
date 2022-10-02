import { Segment } from './flightSearchResponse';

export class bookingRequest {
    segments: Segment[];
    passengers: passenger[];
    phone: phone;
}

export class passenger {
    lastName: string;
    firstName: string;
    passCountry: string="IN";
    passNumber: string="PASS001";
    birthDate: string;
    gender: string;
    ageCategory: string;
}

export class phone {
    countryCode: string;
    location: string="DEL";
    number: string;
}