import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
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
  //Entidades 
  usuario: Usuario[]=[];
  cita: any;
  citas: any;
  id: string = "";
  //Formulario reactivo
  form3 =  this.formBuilder.group({
    dni: ['', [Validators.required]],
    visto:[false],
    diaCita:["",[ Validators.required]],
    horaCita:["",[ Validators.required]],
    entrevistador:["",[ Validators.required]]
  })

  ngOnInit() {
    //if para pillar la id de la url se guarda en id
    if (this.route.snapshot.paramMap.get("id")) {
      this.id = this.route.snapshot.paramMap.get("id")!;
      //Busca id en la tabla cita
      this.fbs.getFireBasePorId('Citas', this.id).subscribe(
        (res: any) => {
          this.cita = res;
          //Busca con el campo cita.id_usuario 
          //el id del usuario para sacar el dni y guardarlo en el formulario
          this.fbs
          .getFireBasePorId('Usuario', this.cita.id_usuario)
          .subscribe((usuario) => {
            this.form3.controls.dni.setValue(usuario.dni);
          });
          // Asigna los valores del usuario al formulario
          this.form3.controls.dni.setValue(this.cita.visto);
          this.form3.controls.entrevistador.setValue(this.cita.entrevistador);
          this.form3.controls.visto.setValue(this.cita.visto);
          this.form3.controls.diaCita.setValue(this.cita.diaDeLaCita);
          this.form3.controls.horaCita.setValue(this.cita.horaDeLaCita);
        }
      );
    }
    //Busca a todos los usuario para llevarlo al formulario
    this.fbs.getFireBase("Usuario")
              .subscribe(res => this.usuario = res);
  }
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,
    private fbs: FireBaseService){}

    //Metodo que llama de para guardar en la base de datos
  enviar() {
    //Recorre un bucle que en este caso guarda 
    for (let user of this.usuario) {
      //Si el dni user es igual a que has seleccionado que se guarde 
      //todo y la id del usuario indicado
      if (user.dni === this.form3.value.dni) {
        // 
        this.citas.visto = this.form3.value.visto;
        this.citas.horaDeLaCita = this.form3.value.horaCita;
        this.citas.entrevistador = this.form3.value.entrevistador;
        this.citas.diaDeLaCita = this.form3.value.diaCita;
        this.citas.id_usuario = user.id;
         // Sale del bucle cuando se encuentra el usuario
        break;
      }
    }

    if(this.id != "")
      this.modificarCita();
    else
      this.agregarCita();
    
  }

  agregarCita()
  {
    //llama al metodo que comprueba el dia y la hora
    let d = this.comprobarDisponibilidad(this.citas.diaDeLaCita, this.citas.horaDeLaCita).subscribe(disponible => {
     //Si es true se guarda en la base de dato
     if (disponible) 
     {
       //Swal es un tipo de alertas realizada
       this.fbs.setFireBase(this.citas,'Citas').then(() => Swal.fire({
         title: "Editado!",
         text: "Cliente ha sido guardado",
         icon: 'success'
       })).catch(()=> Swal.fire({
         title: "Oops...!",
         text: "El cliente no ha sido guardado",
         icon: 'error'
       }));
      } else 
      {
       //Por si la hora y el dia ya existe
       Swal.fire({
         title: "Oops...!",
         text: "El día indicado a la hora indicada no está disponible",
         icon: 'error'
       });
     }
    });
 }
  modificarCita()
  {
     //llama al metodo que comprueba el dia y la hora
    let d = this.comprobarDisponibilidad(this.citas.diaDeLaCita, this.citas.horaDeLaCita).subscribe(disponible => {
      //Si es true se guarda en la base de dato
      if (disponible) 
      {
        //Swal es un tipo de alertas realizada
        this.fbs.updateFireBase(this.citas,'Citas', this.id!).then(() => Swal.fire({
          title: "Editado!",
          text: "Cliente ha sido editado",
          icon: 'success'
        })).catch(()=> Swal.fire({
          title: "Oops...!",
          text: "El cliente no ha sido editado",
          icon: 'error'
        }));
      } else 
      {
        //Por si la hora y el dia ya existe
        Swal.fire({
          title: "Oops...!",
          text: "El día indicado a la hora indicada no está disponible",
          icon: 'error'
        });
      }
    });
  }
  //Metodo para comprobar
  comprobarDisponibilidad(dia: string, hora: string): Observable<boolean> {
    //Llama a querycolection de firebase y devuelve 
    return this.fbs.queyCollection2campos("citas", "diaCita", dia, "horaCita", hora).pipe(
      map(diaHora => diaHora.length < 2)
    );
  }
}
