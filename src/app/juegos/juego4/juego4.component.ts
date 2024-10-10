import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AlertComponent } from '../../componentes/alert/alert.component';
import { AuthService } from '../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-juego4',
  templateUrl: './juego4.component.html',
  styleUrls: ['./juego4.component.scss']
})
export class Juego4Component {
  isDragging: boolean = false; 
  @ViewChild('circle', { static: true }) circle!: ElementRef;
  @ViewChild('mazeContainer', { static: true }) mazeContainer!: ElementRef;
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  timeElapsed: number = 0; 
  timerInterval: any;
  userEmail: string | null = null; 

  finalScore: number = 10000; // Inicializar puntaje a 10,000
  private screamSound: HTMLAudioElement;
  showScreamer: boolean = false;

  constructor(private AuthService: AuthService, private firestore: AngularFirestore) {
    this.screamSound = new Audio('assets/scream.mp3');
  }

  ngOnInit() {
    this.AuthService.getUsuarioActual().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
    this.startTimer();
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
        puntaje: this.finalScore,
        juego: 'Laberinto', 
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

  startTimer() {
    this.timeElapsed = 0; // Asegúrate de que el tiempo empiece en 0
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  resetGame() {
    this.stopTimer(); // Detiene el temporizador
    this.finalScore = 10000; // Restablecer el puntaje a 10,000
    this.startTimer(); // Reinicia el temporizador
    this.resetCircle(); // Resetea la posición del círculo
  }

  startDragging(event: MouseEvent) {
    this.isDragging = true;
  }

  stopDragging() {
    this.isDragging = false;
  }

  calculateScore() {
    this.finalScore = Math.floor(10000 / this.timeElapsed); 
    this.guardarPuntaje();
    this.alertComponent.openAlert(`¡Has ganado! Tu puntaje es: ${this.finalScore}`);
    this.resetGame(); // Llama a resetGame para reiniciar el juego
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const mazeBounds = this.mazeContainer.nativeElement.getBoundingClientRect();
      const circleElement = this.circle.nativeElement;

      const newX = event.clientX - mazeBounds.left - circleElement.offsetWidth / 2;
      const newY = event.clientY - mazeBounds.top - circleElement.offsetHeight / 2;

      if (newX >= 0 && newX <= mazeBounds.width - circleElement.offsetWidth &&
          newY >= 0 && newY <= mazeBounds.height - circleElement.offsetHeight) {
        circleElement.style.left = `${newX}px`;
        circleElement.style.top = `${newY}px`;

        const circleBounds = circleElement.getBoundingClientRect();

        const walls = this.mazeContainer.nativeElement.querySelectorAll('.wall');
        walls.forEach((wall: HTMLElement) => {
          const wallBounds = wall.getBoundingClientRect();

          if (this.checkCollision(circleBounds, wallBounds)) {
            this.alertComponent.openAlert('¡Perdiste! Toca una pared. Intenta de nuevo.'); 
            this.resetCircle();
          }
        });

        const endZone = this.mazeContainer.nativeElement.querySelector('.end');
        const endBounds = endZone.getBoundingClientRect();
        if (this.checkCollision(circleBounds, endBounds)) {
          this.stopTimer(); 
          this.calculateScore();
          this.showScreamer = true; 
          //this.screamSound.play();
          this.resetCircle();
        }
      }
    }
  }

  checkCollision(rect1: DOMRect, rect2: DOMRect): boolean {
    return !(rect1.right < rect2.left || rect1.left > rect2.right ||
            rect1.bottom < rect2.top || rect1.top > rect2.bottom);
  }

  resetCircle() {
    const circleElement = this.circle.nativeElement;
    circleElement.style.left = '10px';
    circleElement.style.top = '10px';
    this.isDragging = false;
  }
}
