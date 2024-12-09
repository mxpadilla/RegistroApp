import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from "./services/almacenamiento.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { EscanerService } from "./services/escaner.service";
import { FormsModule } from '@angular/forms';

export function initQrScannerService(qrScannerService: EscanerService) {
  return () => qrScannerService.init();
}

export function qrScannerService() {
  return {
    provide: APP_INITIALIZER,
    useFactory: initQrScannerService,
    deps: [EscanerService],
    multi: true,
  };
}

export function initApp(storageService: StorageService) {
  return () => storageService.init();
}

export function routeReuseStrategy() {
  return { provide: RouteReuseStrategy, useClass: IonicRouteStrategy };
}

export function storageService() {
  return {
    provide: APP_INITIALIZER,
    useFactory: initApp,
    deps: [StorageService],
    multi: true,
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot(), FormsModule],
  providers: [routeReuseStrategy(), storageService(), provideHttpClient(withInterceptorsFromDi()), qrScannerService()],
  bootstrap: [AppComponent],
})
export class AppModule {}
