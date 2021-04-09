import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosListaComponent } from './eventos-lista/eventos-lista.component';
import { EventosFormComponent } from './eventos-form/eventos-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventosListaComponent,
    EventosFormComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    ReactiveFormsModule
  ]
})
export class EventosModule { }
