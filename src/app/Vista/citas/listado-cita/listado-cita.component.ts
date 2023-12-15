import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/Modulos/cita';
import { Usuario } from 'src/app/Modulos/usuario';
import { FireBaseService } from 'src/app/Servicios/fire-base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-cita',
  templateUrl: './listado-cita.component.html',
  styleUrls: ['./listado-cita.component.css']
})
export class ListadoCitaComponent {
    //Entidades
    citas: any[] = [];
    usuarios:Usuario[]=[];
    mostrarTodo: any[] = [];

     // Variables para la fecha
       hoy = new Date();
        anyo = this.hoy.getFullYear();
       mes = this.hoy.getMonth() + 1;
      dia = this.hoy.getDate();

    constructor(private fbs: FireBaseService) {}

    ngOnInit() 
    {
      this.obtenerCitasDia();
    }
      pendientes()
      {
          // Construye la fecha en formato "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;

    // Obtiene las citas del día de la base de datos
     this.fbs.getFireBasePorCampo(`Agenda/${fecha}/citas`,"visto",false).subscribe((res) => {
      if (res.length > 0) {
         // Almacenamos las citas obtenidas en la variable datosCitas
        this.citas = res;
        let shouldBreak = false;
        // Obtenemos la colección de clientes
        this.citas?.forEach((cita) => {
          if (!shouldBreak) {
            if (cita.id_usuario=="") {
              // Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => 
                ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario:'No hay usuario',
                      entrevistrador: cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista:cita.diaDeLaCita,
                      visto:cita.visto,
                      horaDeEntrevista:cita.horaDeLaCita,
                }));          
          } else {
            this.fbs.getFireBasePorId('Usuario', cita.id_usuario).subscribe((usuario) => 
            {
                //Guardo el dni en cita.dni
                cita.dni = usuario.dni; 
          
                // Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => 
                ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario: cita.dni || 'No hay usuario',
                      entrevistrador: cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista:cita.diaDeLaCita,
                      visto:cita.visto,
                      horaDeEntrevista:cita.horaDeLaCita,
                }));          
            })
            }
            shouldBreak = true;
          } 
      })
    }else {
      this.mostrarTodo = [];
      }
    })
      }
    vistos()
    {
        // Construye la fecha en formato "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;

    // Obtiene las citas del día de la base de datos
     this.fbs.getFireBasePorCampo(`Agenda/${fecha}/citas`,"visto",true).subscribe((res) => {
      if (res.length > 0) {
         // Almacenamos las citas obtenidas en la variable datosCitas
        this.citas = res;
        let shouldBreak = false;
        // Obtenemos la colección de clientes
        this.citas?.forEach((cita) => {
          if (!shouldBreak) {
            if (cita.id_usuario=="") {
              // Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => 
                ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario:'No hay usuario',
                      entrevistrador: cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista:cita.diaDeLaCita,
                      visto:cita.visto,
                      horaDeEntrevista:cita.horaDeLaCita,
                }));          
          } else {
            this.fbs.getFireBasePorId('Usuario', cita.id_usuario).subscribe((usuario) => 
            {
                //Guardo el dni en cita.dni
                cita.dni = usuario.dni; 
          
                // Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => 
                ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario: cita.dni || 'No hay usuario',
                      entrevistrador: cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista:cita.diaDeLaCita,
                      visto:cita.visto,
                      horaDeEntrevista:cita.horaDeLaCita,
                }));          
            })
            }
            shouldBreak = true;
          }
      })
    }else {
      this.mostrarTodo = [];
      }
    })
  }

    obtenerCitasDia() {
      // Construye la fecha en formato "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;
    let shouldBreak = false;
    // Obtiene las citas del día de la base de datos
    this.fbs.getFireBase(`Agenda/${fecha}/citas`).subscribe((res) => {
      if (res.length === 0) {
        // Si no hay citas para el día, llamamos a la función para agregar citas
        this.addCitas();
      } else {
        // Almacenamos las citas obtenidas en la variable datosCitas
        this.citas = res;

        // Obtenemos la colección de clientes
        this.citas?.forEach((cita) => {
          if (!shouldBreak) {
            
            if (cita.id_usuario==null) {
              // Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => 
                ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario:'No hay usuario',
                      entrevistrador: cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista:cita.diaDeLaCita,
                      visto:cita.visto,
                      horaDeEntrevista:cita.horaDeLaCita,
                }));          
          } else {
            this.fbs.getFireBasePorId('Usuario', cita.id_usuario).subscribe((usuario) => 
            {
                //Guardo el dni en cita.dni
                cita.dni = usuario.dni; 
          
                // Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => 
                ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario: cita.dni || 'No hay usuario',
                      entrevistrador: cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista:cita.diaDeLaCita,
                      visto:cita.visto,
                      horaDeEntrevista:cita.horaDeLaCita,
                }));          
            })
            }
            shouldBreak = true;
          }
          
        })
      }
    })
  }
    //Metodo eliminar cita
    eliminaCita(cita: Cita)
    {
        //Estos son alertas para saber si quieres borrar 
        const swalWithBootstrapButtons = Swal.mixin(
        {
          customClass: 
          {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });
        swalWithBootstrapButtons.fire(
        {
          title: "¿Estás seguro?",
          text: "¡No se podrán revertir los cambios!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true
        }).then((result) => 
        {
          if (result.isConfirmed) 
          {
            //Si el usuario confirma borraria la cita
            this.fbs.deleteFireBase(cita, "Citas").then(() => swalWithBootstrapButtons.fire(
              {
                title: "Eliminado!",
                text: "La cita ha sido eliminado",
                icon: "success"
              })).catch(() => swalWithBootstrapButtons.fire(
              {
                title: "Oops...!",
                text: "La cita no ha sido eliminado",
                icon: "error"
              }));
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ){
            swalWithBootstrapButtons.fire(
            {
              title: "Cancelado",
              text: "La cita no ha sido eliminado",
              icon: "error"
            });
          }
        });
    }

    addCitas() {
      // Creamos un nuevo documento en agenda
      const fecha = this.anyo  + "-" + this.mes + "-" + this.dia;
      const fechaSinBarras = this.dia + "" + this.mes + "" + this.anyo;
      const horas = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];
      const citas: Cita[] = [];
  
      // Hacemos un bucle para añadir citas
      for (let index = 0; index < horas.length; index++) {
        // Añadimos citas de entrevistador A
        citas.push({
          visto: false,
          diaDeLaCita: fecha,
          entrevistador: "A",
          id_usuario:"",
          horaDeLaCita: horas[index]
        });
  
        // Añadimos citas de entrevistador B
        citas.push({
          visto: false,
          diaDeLaCita: fecha,
          entrevistador: "B",
          id_usuario:"",
          horaDeLaCita: horas[index]
        });
      }
  
      // Recorremos el array de citas y creamos un documento
      for (let index = 0; index < citas.length; index++) {
        this.fbs.setFireBaseDocumento(citas[index], "Agenda/" + fechaSinBarras + "/citas");
      }
    }
  }

