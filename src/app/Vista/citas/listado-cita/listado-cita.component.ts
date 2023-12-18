import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/Modulos/cita';
import { Usuario } from 'src/app/Modulos/usuario';
import { FireBaseService } from 'src/app/Servicios/fire-base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-cita',
  templateUrl: './listado-cita.component.html',
  styleUrls: ['./listado-cita.component.css'],
})
export class ListadoCitaComponent {
  //Entidades
  citas: any[] = [];
  usuarios: Usuario[] = [];
  mostrarTodo: any[] = [];

  // Declaramos la fehca actual
  hoy = new Date();
  anyo = this.hoy.getFullYear();
  mes = this.hoy.getMonth() + 1;
  dia = this.hoy.getDate();

  constructor(private fbs: FireBaseService) {}

  ngOnInit() {
    this.obtenerCitasDia();
  }
  pendientes() {
    //Da el fromato a fecha "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;

    //Optienes toda lista mientra que visto sea false
    this.fbs
      .getFireBasePorCampo(`Agenda/${fecha}/citas`, 'visto', false)
      .subscribe((res) => {
        if (res.length > 0) {
          this.citas = res;
          let shouldBreak = false;
          // Hacemos un foreach a citas
          this.citas?.forEach((cita) => {
            //If para que solo entre una ves a guardar
            if (!shouldBreak) {
              //Si el dni esta vacio va a un lado y se guarda de otra forma
              if (cita.id_usuario == '') {
                //Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => ({
                  //Campos para mostrarlo
                  id: cita.id,
                  dniUsuario: 'No hay usuario',
                  entrevistrador: cita.entrevistador || 'No hay entrevistador',
                  diaDeEntevista: cita.diaDeLaCita,
                  visto: cita.visto,
                  horaDeEntrevista: cita.horaDeLaCita,
                }));
              } else {
                //Te trae toda lista usuario si existe el dni
                this.fbs
                  .getFireBasePorId('Usuario', cita.id_usuario)
                  .subscribe((usuario) => {
                    cita.dni = usuario.dni;

                    // Llena el arreglo mostrarTodo con la información actualizada
                    this.mostrarTodo = this.citas.map((cita) => ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario: cita.dni || 'No hay usuario',
                      entrevistrador:
                        cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista: cita.diaDeLaCita,
                      visto: cita.visto,
                      horaDeEntrevista: cita.horaDeLaCita,
                    }));
                  });
              }
              shouldBreak = true;
            }
          });
        } else {
          //Se pone vacio mostrar para que se reinicie
          this.mostrarTodo = [];
        }
      });
  }
  vistos() {
    //Da el fromato a fecha "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;

    //Optienes toda lista mientra que visto sea true
    this.fbs
      .getFireBasePorCampo(`Agenda/${fecha}/citas`, 'visto', true)
      .subscribe((res) => {
        if (res.length > 0) {
          this.citas = res;
          let shouldBreak = false;
          // Hacemos un foreach a citas
          this.citas?.forEach((cita) => {
            //If para que solo entre una ves a guardar
            if (!shouldBreak) {
              //Si el dni esta vacio va a un lado y se guarda de otra forma
              if (cita.id_usuario == '') {
                //Llena el arreglo mostrarTodo con la información actualizada
                this.mostrarTodo = this.citas.map((cita) => ({
                  //Campos para mostrarlo
                  id: cita.id,
                  dniUsuario: 'No hay usuario',
                  entrevistrador: cita.entrevistador || 'No hay entrevistador',
                  diaDeEntevista: cita.diaDeLaCita,
                  visto: cita.visto,
                  horaDeEntrevista: cita.horaDeLaCita,
                }));
              } else {
                //Te trae toda lista usuario si existe el dni
                this.fbs
                  .getFireBasePorId('Usuario', cita.id_usuario)
                  .subscribe((usuario) => {
                    cita.dni = usuario.dni;

                    // Llena el arreglo mostrarTodo con la información actualizada
                    this.mostrarTodo = this.citas.map((cita) => ({
                      //Campos para mostrarlo
                      id: cita.id,
                      dniUsuario: cita.dni || 'No hay usuario',
                      entrevistrador:
                        cita.entrevistador || 'No hay entrevistador',
                      diaDeEntevista: cita.diaDeLaCita,
                      visto: cita.visto,
                      horaDeEntrevista: cita.horaDeLaCita,
                    }));
                  });
              }
              shouldBreak = true;
            }
          });
        } else {
          //Se pone vacio mostrar para que se reinicie
          this.mostrarTodo = [];
        }
      });
  }

  obtenerCitasDia() {
    //Da el fromato a fecha "ddmmaaaa"
    const fecha = `${this.dia}${this.mes}${this.anyo}`;
    let shouldBreak = false;
    //Optienes toda lista
    this.fbs.getFireBase(`Agenda/${fecha}/citas`).subscribe((res) => {
      //Comprueba si exite o no
      if (res.length === 0) {
        this.addCitas();
      } else {
        this.citas = res;

        // Obtenemos la colección de clientes
        this.citas?.forEach((cita) => {
          if (res.length > 0) {
            this.citas = res;
            let shouldBreak = false;
            // Hacemos un foreach a citas
            this.citas?.forEach((cita) => {
              //If para que solo entre una ves a guardar

                
                //Si el dni esta vacio va a un lado y se guarda de otra forma
                if (cita.id_usuario == '') {
                  //Llena el arreglo mostrarTodo con la información actualizada
                  this.mostrarTodo = this.citas.map((cita) => ({
                    //Campos para mostrarlo
                    id: cita.id,
                    dniUsuario: 'No hay usuario',
                    entrevistrador:
                      cita.entrevistador || 'No hay entrevistador',
                    diaDeEntevista: cita.diaDeLaCita,
                    visto: cita.visto,
                    horaDeEntrevista: cita.horaDeLaCita,
                  }));
                  
                  
                } else {
                  //Te trae toda lista usuario si existe el dni
                  this.fbs
                    .getFireBasePorId('Usuario', cita.id_usuario)
                    .subscribe((usuario) => {
                      cita.dni = usuario.dni;

                      // Llena el arreglo mostrarTodo con la información actualizada
                      this.mostrarTodo = this.citas.map((cita) => ({
                        //Campos para mostrarlo
                        id: cita.id,
                        dniUsuario: cita.dni || 'No hay usuario',
                        entrevistrador:
                          cita.entrevistador || 'No hay entrevistador',
                        diaDeEntevista: cita.diaDeLaCita,
                        visto: cita.visto,
                        horaDeEntrevista: cita.horaDeLaCita,
                      }));
                    });
                    
                }
                
              
              
            });
          }
        });
      }
    });
  }
  //Metodo eliminar cita
  eliminaCita(cita: Cita) {
    const fecha = `${this.dia}${this.mes}${this.anyo}`;
    //Estos son alertas para saber si quieres borrar
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: '¡No se podrán revertir los cambios!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          //Si el usuario confirma borraria la cita
          this.fbs
            .deleteFireBase(cita, `Agenda/${fecha}/citas`)
            .then(() =>
              swalWithBootstrapButtons.fire({
                title: 'Eliminado!',
                text: 'La cita ha sido eliminado',
                icon: 'success',
              })
            )
            .catch(() =>
              swalWithBootstrapButtons.fire({
                title: 'Oops...!',
                text: 'La cita no ha sido eliminado',
                icon: 'error',
              })
            );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            text: 'La cita no ha sido eliminado',
            icon: 'error',
          });
        }
      });
  }

  addCitas() {
    // Creamos un nuevo formato en agenda
    const fecha = this.anyo + '-' + this.mes + '-' + this.dia;
    const fechaSinBarras = this.dia + '' + this.mes + '' + this.anyo;
    const horas = [
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
    ];
    const citas: Cita[] = [];

    for (let index = 0; index < horas.length; index++) {
      // Añadimos citas de entrevistador A y B
      citas.push({
        visto: false,
        diaDeLaCita: fecha,
        entrevistador: 'A',
        id_usuario: '',
        horaDeLaCita: horas[index],
      });
      citas.push({
        visto: false,
        diaDeLaCita: fecha,
        entrevistador: 'B',
        id_usuario: '',
        horaDeLaCita: horas[index],
      });
    }

    // Recorremos el array y lo añadmos a la base de datos
    for (let index = 0; index < citas.length; index++) {
      this.fbs.setFireBaseDocumento(
        citas[index],
        'Agenda/' + fechaSinBarras + '/citas'
      );
    }
  }
}
