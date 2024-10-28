import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username!: string;
  password!: string;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  validateLogin() {
    console.log("Executing login validation")

    this.loginService
      .authenticate(this.username, this.password)
      .then(user => {
        this.authenticateHandler(user);
      })
      .catch(err => {
        console.log('Error en login: ', err)
        this.failedAuthentication();
      });
  }

  private authenticateHandler(user: User | null) {
    user ? this.successAuthentication() : this.failedAuthentication()
  }

  private failedAuthentication(message: string = 'Sesión iniciada de forma fallida') {
    this.mensajeConfirmacion(message, 'danger')
      .then(() => { console.log('Login fallido') });
  }

  private successAuthentication() {
    this.mensajeConfirmacion('Sesión iniciada de forma exitosa', 'success')
      .then(() => {
        console.log('Success login');
        let extras: NavigationExtras = {state: {user: this.username}}
        this.router.navigate(['/inicio'], extras);
      })
      .then(() => console.log('Redireccionando al inicio'));
  }

  //función que permite mostrar un mensaje según los parametros dados
  async mensajeConfirmacion(message: string, color: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }


}
