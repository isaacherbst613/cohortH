import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherRes } from 'src/types/weather';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.css']
})
export class WeatherDisplayComponent {

  constructor() {
      console.log(this.weatherDeets);
      
   }
  @Input() weatherDeets?: WeatherRes | null;

  toTime = () => {
    const time = new Date(this.weatherDeets!.details.sunset *1000);
    return time.toLocaleTimeString();
  }
  
}
