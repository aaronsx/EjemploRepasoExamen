import { Component } from '@angular/core';
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

  citas:Cita[]=[];
  usuarios:Usuario[]=[];
    constructor(private fbs:FireBaseService){}
    ngOnInit(){
      this.fbs.getFireBase("Usuario")
              .subscribe(res => this.usuarios = res);
      this.fbs.getFireBase("Citas")
              .subscribe(res => this.citas = res);
    }
    pendientes(){
      this.fbs.getFireBasePorCampo("Citas","visto",false).subscribe(data=>this.citas=daresta);
    }
    vistos(){
      this.fbs.getFireBasePorCampo("Citas","visto",true).subscribe(res=>this.citas=res);
    }
    todos(){
      this.fbs.getFireBase("Citas").subscribe(res=>this.citas=res);
    }
    
    eliminaCita(cita: Cita){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "¿Estás seguro?",
        text: "¡No se podrán revertir los cambios!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
         this.fbs.deleteFireBase(cita, "Citas")
            .then(() => swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "La cita ha sido eliminado",
              icon: "success"
            }))
            .catch(() => swalWithBootstrapButtons.fire({
              title: "Oops...!",
              text: "La cita no ha sido eliminado",
              icon: "error"
            }));
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "La cita no ha sido eliminado",
            icon: "error"
          });
        }
      });
    }
}
