// src/app/juegos/juegos-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Juego1Component } from './juego1/juego1.component';
import { Juego2Component } from './juego2/juego2.component';
import { Juego3Component } from './juego3/juego3.component';
import { Juego4Component } from './juego4/juego4.component';

const routes: Routes = [
  { path: '', redirectTo: 'juego1', pathMatch: 'full' },
  { path: 'juego1', component: Juego1Component },
  { path: 'juego2', component: Juego2Component },
  { path: 'juego3', component: Juego3Component },
  { path: 'juego4', component: Juego4Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
