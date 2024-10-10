import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service'; // Asegúrate de tener el servicio de autenticación
import { CartelComponent } from '../cartel/cartel.component';
import { ChatComponent } from '../chat/chat.component';
import { LoadingService } from '../../servicios/loading.service'; // Importa el servicio del spinner

import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CartelComponent, NgIf, ChatComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  userEmail: string | null = null;
  userPhotoURL: string | null = null;

  constructor(private router: Router, private authService: AuthService, private loadingService: LoadingService
  ) {}

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
              this.userPhotoURL = `/assets/profiles/${avatarNumber}.png`; // Construye la URL del avatar
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
    this.loadingService.show(); // Muestra el spinner
    this.router.navigate(['/registro']).then(() => {
      this.loadingService.hide(); // Oculta el spinner después de la navegación
    });
  }

  goToLogin() {
    this.loadingService.show();
    this.router.navigate(['/login']).then(() => {
      this.loadingService.hide();
    });
  }
  goToScores() {
    this.loadingService.show();
    this.router.navigate(['/scores']).then(() => {
      this.loadingService.hide();
    });
  }
  goToEncuesta() {
    this.loadingService.show();
    this.router.navigate(['/encuesta']).then(() => {
      this.loadingService.hide();
    });
  }
  goToQuien() {
    this.loadingService.show();
    this.router.navigate(['/quien-soy']).then(() => {
      this.loadingService.hide();
    });
  }

  goToJuego1() {
    this.loadingService.show();
    this.router.navigate(['/juegos/juego1']).then(() => {
      this.loadingService.hide();
    });
  }
  
  goToJuego2() {
    this.loadingService.show();
    this.router.navigate(['/juegos/juego2']).then(() => {
      this.loadingService.hide();
    });
  }
  
  goToJuego3() {
    this.loadingService.show();
    this.router.navigate(['/juegos/juego3']).then(() => {
      this.loadingService.hide();
    });
  }
  
  goToJuego4() {
    this.loadingService.show();
    this.router.navigate(['/juegos/juego4']).then(() => {
      this.loadingService.hide();
    });
  }

  logout() {
    this.loadingService.show();
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.userEmail = null;
      this.userPhotoURL = null;
      this.router.navigate(['/login']).then(() => {
        this.loadingService.hide();
      });
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
      this.loadingService.hide(); // Asegúrate de ocultar el spinner en caso de error
    });
  }
}
