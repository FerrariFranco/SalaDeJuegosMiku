import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertComponent } from '../../componentes/alert/alert.component'; // Asegúrate de que la ruta sea correcta
import { interval, Subscription } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa Firestore

@Component({
  selector: 'app-juego3',
  templateUrl: './juego3.component.html',
  styleUrls: ['./juego3.component.scss']
})
export class Juego3Component implements OnInit {
  @ViewChild('alertComponent') alertComponent!: AlertComponent; // Referencia al componente de alerta
  movieTitles: string[] = [
    'El Señor de los Anillos', 
    'Rambo', 
    'Terminator', 
    'Perfect Blue', 
    'Bastardos sin gloria', 
    'Cars', 
    'Jurassic Park', 
    'Let It Be', 
    'Gladiator',
    'Toy Story',                
    'LaLa Land',               
    'El Exorcista',             
    'Piratas del Caribe',       
    'Coco',                     
   'Mad Max: Furia en la carretera',
    'Monstruos S.A.',           
    'Inensamente',             
    'Juanji',                  
    'Aterriza como puedas',     
    'Dulce hogar a veces',      
    'El viaje de Chihiro',      
    'Volver al futuro',         
    'Madagascar',               
    'Buscando a Nemo',          
    'Pesadilla antes de Navidad', 
    'Shrek',                       
    'La Forma del Agua',        
    'Los Increíbles',           
    'Harry Potter y la piedra filosofal', 
    'It',                       
    'Cazafantasmas',            
    'Día de la Independencia',  
    'El Gran Lebowski',         
    'Cazadores de sombras',     
    'Inside Out',               
    'Spder-Man: Un nuevo universo',
    'Siete psicópatas',         
    'Cloverfield',              
    'Up',                       
    'La novia cadáver',         
    'Los Goonies',              
    'Mujer Maravilla',          
    'Avatar',                   
    'Sangre fácil',             
    'El silencio de los corderos', 
    'Blade Runner',             
    'E.T. el Extraterrestre',   
    'The Ring',                 
    'Los Otros',               
    'Cazadores de fantasmas',    
    'Gran Torino',              
    'Nadie sabe',               
    'Un lugar en silencio',      
    'Madagascar 2',            
    'Kung Fu Panda',            
    'El gran showman',         
    'Cazadores de sombras: Ciudad de hueso',
    'Bailando en la oscuridad', 
    'Verónica',                 
    'Annabelle',                
    'Coco',                     
   'Los Vengadores',           
    'Zombieland',              
    'Días de radio',         
  ];
  selectedMovies: string[] = [];
  correctMovie: string = '';
  posterUrl: string = '';
  score: number = 0; 
  timeLeft: number = 30; // Tiempo inicial
  timerSubscription!: Subscription;
  userEmail: string | null = null; // Almacenar el email del usuario

  constructor(private http: HttpClient, private AuthService: AuthService, private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.selectRandomMovies();
    this.obtenerUsuarioActual(); // Obtener el usuario actual al iniciar

    this.startTimer();
  }
  obtenerUsuarioActual() {
    this.AuthService.getUsuarioActual().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
      }
    });
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
        puntaje: this.score,
        juego: 'Trivia', // Nombre del juego
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
  
  // Selección aleatoria de películas
  selectRandomMovies(): void {
    this.selectedMovies = this.shuffleArray([...this.movieTitles]).slice(0, 4);
    this.correctMovie = this.selectedMovies[Math.floor(Math.random() * this.selectedMovies.length)];
    this.loadMoviePoster(this.correctMovie);
  }

  // Cargar el póster de la película
  loadMoviePoster(movieTitle: string): void {
    const apiKey = 'd70593383c25b1a4f79d9d60c5997aa7';
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        if (response.results && response.results.length > 0) {
          this.posterUrl = `https://image.tmdb.org/t/p/w500${response.results[0].backdrop_path}`;
        } else {
          this.posterUrl = 'assets/default-movie-poster.jpg';
        }
      },
      (error) => {
        console.error('Error al cargar el póster:', error);
        this.alertComponent.openAlert('Error al cargar la información de la película.');
      }
    );
  }

  // Verificar si la respuesta es correcta y reiniciar el juego
  checkAnswer(selectedMovie: string): void {
    if (selectedMovie === this.correctMovie) {
      this.score++; // Aumentar la puntuación si es correcto
      this.alertComponent.openAlert('¡Correcto!');
    } else {
      this.alertComponent.openAlert('Incorrecto, intenta de nuevo.');
    }
    this.resetGame(); // Reiniciar el juego siempre, sin importar si es correcto o incorrecto
  }

  // Reiniciar el juego (seleccionar nuevas películas y reiniciar el temporizador)
  resetGame(): void {
    this.selectRandomMovies(); // Mostrar nuevas películas
  }

  // Barajar las películas aleatoriamente
  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  // Iniciar el temporizador
  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.alertComponent.openAlert('¡Se acabó el tiempo!');
        this.guardarPuntaje();
        this.resetGame(); // Reiniciar el juego si se acaba el tiempo
        this.score = 0;
        this.resetTimer();
      }
    });
  }

  // Reiniciar el temporizador
  resetTimer(): void {
    this.timeLeft = 30; // Reiniciar el tiempo a 30 segundos
  }

  // Cancelar el temporizador cuando se destruye el componente
  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
