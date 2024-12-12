import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NavegacionService } from 'src/app/services/navegacion.service';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.page.html',
  styleUrls: ['./pass-recovery.page.scss'],
})
export class PassRecoveryPage implements OnInit {

  userRecovery!: string;
  passRecovery!: string;
  urlPrevia: string | undefined;
  private apiUrl = 'http://localhost:3000/users'; //cambiar localhost a la IP correspondiente

  constructor(
    private router: Router,
    private alertController: AlertController,
    private navegacion: NavegacionService,
    private loadingController: LoadingController,
    private http: HttpClient
  ) {}

  async mostrarConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Deseas realizar el cambio de contraseña?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cambio de contraseña cancelado.');
          },
        },
        {
          text: 'Aceptar',
          handler: async () => {
            console.log('Cambio de contraseña confirmado.');
            await this.procesarRestablecimiento();
          },
        },
      ],
    });

    await alert.present();
  }

  private async procesarRestablecimiento() {
    // Muestra el spinner
    const loading = await this.loadingController.create({
      message: 'Procesando restablecimiento.',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      // Obtiene los datos del usuario de la API
      const users: any = await this.http.get(this.apiUrl).toPromise();

      // Encuentra el usuario en el JSON
      const user = users.find((u: any) => u.username === this.userRecovery);

      if (user) {
        // Actualiza la contraseña del usuario
        user.password = this.passRecovery;

        // Envía la actualización a la API
        await this.http.put(`${this.apiUrl}/${user.id}`, user).toPromise();

        console.log('Contraseña actualizada con éxito.');
        await this.mostrarAlerta('Éxito', 'La contraseña ha sido restablecida con éxito.');

        // Redirige al login
        await this.router.navigate(['/login']);
      } else {
        await this.mostrarAlerta('Error', 'Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      await this.mostrarAlerta('Error', 'Hubo un problema al restablecer la contraseña.');
    } finally {
      await loading.dismiss();
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  volver() {
    this.navegacion.volverAtras();
  }

  ngOnInit() {
    this.urlPrevia = this.navegacion.rutaAnterior();
    console.log('Ruta anterior:', this.urlPrevia);
  }

}
