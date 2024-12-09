import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly router: Router,
        private readonly loginService: LoginService
    ){ }
    async canActivate(): Promise<boolean> {
        console.log('Ejecutando guard.');
    
        const user = await this.loginService.getUser(); // Obtener el usuario desde el almacenamiento
        const isAuthenticated = !!user; // Determinar si hay un usuario autenticado
    
        if (!isAuthenticated) {
          console.log('Usuario no está autenticado, redireccionando a la página 404');
          await this.router.navigate(['/404']);
        }
    
        return isAuthenticated; // Permite la activación si hay usuario autenticado
      }
}
