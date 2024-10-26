import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  constructor() { }

  getPosition() {
    return Geolocation.getCurrentPosition();
  }

}
