import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {
  
  form3 = this.formBuilder.group({
    nombre: ['',[ Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.maxLength(15)]],
    dni: ['', [Validators.required, Validators.maxLength(9)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required,Validators.maxLength(9)]]  
  })

  constructor(private formBuilder: FormBuilder){}

  enviar() {
    console.log(this.form3.valid);
  }

}



