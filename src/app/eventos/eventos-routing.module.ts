import { EventoResolverGuard } from './guards/evento-resolver.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { EventosListaComponent } from './eventos-lista/eventos-lista.component';

const routes: Routes = [
  { path: '', component: EventosListaComponent  },
  {
    path: 'novo',
    component: EventosFormComponent,
  resolve: {
    evento: EventoResolverGuard
  }
  },
  {
    path: 'editar/:id',
    component: EventosFormComponent,
    resolve: {
      evento: EventoResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
