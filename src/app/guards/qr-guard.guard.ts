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
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.log('Ejecutando qr-guard.');
    
        // Verificar si el usuario está autenticado
        const user = await this.loginService.getUser();
        const isAuthenticated = !!user;
    
        // Verificar si la navegación provino desde la aplicación
        const navigation = this.router.getCurrentNavigation();
        const fromApp = navigation?.extras.state?.['fromApp'] === true; // Esperamos una bandera "fromApp" en el estado de navegación
    
        if (!isAuthenticated) {
          console.log('Usuario no está autenticado, redireccionando a la página 404.');
          await this.router.navigate(['/404']);
          return false;
        }
    
        if (!fromApp) {
          console.log('Acceso directo detectado, redireccionando a la página de inicio.');
          await this.router.navigate(['/inicio']);
          return false;
        }
    
        // Si está autenticado y la navegación es válida, permite el acceso
        console.log('Usuario autenticado y navegación válida. Acceso permitido.');
        return true;
      }
}

