import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'; // Asegúrate de tener el servicio de autenticación
import { CartelComponent } from '../cartel/cartel.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CartelComponent, NgIf], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userEmail: string | null = null;
  userPhotoURL: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsuarioActual().subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.userEmail = user.email;

        if (this.userEmail) {
          // Obtener datos del usuario desde Firestore
          this.authService.obtenerDatosUsuario(this.userEmail).subscribe(userData => {
            if (userData && userData.length > 0) {
              const avatarNumber = userData[0].avatar; // Suponiendo que la colección puede devolver más de un documento
              this.userPhotoURL = `/assets/profiles/m${avatarNumber}.png`; // Construye la URL del avatar
            } else {
              this.userPhotoURL = null; // O cualquier valor por defecto si no se encuentra el avatar
            }
          }, error => {
            console.error('Error al obtener datos del usuario:', error);
          });
        }
      } else {
        this.isLoggedIn = false;
      }
    }, error => {
      console.error('Error al obtener el estado de autenticación:', error);
    });
  }

  goToRegistro() {
    this.router.navigate(['/registro']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToQuien() {
    this.router.navigate(['/quien-soy']);
  }
  goToJuego1() {
    this.router.navigate(['/juegos/juego1']);
  }
  
  goToJuego2() {
    this.router.navigate(['/juegos/juego2']);
  }
  
  goToJuego3() {
    this.router.navigate(['/juegos/juego3']);
  }
  
  goToJuego4() {
    this.router.navigate(['/juegos/juego4']);
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.userEmail = null;
      this.userPhotoURL = null;
      this.router.navigate(['/login']); // Redirige al usuario a la página de login
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
