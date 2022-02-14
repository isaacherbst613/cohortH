import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Weather, { WeatherRes } from 'src/types/weather';
import { WeatherService } from './weather.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = '98-weather';
    zip!: string;
    theWeather?:Observable<WeatherRes>;

    weatherMap:Weather[] = [
        {
            zip: '33412',
            deets: {
                coord: {
                    lon: -80.232,
                    lat: 25.813
                },
                weather: [
                    {
                        id: 803,
                        main: "Clouds",
                        description: "שברי ענן",
                        icon: "04d"
                    }
                ],
                base: "stations",
                main: {
                    temp: 74.61,
                    feels_like: 75.06,
                    temp_min: 72.99,
                    temp_max: 76.01,
                    pressure: 1022,
                    humidity: 70
                },
                visibility: 10000,
                wind: {
                    speed: 1.01,
                    deg: 57,
                    gust: 7
                },
                clouds: {
                    all: 71
                },
                dt: 1643896616,
                sys: {
                    type: 2,
                    id: 2035275,
                    country: "US",
                    sunrise: 1643889824,
                    sunset: 1643929544
                },
                timezone: -18000,
                id: 0,
                name: "Miami",
                cod: 200
            }
        },
        {
            zip: '08701',
            deets: {
                coord: {
                    lon: -74.2042,
                    lat: 40.085
                },
                weather: [
                    {
                        id: 701,
                        main: "Mist",
                        description: "ערפל דק",
                        icon: "50d"
                    },
                    {
                        id: 500,
                        main: "Rain",
                        description: "גשם קל",
                        icon: "10d"
                    }
                ],
                base: "stations",
                main: {
                    temp: 39.63,
                    feels_like: 39.63,
                    temp_min: 36.25,
                    temp_max: 42.03,
                    pressure: 1026,
                    humidity: 90
                },
                visibility: 2816,
                wind: {
                    speed: 1.01,
                    deg: 177,
                    gust: 3
                },
                rain: {
                    "1h": 0.85
                },
                clouds: {
                    all: 100
                },
                dt: 1643896402,
                sys: {
                    type: 2,
                    id: 2040686,
                    country: "US",
                    sunrise: 1643889816,
                    sunset: 1643926658
                },
                timezone: -18000,
                id: 0,
                name: "Lakewood",
                cod: 200
            }
        }
    ];

    constructor(private weatherService: WeatherService) {  }

    zipChanged(){
        if(this.zip.length !== 5){
            return
        }

        this.theWeather = this.weatherService.getWeather(this.zip);
    }
    
}
