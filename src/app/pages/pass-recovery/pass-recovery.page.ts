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

  constructor(
    private router: Router,
    private alertController: AlertController,
    private navegacion: NavegacionService,
    private loadingController: LoadingController
  ) { }

  async mostrarConfirmacion() {
    const alert = await this.alertController.create({
      header: 'Alerta de confirmación',
      message: '¿Estás seguro de restablecer la contraseña?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Operación cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            console.log('Operación confirmada');
            await this.procesarRestablecimiento();
          }
        }
      ]
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
      // Aquí puedes agregar la lógica para el cambio de contraseña
      console.log('Procesando cambio de contraseña.');
  
      // Simulación de un retraso para representar el procesamiento
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      console.log('Redireccionando al Login');
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error durante el restablecimiento:', error);
    } finally {
      await loading.dismiss();
    }
  }

  ngOnInit() {
    this.urlPrevia = this.navegacion.rutaAnterior(); // Obtener ruta anterior
    console.log('Ruta anterior: ', this.urlPrevia);
  }

  volver(){
    this.navegacion.volverAtras(); // Volver a la página anterior
  }

}
