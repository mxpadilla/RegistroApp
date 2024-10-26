import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  ingresoApp(){
    //console.log("Prueba de ejecución")

    if(this.loginService.validarLogin(this.username, this.password))
    {
      this.mensajeConfirmacion('Login acceptado','success');
      let extras: NavigationExtras = {state: {user: this.username}}
      this.router.navigate(['/inicio'], extras);
    }
    else{
      this.mensajeConfirmacion('Login denegado','danger');
    }
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
