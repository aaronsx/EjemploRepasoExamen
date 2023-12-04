import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from '../usuarios.component';
import { DetalleUsuarioComponent } from '../detalle-usuario/detalle-usuario.component';
import { ListadoUsuarioComponent } from '../listado-usuario/listado-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    UsuariosComponent,
    DetalleUsuarioComponent,
    ListadoUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class UsuariosModule { }
