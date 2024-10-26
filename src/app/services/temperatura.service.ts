import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  private API_URL = 'https://api.open-meteo.com/v1/forecast';

  constructor(
    private http: HttpClient
  ) { }

  getClima(lat: number, lon: number): Observable<any> {
    const url = `${this.API_URL}?latitude=${lat}&longitude=${lon}&daily=temperature_2m_min,temperature_2m_max&timezone=auto`;
    return this.http.get(url);
  }

}
