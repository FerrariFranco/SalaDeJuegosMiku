import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../servicios/auth.service';
import { AlertComponent } from '../../componentes/alert/alert.component'; // Asegúrate de importar el AlertComponent

@Component({
  selector: 'app-juego2',
  templateUrl: './juego2.component.html',
  styleUrls: ['./juego2.component.scss']
})
export class Juego2Component implements OnInit {
  palos: string[] = ['hearts', 'diamonds', 'clubs', 'spades'];
  cartasPorPalo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  cartaActual: string = '';
  cartaSiguiente: string | null = null;
  puntos: number = 0;
  vidas: number = 3; // Contador de vidas
  userEmail: string | null = null;

  @ViewChild(AlertComponent) alertComponent!: AlertComponent; // Usamos ViewChild para acceder al AlertComponent

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.inicializarJuego();
    this.obtenerUsuarioActual(); 
  }

  inicializarJuego() {
    this.cartaActual = this.getRandomCard();
  }

  getRandomCard(): string {
    const paloAleatorio = this.palos[Math.floor(Math.random() * this.palos.length)];
    const cartaAleatoria = this.cartasPorPalo[Math.floor(Math.random() * this.cartasPorPalo.length)];
    return `mayormenor/${paloAleatorio}/${cartaAleatoria}.png`; // Retornar el path de la carta
  }

  verificarEleccion(eleccion: 'mayor' | 'menor') {
    this.cartaSiguiente = this.getRandomCard();
  
    if (this.cartaSiguiente) {
      const valorActual = parseInt(this.cartaActual.split('/')[2].split('.')[0]);
      const valorSiguiente = parseInt(this.cartaSiguiente.split('/')[2].split('.')[0]);
  
      console.log('Carta Actual:', this.cartaActual, 'Valor Actual:', valorActual);
      console.log('Carta Siguiente:', this.cartaSiguiente, 'Valor Siguiente:', valorSiguiente);
  
      if (valorActual === valorSiguiente) {
        this.alertComponent.openAlert('¡Empate! No se pierden vidas ni se ganan puntos.');
      } else {
        const esCorrecto =
          (eleccion === 'mayor' && valorSiguiente > valorActual) ||
          (eleccion === 'menor' && valorSiguiente < valorActual);
  
        if (esCorrecto) {
          this.puntos++;
          this.alertComponent.openAlert('¡Correcto!');
        } else {
          this.vidas--;
          this.alertComponent.openAlert('Incorrecto. Vidas restantes: ' + this.vidas);
  
          if (this.vidas === 0) {
            // Mensaje de finalización del juego
            this.alertComponent.openAlert(`¡Juego Terminado! Estos fueron tus puntos: ${this.puntos}`);
            this.guardarPuntaje(); // Guardar el puntaje en Firestore al perder todas las vidas
            this.reponerVidas(); // Reponer vidas
          }
        }
      }
  
      this.cartaActual = this.cartaSiguiente;
      this.cartaSiguiente = null;
    }
  }
  

  reponerVidas() {
    this.vidas = 3; // Reponiendo las vidas
    this.puntos = 0; // Opcional: reiniciar el puntaje si deseas
  }

  guardarPuntaje() {
    if (this.userEmail) {
      const fechaActual = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

      const datosJuego = {
        usuario: this.userEmail,
        puntaje: this.puntos,
        juego: 'Mayor o Menor',
        fecha: fechaActual
      };

      this.firestore.collection('puntajes').add(datosJuego)
        .then(() => {
          console.log('Puntaje guardado exitosamente');
        })
        .catch((error) => {
          console.error('Error al guardar puntaje: ', error);
        });
    }
  }

  obtenerUsuarioActual() {
    this.authService.getUsuarioActual().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  irAlHome() {
    this.router.navigate(['/home']);
  }
}
