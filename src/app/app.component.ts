import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeolocationService } from './shared/geolocation/geolocation.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { Cidade } from './models/Cidade';
import { WeatherMenuComponent } from './shared/components/weather-menu/weather-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    WeatherMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GeolocationService],
})
export class AppComponent implements OnInit {
  constructor(private geolocationService: GeolocationService) {}

  cidadeForm!: FormGroup;
  dadosCidade!: Cidade;
  weatherMenuIsOpen = false;

  geolocation = { latitude: 0, longitude: 0 };
  icon: string = '';

  ngOnInit(): void {
    this.cidadeForm = new FormGroup({
      cidade: new FormControl('', Validators.required),
    });
  }

  pesquisaGeolocalizacaoCidade() {
    console.log(this.cidadeForm.value.cidade);
    this.geolocationService
      .getCoordinatesByLocationName(this.cidadeForm.value.cidade)
      .pipe(
        switchMap((res: any) => {
          console.log(res);
          return this.geolocationService.getCurrentWeatherData(
            res[0].lat,
            res[0].lon
          );
        }),
        map((res: any) => ({
          name: res.name,
          weather: res.weather, // Supondo que você esteja interessado apenas no primeiro elemento do array 'weather'
          main: res.main,
        }))
      )
      .subscribe({
        next: (res: any) => {
          this.dadosCidade = res;
          this.weatherMenuIsOpen = true;
        },
        error: (err) => {
          // Trate o erro aqui, se necessário
          console.error(err);
        },
      });
  }
}
