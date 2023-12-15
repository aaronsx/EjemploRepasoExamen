import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  citas: Cita={visto:false, entrevistador: "", diaDeLaCita:"",horaDeLaCita:"",id_usuario:""};
  id: string = "";
   // Variables para la fecha
   hoy = new Date();
   anyo = this.hoy.getFullYear();
  mes = this.hoy.getMonth() + 1;
 dia = this.hoy.getDate();
  //Formulario reactivo
  form3 = this.formBuilder.group({
    dni: ['', [Validators.required]],
    visto: [false],
    diaCita: [{ value: '', disabled: true }, [Validators.required]],
    horaCita: [{ value: '', disabled: true }, [Validators.required]],
    entrevistador: [{ value: '', disabled: true }, [Validators.required]]
  });

  ngOnInit() {
    const fecha = `${this.dia}${this.mes}${this.anyo}`;
    //if para pillar la id de la url se guarda en id
    if (this.route.snapshot.paramMap.get("id")) {
      this.id = this.route.snapshot.paramMap.get("id")!;
      //Busca id en la tabla cita
      this.fbs.getFireBasePorId(`Agenda/${fecha}/citas`, this.id).subscribe(
        (res: any) => {
          this.cita = res;
          //Busca con el campo cita.id_usuario 
          //el id del usuario para sacar el dni y guardarlo en el formulario
         if(this.cita.id_usuario){
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
        }else{
          this.form3.controls.dni.setValue(this.cita.visto);
          this.form3.controls.entrevistador.setValue(this.cita.entrevistador);
          this.form3.controls.visto.setValue(this.cita.visto);
          this.form3.controls.diaCita.setValue(this.cita.diaDeLaCita);
          this.form3.controls.horaCita.setValue(this.cita.horaDeLaCita);
         }

      });
    }
    //Busca a todos los usuario para llevarlo al formulario
    this.fbs.getFireBase("Usuario")
              .subscribe(res => this.usuario = res);
  }
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,
    private fbs: FireBaseService,private router: Router){}

    //Metodo que llama de para guardar en la base de datos
  enviar() {
    //Recorre un bucle que en este caso guarda 
    
    for (let user of this.usuario) {
      //Si el dni user es igual a que has seleccionado que se guarde 
      //todo y la id del usuario indicado
      if (user.dni === this.form3.value.dni) {
        // 
        
        if (this.form3.value.visto !== null && this.form3.value.visto !== undefined) {
          this.citas.visto = this.form3.value.visto;
        }
        if (this.form3.value.horaCita == null && this.form3.value.horaCita == undefined) {
          this.citas.horaDeLaCita = this.cita.horaDeLaCita;
        }
        
        if (this.form3.value.entrevistador == null && this.form3.value.entrevistador == undefined) {
          this.citas.entrevistador = this.cita.entrevistador;
        }
        
        if (this.form3.value.diaCita == null && this.form3.value.diaCita == undefined) {
          this.citas.diaDeLaCita = this.cita.diaDeLaCita;
        }
        
        // Asegúrate de tener un valor definido para id_usuario antes de asignarlo
        if (user.id !== null && user.id !== undefined) {
          this.citas.id_usuario = user.id;
        }
         // Sale del bucle cuando se encuentra el usuario
        break;
      }
      console.log( this.citas);
    }

    if(this.id != "")
      this.modificarCita();
    else
      this.agregarCita();
    
  }

  agregarCita()
  {
    const fecha = `${this.dia}${this.mes}${this.anyo}`;
    //llama al metodo que comprueba el dia y la hora
    let d = this.comprobarDisponibilidad(this.citas.diaDeLaCita, this.citas.horaDeLaCita).subscribe(disponible => {
     //Si es true se guarda en la base de dato
     if (disponible) 
     {
       //Swal es un tipo de alertas realizada
       this.fbs.setFireBase(this.citas,`Agenda/${fecha}/citas`).then(() => Swal.fire({
         title: "Editado!",
         text: "Cliente ha sido guardado",
         icon: 'success'
       })).catch(()=> Swal.fire({
         title: "Oops...!",
         text: "El cliente no ha sido guardado",
         icon: 'error'
       }));
       this.router.navigate(['http://localhost:4200/Citas/listado']); // La ruta de la página a la que quieres redirigir
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
    const fecha = `${this.dia}${this.mes}${this.anyo}`;
     //llama al metodo que comprueba el dia y la hora
    let d = this.comprobarDisponibilidad(this.citas.diaDeLaCita, this.citas.horaDeLaCita).subscribe(disponible => {
      //Si es true se guarda en la base de dato
      if (disponible) 
      {
        //Swal es un tipo de alertas realizada
        this.fbs.updateFireBase(this.citas,`Agenda/${fecha}/citas`, this.id!).then(() => Swal.fire({
          title: "Editado!",
          text: "Cliente ha sido editado",
          icon: 'success'
        })).catch(()=> Swal.fire({
          title: "Oops...!",
          text: "El cliente no ha sido editado",
          icon: 'error'
        }));
        this.router.navigate(['http://localhost:4200/Citas/listado']); // La ruta de la página a la que quieres redirigir
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
