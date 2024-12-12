import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
    const loading = await this.loadingController.create({
      message: 'Validando Inicio de Sesión.',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // Llamar al servicio de login para autenticar al usuario
      const loginSuccess = await this.loginService.login(this.username, this.password);
      
      if (loginSuccess) {
        await loading.dismiss();
        this.successAuthentication();
      } else {
        const userExists = await this.checkUserExists(this.username);
        await loading.dismiss();

        if (userExists) {
          this.failedAuthentication('Contraseña incorrecta');
        } else {
          this.failedAuthentication('Usuario no encontrado');
        }
      }
    } catch (error) {
      await loading.dismiss();
      this.failedAuthentication('Error al conectar con el servidor');
      console.error('Error en la autenticación:', error);
    }
  }

  // Verificar si el usuario existe (pero con contraseña incorrecta)
  private async checkUserExists(username: string): Promise<boolean> {
    try {
      const users: any[] = await this.loginService.getAllUsers(); // Crear método adicional en LoginService
      return users.some(user => user.username === username);
    } catch (error) {
      console.error('Error al verificar usuario:', error);
      return false;
    }
  }

  private async failedAuthentication(message: string = 'Sesión iniciada de forma fallida') {
    await this.mensajeConfirmacion(message, 'danger');
    console.log('Login fallido');
  }

  private async successAuthentication() {
    await this.mensajeConfirmacion('Sesión iniciada de forma exitosa', 'success');
    console.log('Success login');
    const extras: NavigationExtras = { state: { user: this.username } };
    this.router.navigate(['/inicio'], extras);
    console.log('Redireccionando al inicio');
  }

  // Función que permite mostrar un mensaje según los parámetros dados
  async mensajeConfirmacion(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
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
