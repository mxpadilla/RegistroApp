import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { TemperaturaService } from 'src/app/services/temperatura.service';
import { UbicacionService } from 'src/app/services/ubicacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  // Variable para mostrar nombre del usuario
  username: string = 'Invitado';

  // Variable para obtener la url anterior
  urlPrevia: string | undefined;

  // Variables para temperatura mínima y máxima
  minTemp!: number;
  maxTemp!: number;

  // Variable para latitud y longitud
  latitude: number = 0;
  longitude: number = 0;

  /*
    Variables para detectar rango de la ubicación donde:
      1. Se obtiene el estado de este
      2. Se obtiene la distancia actual
      3. Se obtiene la distancia restante calculada
  */
  isWithinRange: boolean | null = null;  
  distancia: number = 0;
  difDistancia: number = 0;
  
  // Variables objetivo (Latitud, Longitud y rango deseado en km)
  // Ejemplo: Sede Duoc San Joaquín (estimado)
  targetLat = -33.4999675;  
  targetLon = -70.6164588;
  rangeKm: number = 0.5;  // Rango de 500 metros

  constructor(
    private router: Router,
    private navegacion: NavegacionService,
    private clima: TemperaturaService,
    private ubicacion: UbicacionService,
    private alertController: AlertController,
    private loginService: LoginService
  ) { 
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if(state){
      this.username = state['user']; // Nombre del usuario ingresado
    }
  }

  ngOnInit() {

    this.urlPrevia = this.navegacion.rutaAnterior(); // Ruta anterior
    console.log('Ruta anterior: ', this.urlPrevia);

    this.getCurrentPosition(); // Ubicación actual del usuario

    this.loadWeatherData(-33.45, -70.65); // Coordenadas de Santiago, Chile = -33.45, -70.65
  }

  volver(){
    this.navegacion.volverAtras(); // Volver a la página anterior
  }

  //Cargar datos del clima
  loadWeatherData(lat: number, lon: number) {
    this.clima.getClima(lat, lon).subscribe(
      (data) => {
        this.minTemp = Math.trunc(data.daily.temperature_2m_min[0]);
        this.maxTemp = Math.trunc(data.daily.temperature_2m_max[0]);
      },
      (error) => {
        console.error('Error fetching weather data', error);
      }
    );
  }

  // Función para calcular la distancia entre dos puntos (Fórmula de Haversine)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  }

  toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  // Verificar si el usuario está dentro del rango
  async checkIfWithinRange() {
    try {
      await this.getCurrentPosition();
      this.distancia = this.calculateDistance(
        this.latitude,
        this.longitude,
        this.targetLat,
        this.targetLon
      )
      
      //Distancia entre la ubicación objetivo y actual del usuario
      this.difDistancia = this.distancia - this.rangeKm;

      // Actualizamos el estado de 'isWithinRange'
      this.isWithinRange = this.distancia <= this.rangeKm;
    } catch (error) {
      console.error('Error al verificar la ubicación:', error);
      this.isWithinRange = null;
    }

    // Si se cumple esta condición, se realiza la redirección de forma automática
    if (this.isWithinRange === true) {
      console.log(`Latitud: ${this.latitude} | Longitud: ${this.longitude}`)
      setTimeout(() => {
        this.router.navigate(['/codigo-qr']);
      }, 3000);  
    }
    else {
      // En caso contrario, se muestra la distancia objetivo, distancia restante y ubicación actual en la consola
      console.log(`Distancia de la sede: ${this.distancia.toFixed(2)} km`);
      console.log(`Distancia restante: ${this.difDistancia.toFixed(2)} km`);
      console.log(`Latitud: ${this.latitude} | Longitud: ${this.longitude}`)
    }
  }

  //Obtener ubicación actual del usuario
  async getCurrentPosition() {
    this.ubicacion
      .getPosition()
      .then(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
      
  }

  //Función para cerrar sesión del usuario
  confirmLogout(){
    this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Esta seguro de cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Aceptar',
          handler: () => {
            this.logout();
          }
        }
      ]
    })
    .then(a => a.present());
  }

  private logout(){
    this.loginService.logout()
    this.router.navigateByUrl('/login');
  }

  
}
