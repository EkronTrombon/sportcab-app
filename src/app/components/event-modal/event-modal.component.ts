import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss'],
})
export class EventModalComponent implements OnInit {

  @Input() event: Evento;
  colorEvento: string = 'primary';
  imagenEvento: string = 'match.jpg';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('Evento recibido: ', this.event);
    this.asignarOptsEvento();
  }

  asignarOptsEvento() {
    switch (this.event.tipo) {
      case 'Partido':
        this.colorEvento = 'success';
        this.imagenEvento = 'match.jpg';
        break;
      case 'Entrenamiento':
        this.colorEvento = 'danger';
        this.imagenEvento = 'training.jpg';
        break;
      case 'Otro':
        this.colorEvento = 'dark';
        this.imagenEvento = 'football1.jpg';
        break;
      default:
        break;
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
