export interface Cidade {
  name: string;
  weather: Clima[];
  main: DadosDetalhados;
}

export interface Clima {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DadosDetalhados {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}
