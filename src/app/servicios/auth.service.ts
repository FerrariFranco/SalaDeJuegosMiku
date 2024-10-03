import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessToken: string | null = null;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  // Método para registrar el usuario
  registrarUsuario(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  getUsuarioActual() {
    return this.afAuth.authState;
  }

  // Método para loguear al usuario
  loguearUsuario(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para guardar el ingreso en Firestore
  registrarIngreso(email: string) {
    const fechaIngreso = new Date().toISOString();
    return this.firestore.collection('logs').add({ email, fechaIngreso });
  }

  // Método para guardar el usuario con el avatar en la colección `usuarios`
  guardarUsuario(email: string, avatar: number) {
    return this.firestore.collection('usuarios').add({
      email,
      avatar,
    });
  }

  // Método para verificar si el usuario ya existe en Firestore
  verificarUsuario(email: string) {
    return this.firestore.collection('usuarios', ref =>
      ref.where('email', '==', email)
    ).get();
  }

  // Método para obtener los datos del usuario por email
  obtenerDatosUsuario(email: string): Observable<any> {
    return this.firestore.collection('usuarios', ref =>
      ref.where('email', '==', email)
    ).valueChanges();
  }

  // Método para cerrar sesión
  logout() {
    this.accessToken = null; // Limpiar el token al hacer logout
    return this.afAuth.signOut();
  }

  // Método para iniciar sesión en Spotify
  
}
