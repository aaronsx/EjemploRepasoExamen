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

    constructor(private fbs: FireBaseService) {}

    ngOnInit() 
    {
        //Buscar toda la tabla Citas sin filtrar
        this.fbs.getFireBase('Citas').subscribe((res) => 
        {
            this.citas = res;
	
            // Para cada cita, busca el usuario 
            this.citas.forEach((cita) => 
	          {
		            //Buscar usuarios por el cita.id_usuario de la tabla Citas
		            this.fbs.getFireBasePorId('Usuario', cita.id_usuario).subscribe((usuario) => 
		            {
			              //Guardo el dni en cita.dni
			              cita.dni = usuario.dni; 
              
                    // Llena el arreglo mostrarTodo con la información actualizada
                    this.mostrarTodo = this.citas.map((cita) => 
			              ({
				                  //Campos para mostrarlo
				                  id: cita.id,
                          dniUsuario: cita.dni || 'Usuario no encontrado',
                          entrevistrador: cita.entrevistador || 'No hay entrevistador',
                          diaDeEntevista:cita.diaDeLaCita,
                          visto:cita.visto,
                          horaDeEntrevista:cita.horaDeLaCita,
                    }));          
                });              
            });
        });
    }
      pendientes()
      {
        this.fbs.getFireBasePorCampo("Citas","visto",false).subscribe((res) => 
        {
          this.citas = res;
          if (this.citas.length > 0) 
          {
             // Para cada alquiler, busca el usuario y el juego correspondientes
             this.citas.forEach((cita) => 
             {
                //Buscar usuarios por el cita.id_usuario de la tabla Citas
                this.fbs.getFireBasePorId('Usuario', cita.id_usuario).subscribe((usuario) => 
                {
                   //Guardo el dni en cita.dni
                   cita.dni = usuario.dni; 

                   // Llena el arreglo mostrarTodo con la información actualizada
                   this.mostrarTodo = this.citas.map((cita) => 
                   ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario: cita.dni || 'Usuario no encontrado',
                      entrevistrador: cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista:cita.diaDeLaCita,
                      visto:cita.visto,
                      horaDeEntrevista:cita.horaDeLaCita,
                    }));                 
                 });
              });
          }else
            this.mostrarTodo = [];
        });
      }
    vistos()
    {
      this.fbs.getFireBasePorCampo("Citas","visto",true).subscribe((res) => 
      {
        this.citas = res;
        if (this.citas.length > 0) 
        {
           // Para cada alquiler, busca el usuario y el juego correspondientes
           this.citas.forEach((cita) => 
           {
              //Buscar usuarios por el cita.id_usuario de la tabla Citas
              this.fbs.getFireBasePorId('Usuario', cita.id_usuario).subscribe((usuario) => 
              {
                 //Guardo el dni en cita.dni
                 cita.dni = usuario.dni; 

                 // Llena el arreglo mostrarTodo con la información actualizada
                 this.mostrarTodo = this.citas.map((cita) => 
                 ({
                    //Campos para mostrarlo
                    id: cita.id,
                    dniUsuario: cita.dni || 'Usuario no encontrado',
                    entrevistrador: cita.entrevistador || 'No hay entrevistador',
                    diaDeEntevista:cita.diaDeLaCita,
                    visto:cita.visto,
                    horaDeEntrevista:cita.horaDeLaCita,
                  }));                 
               });
            });
        }else
          this.mostrarTodo = [];
      });
    }
    todos()
    {
      //Buscar toda la tabla Citas sin filtrar
      this.fbs.getFireBase('Citas').subscribe((res) => 
      {
          this.citas = res;

          // Para cada cita, busca el usuario 
          this.citas.forEach((cita) => 
          {
              //Buscar usuarios por el cita.id_usuario de la tabla Citas
              this.fbs.getFireBasePorId('Usuario', cita.id_usuario).subscribe((usuario) => 
              {
                  //Guardo el dni en cita.dni
                  cita.dni = usuario.dni; 
            
                  // Llena el arreglo mostrarTodo con la información actualizada
                  this.mostrarTodo = this.citas.map((cita) => 
                  ({
                        //Campos para mostrarlo
                        id: cita.id,
                        dniUsuario: cita.dni || 'Usuario no encontrado',
                        entrevistrador: cita.entrevistador || 'No hay entrevistador',
                        diaDeEntevista:cita.diaDeLaCita,
                        visto:cita.visto,
                        horaDeEntrevista:cita.horaDeLaCita,
                  }));          
              });              
          });
      });
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
}
