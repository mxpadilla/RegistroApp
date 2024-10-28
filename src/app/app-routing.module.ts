import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthenticationGuard } from './guards/no-auth.guard';
import { AuthenticationGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'pass-recovery',
    canActivate: [NoAuthenticationGuard],
    loadChildren: () => import('./pages/pass-recovery/pass-recovery.module').then( m => m.PassRecoveryPageModule)
  },
  {
    path: 'inicio',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'codigo-qr',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/codigo-qr/codigo-qr.module').then( m => m.CodigoQRPageModule) 
  },
  {
    path: 'login',
    canActivate: [NoAuthenticationGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '404',
    loadChildren: () => import('./pages/pagina404/pagina404.module').then( m => m.Pagina404PageModule)
  },
  {
    path: '**', redirectTo: '404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
