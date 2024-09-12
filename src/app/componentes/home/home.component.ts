import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartelComponent } from '../cartel/cartel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CartelComponent],  // Importar el CartelComponent aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToQuien() {
    this.router.navigate(['/quien-soy']);
  }
}
