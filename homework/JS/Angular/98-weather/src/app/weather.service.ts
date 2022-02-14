import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { WeatherRes, WeatherServerResponse } from 'src/types/weather';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(private httpClient: HttpClient) { }

    getWeather(zip: string): Observable<WeatherRes> {
        const appId = '91228a7dd7c44eccc595e64ef0736ad7'
        return this.httpClient.get<WeatherServerResponse>(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${appId}&units=imperial&lang=he`)
            .pipe(map(data => {
                return {
                    place: data.name,
                    icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                    details: {temp: `${data.weather[0].description} and ${data.main.temp}`, sunset: data.sys.sunset}
                }
            }));

    }
}
