import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Pagina404PageRoutingModule } from './pagina404-routing.module';

import { Pagina404Page } from './pagina404.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Pagina404PageRoutingModule
  ],
  declarations: [Pagina404Page]
})
export class Pagina404PageModule {}
