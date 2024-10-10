import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {
  encuestaForm!: FormGroup; // Formulario reactivo

  constructor(private fb: FormBuilder, private firestore: AngularFirestore, private router: Router) {} // Inyecta AngularFirestore y Router

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{1,10}$/)]],
      pregunta1: ['', Validators.required], // Textbox
      pregunta2: [false, Validators.requiredTrue], // Checkbox
      pregunta3: ['', Validators.required] // Radio buttons
    });
  }

  get edadInvalida(): boolean {
    const edadControl = this.encuestaForm.get('edad');
    return !!edadControl && edadControl.touched && (edadControl.hasError('min') || edadControl.hasError('max'));
  }
  
  // Validación personalizada para teléfono
  get telefonoInvalido(): boolean {
    const telefonoControl = this.encuestaForm.get('telefono');
    return !!telefonoControl && telefonoControl.touched && telefonoControl.hasError('pattern');
  }

  // Función para enviar el formulario
  enviar(): void {
    if (this.encuestaForm.valid) {
      const datosEncuesta = this.encuestaForm.value; // Obtiene los datos del formulario
      this.firestore.collection('encuestas').add(datosEncuesta) // Guarda en la colección 'encuestas'
        .then(() => {
          console.log('Encuesta guardada exitosamente');
          this.encuestaForm.reset(); // Opcional: Resetea el formulario
          this.router.navigate(['/home']); // Redirige al home después de guardar
        })
        .catch(error => {
          console.error('Error al guardar la encuesta:', error);
        });
    } else {
      console.log('Formulario inválido');
      this.encuestaForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar los errores
    }
  }
}
