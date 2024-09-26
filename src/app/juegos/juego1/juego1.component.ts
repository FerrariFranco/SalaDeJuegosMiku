import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../../componentes/alert/alert.component';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-juego1',
  templateUrl: './juego1.component.html',
  styleUrls: ['./juego1.component.scss']
})
export class Juego1Component implements OnInit {
  constructor(private router: Router) { } 
  row1: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  row2: string[] = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  row3: string[] = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  displayedWord: string[] = [];
  usedLetters: string[] = [];
  chosenWord: string = '';
  failCount: number = 0;
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
  }

  chooseRandomWord() {
    this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.displayedWord = Array(this.chosenWord.length).fill('_');
    this.usedLetters = [];
    this.failCount = 0;
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

      if (!this.displayedWord.includes('_')) {
        setTimeout(() => {
          if (this.alertComponent) {
            this.alertComponent.openAlert('¡Palabra completada! Iniciando nueva...');
          }
        }, 0);
        this.chooseRandomWord();
      }
    } else {
      this.failCount++;
      if (this.failCount > 6) {
        setTimeout(() => {
          if (this.alertComponent) {
            this.alertComponent.openAlert('¡Juego terminado! Has fallado demasiadas veces.');
          }
        }, 0);
        this.chooseRandomWord();
      }
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
