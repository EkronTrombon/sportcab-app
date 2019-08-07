import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UIServiceService {

  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController) { }

  async alertaInformativa(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alerta!',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async toastInformativo(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
