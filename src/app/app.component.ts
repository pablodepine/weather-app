import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeolocationService } from './shared/geolocation/geolocation.service';
import { HomeComponent } from '../app/modules/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GeolocationService],
})
export class AppComponent {}
