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
    async canActivate() {
        console.log('Ejecutando guard.')
        const auth = await this.loginService.isAuthenticated();
        if (!auth) {
            console.log('Usuario no esta ingresado, redireccionando a la página 404')
            await this.router.navigate(['/404']);
        }
        return auth;
    }
}
