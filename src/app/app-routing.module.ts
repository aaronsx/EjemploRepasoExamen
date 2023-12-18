import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './Vista/bienvenido/bienvenido.component';

const routes: Routes = [
   {path:"",component:BienvenidoComponent},
  { path: 'Clientes', loadChildren: () => import('./Vista/usuarios/modulo/usuarios.module').then(m => m.UsuariosModule) }, 
  { path: 'Citas', loadChildren: () => import('./Vista/citas/modulo/citas.module').then(m => m.CitasModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
