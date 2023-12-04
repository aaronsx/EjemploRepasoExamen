import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from '../citas.component';
import { DetalleCitaComponent } from '../detalle-cita/detalle-cita.component';
import { ListadoCitaComponent } from '../listado-cita/listado-cita.component';
import { MenuCitaComponent } from '../menu-cita/menu-cita.component';


@NgModule({
  declarations: [
    CitasComponent,
    DetalleCitaComponent,
    ListadoCitaComponent,
    MenuCitaComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule
  ]
})
export class CitasModule { }
