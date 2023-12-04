import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from '../usuarios.component';
import { DetalleUsuarioComponent } from '../detalle-usuario/detalle-usuario.component';
import { ListadoUsuarioComponent } from '../listado-usuario/listado-usuario.component';


const routes: Routes = [
  { path: '', component: UsuariosComponent, children:
  [
    {path:'listado', component: ListadoUsuarioComponent},
    {path:'detalle/:id', component: DetalleUsuarioComponent},
    {path:'agregar', component: DetalleUsuarioComponent}
  ]  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
