import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module'; 
import { Juego1Component } from './juego1/juego1.component';
import { Juego2Component } from './juego2/juego2.component';
import { Juego3Component } from './juego3/juego3.component';
import { Juego4Component } from './juego4/juego4.component';
import { AlertComponent } from '../componentes/alert/alert.component'; // Asegúrate de importarlo
import { AuthService } from '../servicios/auth.service'; // Ajusta la ruta según la ubicación de tu AuthService
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    Juego1Component,
    Juego2Component,
    Juego3Component,
    Juego4Component,
    AlertComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    HttpClientModule // Agrega el módulo de HttpClientModule
  ],
  providers: [AuthService] 
})
export class JuegosModule { }
