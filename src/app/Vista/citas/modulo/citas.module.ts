import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from '../citas.component';
import { DetalleCitaComponent } from '../detalle-cita/detalle-cita.component';
import { ListadoCitaComponent } from '../listado-cita/listado-cita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    CitasComponent,
    DetalleCitaComponent,
    ListadoCitaComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CitasModule { }
