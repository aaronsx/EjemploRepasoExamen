import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/Modulos/cita';
import { Usuario } from 'src/app/Modulos/usuario';
import { FireBaseService } from 'src/app/Servicios/fire-base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {
  usuario: Usuario[]=[];
  cita: any;
  citas: any;
  id: string = "";
  form3 =  this.formBuilder.group({
    dni: ['', [Validators.required]],
    visto:[false],
    diaCita:["",[ Validators.required]],
    horaCita:["",[ Validators.required]],
    entrevistador:["",[ Validators.required]]
  })

  ngOnInit() {
    if (this.route.snapshot.paramMap.get("id")) {
      this.id = this.route.snapshot.paramMap.get("id")!;
      console.log(this.id);
      this.fbs.getFireBasePorId('Citas', this.id).subscribe(
        (res: any) => {
          this.cita = res;
  
          // Asigna los valores del usuario al formulario
          this.form3.setValue(this.cita);
        }
      );
    }
    this.fbs.getFireBase("Usuario")
              .subscribe(res => this.usuario = res);
  }
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private fbs: FireBaseService){}

  enviar() {
    console.log(this.form3.value);
    for (let user of this.usuario) {
      if (user.dni === this.form3.value.dni) {
        // Asegúrate de que this.citas está inicializado
        this.citas = this.citas || {}; // Inicializa como un objeto vacío si es undefined
    
        this.citas.visto = this.form3.value.visto;
        this.citas.horaDeLaCita = this.form3.value.horaCita;
        this.citas.entrevistador = this.form3.value.entrevistador;
        this.citas.diaDeLaCita = this.form3.value.diaCita;
        this.citas.id_usuario = user.id;
    
        break; // Sale del bucle cuando se encuentra el usuario
      }
    }

   
    if(this.id != "")
    this.modificarCita();
  else
    {
     
      this.agregarCita();
    }
  }

  agregarCita()
  {
    
    this.fbs.setFireBase(this.citas,'Citas').then(() => Swal.fire({
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
  modificarCita()
  {
    console.log(this.citas);
    this.fbs.updateFireBase(this.citas,'Citas', this.id!).then(() => Swal.fire({
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
