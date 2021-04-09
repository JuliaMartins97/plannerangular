import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evento } from './eventos/evento';
import { tap, delay, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

private readonly API = `${environment.API}eventos`;

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Evento[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }

  loadByID(id: any){
    return this.http.get<Evento>(`${this.API}/${id}`).pipe(take(1));
  }

  create(evento: any){
    return this.http.post(this.API, evento).pipe(take(1));
  }

  update(evento) {
    return this.http.put(`${this.API}/${evento.id}`, evento).pipe(take(1));
  }

  save(evento) {
    if (evento.id){
      return this.update(evento);
    }
    return this.create(evento);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
