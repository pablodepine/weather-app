import { Component, Input, OnInit } from '@angular/core';
import { Cidade } from '../../../models/Cidade';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-weather-menu',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './weather-menu.component.html',
  styleUrl: './weather-menu.component.scss',
})
export class WeatherMenuComponent implements OnInit {
  @Input() dadosCidade!: Cidade;

  ngOnInit(): void {
    this.setaIconeClima();
    this.ajustaCasaDecimal();
  }

  setaIconeClima() {
    let locationIcon: any = document.querySelector('.weather-icon');
    const icon = this.dadosCidade.weather[0].icon + '.png';
    locationIcon.innerHTML = `<img src="../assets/icons/${icon}">`;
  }

  ajustaCasaDecimal() {
    this.dadosCidade.main.temp = +this.dadosCidade.main.temp.toFixed(1);
    this.dadosCidade.main.feels_like =
      +this.dadosCidade.main.feels_like.toFixed(1);
    this.dadosCidade.main.temp_min = +this.dadosCidade.main.temp_min.toFixed(1);
    this.dadosCidade.main.temp_max = +this.dadosCidade.main.temp_max.toFixed(1);
  }
}
