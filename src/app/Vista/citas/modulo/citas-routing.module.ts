import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitasComponent } from '../citas.component';
import { ListadoCitaComponent } from '../listado-cita/listado-cita.component';
import { DetalleCitaComponent } from '../detalle-cita/detalle-cita.component';

const routes: Routes = [
  { path: '', component: CitasComponent, children:
  [
    {path:'listado', component: ListadoCitaComponent},
    {path:'detalle/:id', component: DetalleCitaComponent},
    {path:'agregar', component: DetalleCitaComponent}
  ]  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitasRoutingModule { }
