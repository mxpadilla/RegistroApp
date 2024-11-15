import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnInit {

  urlPrevia: string | undefined;
  scanResult: string | null = null;
  html5QrCode: Html5Qrcode | null = null;
  result: string = '';

  constructor(
    private navegacion: NavegacionService,
    private platform: Platform,
    private modalController: ModalController
  ) {}

  //Función que solo se realiza en Android
  async startScan() {
    if (this.platform.is('capacitor')) {
      // Escaneo en dispositivos móviles (Android/iOS)
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

      if (data) {
        this.scanResult = data?.barcode?.displayValue;
      }
    } else {
      // Escaneo en web con webcam en caso de estar en un navegador web
      this.scanWithWebcam();
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

  // Función que permite el escaneo por navegador web
  scanWithWebcam() {
    const qrCodeRegion = document.getElementById('qr-code-region');
    const scanButtons = document.getElementById('scan-buttons');
    const placeholderImage = document.getElementById('placeholder-image');
  
    // Mostrar contenedor y botones
    if (placeholderImage) {
      placeholderImage.style.display = 'none'; // Ocultar el placeholder al iniciar el escaneo
    }
    qrCodeRegion!.style.display = 'block';
    scanButtons!.style.display = 'block';
  
    this.html5QrCode = new Html5Qrcode('qr-code-region');
  
    this.html5QrCode.start(
      { facingMode: 'environment' }, // Usar la cámara trasera si está disponible
      {
        fps: 10,
        qrbox: 250 // Tamaño del área de escaneo
      },
      (decodedText, decodedResult) => {
        console.log(`QR Code detected: ${decodedText}`);
        this.scanResult = decodedText;
        this.stopScan(); // Detener el escaneo después de detectar el código
      },
      (errorMessage) => {
        console.warn(`No QR code found: ${errorMessage}`);
      }
    ).catch((err) => {
      console.error(`Error starting Html5Qrcode: ${err}`);
    });
  }
  
  stopScan() {
    const qrCodeRegion = document.getElementById('qr-code-region');
    const scanButtons = document.getElementById('scan-buttons');
    const placeholderImage = document.getElementById('placeholder-image');
  
    // Detener el escáner y ocultar los elementos
    this.html5QrCode?.stop().then(() => {
      qrCodeRegion!.style.display = 'none';
      this.html5QrCode?.clear();
      qrCodeRegion!.style.display = 'block';
      scanButtons!.style.display = 'none';
      
      if (placeholderImage) {
        placeholderImage.style.display = 'block';
      }
    }).catch((err) => {
      console.error(`Error stopping Html5Qrcode: ${err}`);
      
      // Mostrar el placeholder en caso de error si existe
      if (placeholderImage) {
        placeholderImage.style.display = 'block';
      }
    });
  }

  volver(){
    this.navegacion.volverAtras(); // Volver a la página anterior
  }

}
