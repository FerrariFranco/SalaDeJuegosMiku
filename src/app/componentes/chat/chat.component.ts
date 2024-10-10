import { query, orderBy } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../servicios/auth.service';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';

interface Message {
  email: string;
  text: string;
  avatar: number;
  timestamp: number; // Añadir la propiedad timestamp
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  newMessage: string = '';
  messages: Message[] = [];
  userEmail: string | null = null;
  userAvatar: number = 1; 
  
  @ViewChild('chatContainer') chatContainer!: ElementRef; // Referencia al contenedor del chat

  constructor(private authService: AuthService, private firestore: Firestore) {}

  ngOnInit() {
    this.authService.getUsuarioActual().subscribe(user => {
      if (user) {
        this.userEmail = user.email;
        
        this.loadUserAvatar();
        
        this.loadMessages();
        this.scrollToBottom();
      }
    });
  }

  loadUserAvatar() {
    if (this.userEmail) {
      this.authService.obtenerDatosUsuario(this.userEmail).subscribe(userData => {
        if (userData && userData.length > 0) {
          this.userAvatar = userData[0].avatar;
        } else {
          this.userAvatar = 1; 
        }
      });
    }
  }

  loadMessages() {
    const messagesCollection = collection(this.firestore, 'messages');
    const messagesQuery = query(messagesCollection, orderBy('timestamp', 'asc')); // Orden ascendente por timestamp
    collectionData(messagesQuery).subscribe((messages: any) => {
      this.messages = messages;
      this.scrollToBottom(); // Desplazar al final después de cargar los mensajes
    });
  }
  
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    
    // Obtener el día, mes y año
    const day = String(date.getDate()).padStart(2, '0'); // Añade un cero a la izquierda si es necesario
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
    const year = String(date.getFullYear()).slice(-2); // Obtiene los últimos dos dígitos del año
  
    // Obtener horas y minutos
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    // Retorna la cadena formateada
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        email: this.userEmail!,
        text: this.newMessage,
        avatar: this.userAvatar,
        timestamp: new Date().getTime() // Agregar timestamp en milisegundos
      };
      const messagesCollection = collection(this.firestore, 'messages');
      addDoc(messagesCollection, message).then(() => {
        this.newMessage = '';
        this.scrollToBottom(); // Desplazar al final después de enviar el mensaje
      });
    }
  }

  getAvatarURL(avatar: number) {
    return `/assets/profiles/${avatar}.png`;
  }

  scrollToBottom() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
