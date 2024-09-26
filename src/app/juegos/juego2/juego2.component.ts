import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar el Router para la navegación

@Component({
  selector: 'app-juego2',
  templateUrl: './juego2.component.html',
  styleUrls: ['./juego2.component.scss']
})
export class Juego2Component implements OnInit {
  cartas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Mazo de cartas del 1 al 12
  cartaActual: number = 0; // Carta inicial boca arriba
  cartaSiguiente: number | null = null; // La próxima carta a revelar
  puntos: number = 0; // Puntuación del jugador
  mensaje: string = ''; // Mensaje de resultado
  
  constructor(private router: Router) {} // Inyectar el Router

  ngOnInit(): void {
    this.inicializarJuego();
  }

  inicializarJuego() {
    // Seleccionar la primera carta boca arriba de forma aleatoria
    this.cartaActual = this.getRandomCard();
  }

  getRandomCard(): number {
    let nuevaCarta = this.cartas[Math.floor(Math.random() * this.cartas.length)];
    // Asegurarse de que no sea igual a la carta actual
    while (nuevaCarta === this.cartaActual) {
      nuevaCarta = this.cartas[Math.floor(Math.random() * this.cartas.length)];
    }
    return nuevaCarta;
  }

  verificarEleccion(eleccion: 'mayor' | 'menor') {
    // Obtener una nueva carta aleatoria
    this.cartaSiguiente = this.getRandomCard();

    if (this.cartaSiguiente) {
      const esCorrecto =
        (eleccion === 'mayor' && this.cartaSiguiente > this.cartaActual) ||
        (eleccion === 'menor' && this.cartaSiguiente < this.cartaActual);

      if (esCorrecto) {
        this.puntos++;
        this.mensaje = '¡Correcto!';
      } else {
        this.mensaje = 'Incorrecto.';
      }

      // La carta revelada se convierte en la carta boca arriba
      this.cartaActual = this.cartaSiguiente;
      this.cartaSiguiente = null;
    }
  }
  irAlHome() {
    this.router.navigate(['/home']); // Redirigir al home
  }
}
