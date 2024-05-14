import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { WeatherMenuComponent } from '../../shared/components/weather-menu/weather-menu.component';
import { GeolocationService } from '../../shared/geolocation/geolocation.service';
import { Cidade } from '../../models/Cidade';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    WeatherMenuComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [GeolocationService],
})
export class HomeComponent implements OnInit {
  constructor(private geolocationService: GeolocationService) {}

  cidadeForm!: FormGroup;
  dadosCidade!: Cidade;
  weatherMenuIsOpen = false;

  geolocation = { latitude: 0, longitude: 0 };
  icon: string = '';

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.pesquisaGeolocalizacaoCidade();
  }

  ngOnInit(): void {
    this.cidadeForm = new FormGroup({
      cidade: new FormControl('', Validators.required),
    });
  }

  pesquisaGeolocalizacaoCidade() {
    if (this.cidadeForm.valid) {
      this.geolocationService
        .getCoordinatesByLocationName(this.cidadeForm.value.cidade)
        .pipe(
          map((res: any) => ({
            lat: res[0].lat,
            lon: res[0].lon,
            name: res[0].name,
          })),
          switchMap((res: any) => {
            return this.geolocationService.getCurrentWeatherData(
              res?.lat,
              res?.lon
            );
          })
        )
        .subscribe({
          next: (res: any) => {
            this.dadosCidade = res;
            this.weatherMenuIsOpen = true;
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
