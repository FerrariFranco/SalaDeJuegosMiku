import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true, 
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule, NgClass, NgFor, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]);


  avatars = [0, 1, 2, 3, 4, 5];
  selectedAvatar: number = -1;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  selectAvatar(index: number) {
    this.selectedAvatar = index;
  }

  async signup() {
    if (this.email.valid && this.password.valid && this.selectedAvatar !== -1) {
      try {
        const emailValue = this.email.value ?? '';
        const passwordValue = this.password.value ?? '';
        
        await this.authService.registrarUsuario(emailValue, passwordValue);
        await this.authService.loguearUsuario(emailValue, passwordValue);
        await this.authService.registrarIngreso(emailValue);
        await this.authService.guardarUsuario(emailValue, this.selectedAvatar + 1); // Guardamos el avatar seleccionado (1 a 6)
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    } else {
      console.log("Formulario no válido o avatar no seleccionado");
    }
  }
}
