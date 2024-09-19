import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'juegos',
    loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
