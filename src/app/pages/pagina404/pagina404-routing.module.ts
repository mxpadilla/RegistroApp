import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Pagina404Page } from './pagina404.page';

const routes: Routes = [
  {
    path: '',
    component: Pagina404Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Pagina404PageRoutingModule {}
