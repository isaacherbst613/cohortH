export default interface Weather {
    zip: string;
    deets: Object;
}

export interface WeatherRes {
    place: string,
    icon: string,
    details: {temp: string, sunset: number}
}

export interface WeatherServerResponse {
    name: string;
    weather: { icon: string, description: string}[];
    main: { temp: number };
    sys: {sunset: number}
  }