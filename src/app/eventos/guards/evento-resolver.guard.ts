import { EventosService } from './../../eventos.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Evento } from '../evento';

@Injectable({
  providedIn: 'root'
})
export class EventoResolverGuard implements Resolve<Evento> {

  constructor(private service: EventosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Evento> {
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id'])
    }

    return of({
      id: null,
      nomeevento: null,
      data: null,
      hora: null,
      local: null
    });
  }
}
