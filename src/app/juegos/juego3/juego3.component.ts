import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertComponent } from '../../componentes/alert/alert.component'; // Asegúrate de que la ruta sea correcta

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


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.selectRandomMovies();
  }

  selectRandomMovies(): void {
    this.selectedMovies = this.shuffleArray([...this.movieTitles]).slice(0, 4);
    this.correctMovie = this.selectedMovies[Math.floor(Math.random() * this.selectedMovies.length)];
    this.loadMoviePoster(this.correctMovie);
  }

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
        this.alertComponent.openAlert('Error al cargar la información de la película.'); // Usar la referencia
      }
    );
  }

    checkAnswer(selectedMovie: string): void {
    if (selectedMovie === this.correctMovie) {
      this.score++; // Aumentar la puntuación
      this.alertComponent.openAlert(`¡Correcto!`); 
    } else {
      this.alertComponent.openAlert('Incorrecto, intenta de nuevo.');
      this.score = 0; 
    }
    this.resetGame();
  }

  resetGame(): void {
    this.selectRandomMovies();
  }

  shuffleArray(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
