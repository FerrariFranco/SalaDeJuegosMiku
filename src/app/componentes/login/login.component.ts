import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports:[FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fullname = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]);


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async signup() {
    if (this.email.valid && this.password.valid) {
      try {
        // Asegúrate de que `value` no sea `null`
        const emailValue = this.email.value ?? '';
        const passwordValue = this.password.value ?? '';
        
        await this.authService.loguearUsuario(emailValue, passwordValue);
        await this.authService.registrarIngreso(emailValue); // Guarda el ingreso en Firestore
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al registrar usuario:', error);
      }
    } else {
      console.log("Formulario no válido");
    }
  }

  fillDefaultValues() {
    this.email.setValue('aa@gmail.com');
    this.password.setValue('Aa123456');
  }
}
 