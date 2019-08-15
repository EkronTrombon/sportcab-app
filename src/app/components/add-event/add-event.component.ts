import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Evento } from '../../interfaces/interfaces';
import { EventoService } from '../../services/evento.service';
import { UIServiceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

  anioActual = new Date().getFullYear();
  evento: Evento = {};

  constructor(private modalCtrl: ModalController,
              private eventService: EventoService,
              private uiService: UIServiceService) { }

  ngOnInit() {}

  async saveEvent(fAddEvent: NgForm) {
    console.log(this.evento);
    const creado = await this.eventService.addEvent(this.evento);
    if (creado) {
      this.uiService.toastInformativo('Evento creado!');
      this.modalCtrl.dismiss();
    } else {
      this.uiService.toastInformativo('El evento no se ha podido crear');
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
