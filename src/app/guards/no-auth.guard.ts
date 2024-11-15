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
  async canActivate() {

    console.log('Ejecutando no-guard.')
    const auth = await this.loginService.isAuthenticated();
    if (auth) {
        console.log('Usuario en sesión, redireccionando a Inicio')
        await this.router.navigate(['/inicio']);
    }
    return !auth;
  }
}
