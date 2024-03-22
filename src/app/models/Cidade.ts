export interface Cidade {
  name: string;
  weather: Clima[];
  main: DadosAvancados;
}

export interface Clima {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DadosAvancados {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
