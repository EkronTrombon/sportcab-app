import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PushNotificationService } from '../../services/push-notification.service';
import { MensajePush } from '../../interfaces/interfaces';
import { UIServiceService } from '../../services/uiservice.service';

@Component({
  selector: 'app-send-push',
  templateUrl: './send-push.page.html',
  styleUrls: ['./send-push.page.scss'],
})
export class SendPushPage implements OnInit {

  mensaje: MensajePush = {
    titulo: 'Titulo del mensaje',
    mensaje: 'Texto del mensaje'
  };

  constructor(private pushService: PushNotificationService, private uiService: UIServiceService) {}

  ngOnInit() {}

  async enviarPush(fPush: NgForm) {
    if (fPush.invalid) { return; }
    const enviado = await this.pushService.sendRestPushNotification(this.mensaje);
    if (enviado) {
      this.uiService.toastInformativo('Mensaje enviado!');
    } else {
      this.uiService.toastInformativo('No se ha podido enviar el mensaje');
    }
  }

}
