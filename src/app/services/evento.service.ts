import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Evento } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  nuevoEvento = new EventEmitter<Evento>();

  constructor(private http: HttpClient) { }

  getEventos() {
    return this.http.get<Evento[]>(`${URL}/event`);
  }

  addEvent(event: Evento) {
    return new Promise(resolve => {
      this.http.post(`${URL}/event/create`, event).subscribe((resp: any) => {
        if (resp.ok) {
          this.nuevoEvento.emit(resp.evento);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
