import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthenticationGuard implements CanActivate {
  constructor(
      private readonly router: Router,
      private readonly loginService: LoginService
  ){ }
  async canActivate(): Promise<boolean> {
    console.log('Ejecutando no-guard.');
    
    const user = await this.loginService.getUser(); // Obtener el usuario desde el almacenamiento
    const isAuthenticated = !!user; // Determinar si hay un usuario autenticado

    if (isAuthenticated) {
      console.log('Usuario ya en sesión, redireccionando a Inicio');
      await this.router.navigate(['/inicio']);
    }

    return !isAuthenticated; // Permite la activación si no hay usuario autenticado
  }
}
