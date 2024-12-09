import { Component, OnInit } from '@angular/core';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { EscanerService } from 'src/app/services/escaner.service';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnInit {

  urlPrevia: string | undefined;
  scannedResult: string | null = null;

  constructor(
    private navegacion: NavegacionService,
    private readonly qrScannerService: EscanerService
  ) {}

  async scan(): Promise<void> {
    const barcodes = await this.qrScannerService.scan();
    this.scannedResult = barcodes.length > 0 ? barcodes.join(', ') : 'No se detectó ningún código QR.';
  }

  ngOnInit() {
    this.urlPrevia = this.navegacion.rutaAnterior(); // Obtener ruta anterior
    console.log('Ruta anterior: ', this.urlPrevia);
  }

  volver(){
    this.navegacion.volverAtras(); // Volver a la página anterior
  }

}
