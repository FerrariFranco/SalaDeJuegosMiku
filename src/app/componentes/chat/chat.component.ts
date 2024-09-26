import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Importa FormsModule
import { AuthService } from '../../servicios/auth.service';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface Message {
  email: string;
  text: string;
  avatar: number;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf], // <-- Añade FormsModule aquí
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  newMessage: string = '';
  messages: Message[] = [];
  userEmail: string | null = null;
  userAvatar: number = 1; // Variable para almacenar el avatar del usuario

  constructor(private authService: AuthService, private firestore: Firestore) {}

  ngOnInit() {
    // Obtener el email del usuario autenticado
    this.authService.getUsuarioActual().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        // Cargar avatar del usuario desde Firestore
        this.loadUserAvatar();
        // Cargar mensajes desde Firestore
        this.loadMessages();
      }
    });
  }

  loadUserAvatar() {
    if (this.userEmail) {
      this.authService.obtenerDatosUsuario(this.userEmail).subscribe(userData => {
        if (userData && userData.length > 0) {
          this.userAvatar = userData[0].avatar; // Almacena el avatar del usuario
        } else {
          this.userAvatar = 1; // Valor por defecto si no se encuentra el avatar
        }
      });
    }
  }

  loadMessages() {
    const messagesCollection = collection(this.firestore, 'messages');
    collectionData(messagesCollection).subscribe((messages: any) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        email: this.userEmail!,
        text: this.newMessage,
        avatar: this.userAvatar // Usa el avatar almacenado del usuario
      };
      const messagesCollection = collection(this.firestore, 'messages');
      addDoc(messagesCollection, message).then(() => {
        this.newMessage = '';
      });
    }
  }

  getAvatarURL() {
    return `/assets/profiles/${this.userAvatar}.png`;
  }
}
