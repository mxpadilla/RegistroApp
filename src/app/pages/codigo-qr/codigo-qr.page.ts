import { Component, OnInit } from '@angular/core';
import { NavegacionService } from 'src/app/services/navegacion.service';
import { EscanerService } from 'src/app/services/escaner.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-codigo-qr',
  templateUrl: './codigo-qr.page.html',
  styleUrls: ['./codigo-qr.page.scss'],
})
export class CodigoQRPage implements OnInit {

  urlPrevia: string | undefined;
  scannedResult: string | null = null;
  asignaturas: any[] = []; // Lista de asignaturas del usuario
  selectedAsignatura: any; // Asignatura seleccionada

  constructor(
    private navegacion: NavegacionService,
    private readonly qrScannerService: EscanerService,
    private readonly loginService: LoginService
  ) {}

  async ngOnInit() {
    this.urlPrevia = this.navegacion.rutaAnterior();
    console.log('Ruta anterior: ', this.urlPrevia);

    // Obtener asignaturas del usuario autenticado
    const user = await this.loginService.getUser();
    if (user) {
      this.asignaturas = user.asignaturas;
    }
  }

  async scan(): Promise<void> {
    if (!this.selectedAsignatura) {
      this.scannedResult = 'Selecciona primero una asignatura.';
      return;
    }

    // Obtener fecha actual en formato YYYYMMDD
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}`;

    // Realizar el escaneo
    const barcodes = await this.qrScannerService.scan();
    if (barcodes.length > 0) {
      // Generar el resultado en el formato solicitado
      const asignatura = this.selectedAsignatura;
      this.scannedResult = `${asignatura.nombre} | ${asignatura.seccion} | ${asignatura.sala} | ${formattedDate}`;
    } else {
      this.scannedResult = 'No se detectó ningún código QR.';
    }
  }

  volver() {
    this.navegacion.volverAtras();
  }
}
