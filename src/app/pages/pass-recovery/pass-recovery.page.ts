import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private navegacion: NavegacionService
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
          handler: () => {
            console.log('Operación confirmada');
            //codigo para realizar el cambio de contraseña en un futuro
            console.log('Redireccionando al Login');
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.urlPrevia = this.navegacion.rutaAnterior(); // Obtener ruta anterior
    console.log('Ruta anterior: ', this.urlPrevia);
  }

  volver(){
    this.navegacion.volverAtras(); // Volver a la página anterior
  }

}
