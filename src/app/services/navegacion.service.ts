import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {
  
  private urlPrevia: string | undefined;
  private urlActual: string | undefined;

  constructor(private router: Router, private location: Location) 
  {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) 
      {
        this.urlPrevia = this.urlActual;
        this.urlActual = event.url;
      }
    });
  }

  // Obtener la ruta anterior
  rutaAnterior(): string | undefined {
    return this.urlPrevia;
  }

  // Navegar hacia atrás en el historial
  volverAtras(): void {
    this.location.back();
  }

}
