import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/Modulos/usuario';
import { FireBaseService } from 'src/app/Servicios/fire-base.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {
  //Entidades
  usuario: any;
  id: string = "";
  form3 = this.formBuilder.group({
    id:[''],
    nombre: ['',[ Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.maxLength(15)]],
    dni: ['', [Validators.required, Validators.maxLength(9)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required,Validators.maxLength(9)]]  
  })
    ngOnInit() 
    {
      //if para pillar la id de la url se guarda en id
      if (this.route.snapshot.paramMap.get("id")) {
        this.id = this.route.snapshot.paramMap.get("id")!;
        //Busca id en la tabla usuario
        this.fbs.getFireBasePorId('Usuario', this.id).subscribe(
          (res: any) => {
            this.usuario = res;
    
            // Asigna los valores del usuario al formulario
            this.form3.setValue(this.usuario);
          }
        );
      }
    }
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private fbs: FireBaseService){}

  enviar() {
    
    if(this.id != "")
      this.modificarUsuario();
    else
      this.agregarUsuario();  

  }

  agregarUsuario()
  {
    //Swal es un tipo de alertas realizada si se borra o no el usuario
    this.fbs.setFireBase(this.form3.value,'Usuario').then(() => Swal.fire({
        title: "Guardado!",
        text: "Cliente ha sido guardado",
        icon: 'success'
      }))
      .catch(()=> Swal.fire({
        title: "Oops...!",
        text: "El cliente no ha sido guardado",
        icon: 'error'
      }));
  
  }
  modificarUsuario()
  {
    //Swal es un tipo de alertas realizada
    this.fbs.updateFireBase(this.form3.value,'Usuario', this.id!).then(() => Swal.fire({
      title: "Editado!",
      text: "Cliente ha sido editado",
      icon: 'success'
    }))
    .catch(()=> Swal.fire({
      title: "Oops...!",
      text: "El cliente no ha sido editado",
      icon: 'error'
    }));
  }
}



