import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnInit {

  urlPrevia: string | undefined;
  scanResult = '';

  constructor(
    private navegacion: NavegacionService,
    private platform: Platform,
    private modalController: ModalController
  ) {}

  async startScan() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: [],
      LensFacing: LensFacing.Back
     }
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if(data){
      this.scanResult = data?.barcode?.displayValue
    }
  
  }

  ngOnInit() {
    this.urlPrevia = this.navegacion.rutaAnterior(); // Obtener ruta anterior
    console.log('Ruta anterior: ', this.urlPrevia);

    if(this.platform.is('capacitor')){
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();  
    }

  }


  volver(){
    this.navegacion.volverAtras(); // Volver a la página anterior
  }

}
