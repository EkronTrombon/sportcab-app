import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { EventModalComponent } from '../../components/event-modal/event-modal.component';
import { AddEventComponent } from '../../components/add-event/add-event.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  eventos: Evento[] = [];

  constructor(private eventService: EventoService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.cargarEventos();
    this.eventService.nuevoEvento.subscribe(event => this.cargarEventos());
  }

  cargarEventos() {
    this.eventService.getEventos().subscribe((resp: any) => this.eventos = resp.eventos);
  }

  async eventDetail(event: Evento) {
    const modal = await this.modalCtrl.create({
      component: EventModalComponent,
      componentProps: { 'event': event }
    });
    return await modal.present();
  }

  async addEvent() {
    const modal = await this.modalCtrl.create({ component: AddEventComponent });
    return await modal.present();
  }
}
