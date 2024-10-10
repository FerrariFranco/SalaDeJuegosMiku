import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  juegos: string[] = ['Trivia', 'Mayor o Menor', 'Ahorcado', 'Laberinto']; // Agrega los nombres de los juegos
  scores: { [key: string]: any[] } = {}; // Diccionario para almacenar los puntajes por juego

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit(): void {
    // Obtener todos los puntajes de todos los juegos
    this.juegos.forEach(juego => {
      this.firestore.collection('puntajes', ref => ref.where('juego', '==', juego))
        .valueChanges()
        .subscribe((data: any[]) => {
          this.scores[juego] = data; // Asigna todos los puntajes al juego correspondiente
        });
    });
  }

  // Función para volver al home
  goHome(): void {
    this.router.navigate(['/home']);
  }
}
