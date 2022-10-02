
export class AirportResponse {
    timestamp: string
    success: boolean
    message: string
    payload: Payload[]
}

export class Payload {
    iata: string
    name: string
    city: string
    country: string
}
