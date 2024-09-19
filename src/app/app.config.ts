import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment} from "../environments/environment";
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase },provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"sala-de-juegos-miku","appId":"1:370998800826:web:8a81d58f46e46b8f77ad83","storageBucket":"sala-de-juegos-miku.appspot.com","apiKey":"AIzaSyAH2PDjT8fTlZKtxpamixaJHM577sd1ZEM","authDomain":"sala-de-juegos-miku.firebaseapp.com","messagingSenderId":"370998800826"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
