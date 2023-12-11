import { Component } from '@angular/core';
import { Usuario } from 'src/app/Modulos/usuario';
import { FireBaseService } from 'src/app/Servicios/fire-base.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent {
    usuarios:Usuario[]=[];
    constructor(private fbs:FireBaseService){}
    
    ngOnInit()
    {
      this.fbs.getFireBase("Usuario")
              .subscribe(res => this.usuarios = res);
    }
    //Metodo eliminar usuario
    eliminaUsuario(usuario: Usuario){
      //Estos son alertas para saber si quieres borrar 
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
          //Si el usuario confirma borraria el usuario
         this.fbs.deleteFireBase(usuario, "Usuario")
            .then(() => swalWithBootstrapButtons.fire({
              title: "Eliminado!",
              text: "El cliente ha sido eliminado",
              icon: "success"
            }))
            .catch(() => swalWithBootstrapButtons.fire({
              title: "Oops...!",
              text: "El usuario no ha sido eliminado",
              icon: "error"
            }));
  
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "El usuario no ha sido eliminado",
            icon: "error"
          });
        }
      });
    }
}
