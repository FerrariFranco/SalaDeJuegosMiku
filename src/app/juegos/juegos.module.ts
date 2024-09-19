// src/app/juegos/juegos.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module'; 
import { Juego1Component } from './juego1/juego1.component';
import { Juego2Component } from './juego2/juego2.component';
import { Juego3Component } from './juego3/juego3.component';
import { Juego4Component } from './juego4/juego4.component';

@NgModule({
  declarations: [
    Juego1Component,
    Juego2Component,
    Juego3Component,
    Juego4Component
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
