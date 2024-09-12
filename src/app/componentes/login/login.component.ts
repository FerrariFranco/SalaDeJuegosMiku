import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule aquí

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  onSubmit() {
    console.log('Formulario enviado');
  }
}
