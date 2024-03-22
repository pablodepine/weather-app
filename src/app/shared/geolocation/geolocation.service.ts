import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private http: HttpClient) {}

  getPosition(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  getCurrentWeatherData(latitude: number, longitude: number) {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6d38f225329d565bc3f015730ea0c580&lang=pt_br&units=metric`
    );
  }

  getCoordinatesByLocationName(local: string) {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${local}&appid=6d38f225329d565bc3f015730ea0c580`
    );
  }
}
