import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../../componentes/alert/alert.component';
import { Router } from '@angular/router'; 
import { AuthService } from '../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore

@Component({
  selector: 'app-juego1',
  templateUrl: './juego1.component.html',
  styleUrls: ['./juego1.component.scss']
})
export class Juego1Component implements OnInit {
  constructor(private router: Router, private authService: AuthService, private firestore: AngularFirestore) { }

  row1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  row2: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  row3: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  displayedWord: string[] = [];
  usedLetters: string[] = [];
  chosenWord: string = '';
  failCount: number = 0;
  points: number = 0; // Agrega la variable de puntos
  userEmail: string | null = null; // Guarda el email del usuario logueado
  words: string[] = [
    'miku', 'hatsune', 'vocaloid', 'anime', 'sonido',
    'musica', 'cancion', 'ritmo', 'baile', 'escenario',
    'concierto', 'sintetizador', 'idol', 'electronico', 'armonia',
    'japones', 'cultura', 'cosplay', 'arte', 'animacion',
    'otaku', 'melodia', 'festival', 'virtual', 'espectaculo'
  ];

  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  ngOnInit() {
    this.chooseRandomWord();
    this.authService.getUsuarioActual().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
  }

  chooseRandomWord() {
    this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.displayedWord = Array(this.chosenWord.length).fill('_');
    this.usedLetters = [];
    // No reiniciar failCount y points al elegir una nueva palabra
  }

  onKeyPress(key: string) {
    if (this.usedLetters.includes(key)) {
      return;
    }

    this.usedLetters.push(key);

    if (this.chosenWord.toUpperCase().includes(key)) {
      for (let i = 0; i < this.chosenWord.length; i++) {
        if (this.chosenWord[i].toUpperCase() === key) {
          this.displayedWord[i] = this.chosenWord[i];
        }
      }

      this.points += 10; // Suma puntos por cada letra correcta

      // Verifica si la palabra se ha completado
      if (!this.displayedWord.includes('_')) {
        this.points += 1; // Agrega un punto adicional al completar la palabra
        setTimeout(() => {
          if (this.alertComponent) {
            this.alertComponent.openAlert('¡Palabra completada! Iniciando nueva...');
          }
        }, 0);
        this.chooseRandomWord(); // Inicia una nueva palabra
      }
    } else {
      this.failCount++;
      if (this.failCount > 6) {
        setTimeout(() => {
          if (this.alertComponent) {
            this.alertComponent.openAlert('¡Juego terminado! Has fallado demasiadas veces.');
          }
        }, 0);
        this.guardarPuntaje(); // Guarda los puntos en la base de datos al perder
        this.resetGame(); // Resetea el juego al perder
      }
    }
  }

  resetGame() {
    this.failCount = 0; // Resetea el contador de fallos
    this.points = 0; // Resetea los puntos
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
        puntaje: this.points,
        juego: 'Ahorcado', // Nombre del juego
        fecha: fechaActual // Fecha formateada en dd/MM/yy
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
  
  isLetterUsed(key: string): boolean {
    return this.usedLetters.includes(key);
  }

  getFailBackground(): string {
    if (this.failCount > 5) {
      return 'url("/assets/ahorcado/6.png")'; // Imagen final si se superan los 5 fallos
    }
    return `url("/assets/ahorcado/${this.failCount}.png")`; // Cambia según el número de fallos
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
