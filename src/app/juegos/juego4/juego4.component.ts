import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { AlertComponent } from '../../componentes/alert/alert.component'; // Asegúrate de importar el componente de alerta

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

  finalScore: number = 0; // Puntaje final
  private screamSound: HTMLAudioElement;
  showScreamer: boolean = false;
  constructor() {
    this.screamSound = new Audio('assets/scream.mp3');
    
  }
  ngOnInit() {
    this.startTimer();
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeElapsed++;
    }, 1000); 
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }
  
  startDragging(event: MouseEvent) {
    this.isDragging = true;
  }

  stopDragging() {
    this.isDragging = false;
  }

  calculateScore() {
    this.finalScore = Math.floor(10000 / this.timeElapsed); 
    this.alertComponent.openAlert(`¡Has ganado! Tu puntaje es: ${this.finalScore}`);
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
