import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Importa el AppModule

// Inicializa la aplicación con el AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
