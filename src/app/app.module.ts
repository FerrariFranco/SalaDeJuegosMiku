import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { routes } from './app.routes';  // Importa las rutas desde app.routes.ts
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AuthService } from './servicios/auth.service'; // Ajusta la ruta según tu estructura
import { LoadingSpinnerComponent } from './componentes/loading-spinner/loading-spinner.component'; // Ajusta la ruta según tu estructura
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ScoresComponent } from './componentes/scores/scores.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';




@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    ScoresComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),  // Configura las rutas
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
