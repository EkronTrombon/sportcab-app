import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

  constructor(private alertCtrl: AlertController) { }

  async alertaInformativa(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta!',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
