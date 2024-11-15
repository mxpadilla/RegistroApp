import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";

@Injectable({
    providedIn: 'root'
})
export class QRGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly loginService: LoginService
    ){ }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('Ejecutando qr-guard.');

      // Verificar si el usuario está autenticado
      const auth = await this.loginService.isAuthenticated();

      // Verificar si la navegación provino desde la aplicación
      const navigation = this.router.getCurrentNavigation();
      const fromApp = navigation?.extras.state?.["fromApp"];

      if (!auth) {
          console.log('Usuario no está ingresado, redireccionando a la página 404');
          await this.router.navigate(['/404']);
          return false;
      }

      if (!fromApp) {
          console.log('Acceso directo detectado, redireccionando a la página de inicio');
          await this.router.navigate(['/inicio']);
          return false;
      }

      // Si está autenticado y la navegación es por la app, permite el acceso
      return true;
  }
}

