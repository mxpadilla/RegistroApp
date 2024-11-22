import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
    private loginService: LoginService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.limpiarDatos()
  }

  async validateLogin() {
    console.log("Executing login validation")

    const loading = await this.loadingController.create({
      message: 'Validando Inicio de Sesión.',
      spinner: 'crescent',
    });
  
    await loading.present();

    this.loginService
      .authenticate(this.username, this.password)
      .then(user => {
        this.authenticateHandler(user);
      })
      .catch(err => {
        console.log('Error en login: ', err)
        this.failedAuthentication();
      }).finally(() => {
        // Oculta el spinner independientemente del resultado
        loading.dismiss();
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

  // Función que permite mostrar un mensaje según los parametros dados
  async mensajeConfirmacion(message: string, color: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  // Función que permite limpiar datos de los campos
  limpiarDatos(){
    this.username= '';
    this.password= '';
  }

  // Función que hace que al entrar a la página se ejecute siempre la función, en este caso es de 'limpiarDatos'
  ionViewWillEnter() {
    this.limpiarDatos();
  }


}
