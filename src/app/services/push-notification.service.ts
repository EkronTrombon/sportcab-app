import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { MensajePush } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { PushModalComponent } from '../components/push-modal/push-modal.component';

const URL_ONESIGNAL = environment.URL_ONESIGNAL;
const OS_AP_ID = environment.OS_APP_ID;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  userId: string;

  pushNotifications: OSNotificationPayload[] = [];

  pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal: OneSignal,
              private storage: Storage,
              private http: HttpClient,
              private modalCtrl: ModalController) {
    // this.cargarPushStorage();
  }

  configOneSignal() {
    this.oneSignal.startInit('2e0acd3c-c349-4292-b003-be852010bc7a', '375189511823');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      // this.notificacionRecibida(noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe(async(noti) => {
      // do something when a notification is opened
      this.getPushNoti(noti);
      // await this.notificacionRecibida(noti.notification);
    });

    // Get de user Id
    // this.oneSignal.getIds().then(resp => { this.userId = resp.userId });

    this.oneSignal.endInit();
  }

  async getPushNoti(noti: OSNotificationOpenedResult) {
    console.log('Notificación recibida!: ', noti.notification);
    const modal = await this.modalCtrl.create({
      component: PushModalComponent,
      componentProps: {
        'pushNoti': noti.notification.payload
      }
    });
    return await modal.present();
  }

  sendRestPushNotification(mensaje: MensajePush) {
    console.log(mensaje);
    const headers = new HttpHeaders({
      'Authorization': 'Basic MGI4MTUwOTQtOWRjOS00OTAyLTk5MDEtOWY2ZjdlMjQzMmNm'
    });
    const body = {
      'app_id': OS_AP_ID,
      'included_segments': ['Active Users', 'Inactive Users'],
      'data': { 'userID': 'PostMan-12345' },
      'contents': { 'en': mensaje.mensaje, 'es': mensaje.mensaje },
      'headings': { 'en': mensaje.titulo, 'es': mensaje.titulo }
    };
    return new Promise(resolve => {
      this.http.post(URL_ONESIGNAL, body, { headers }).subscribe((resp: any) => {
        console.log(resp);
        resolve(true);
      });
    });
  }

  // async notificacionRecibida(noti: OSNotification) {
  //   await this.cargarPushStorage();
  //   const payload = noti.payload;
  //   const existePush = this.pushNotifications.find(mensaje => mensaje.notificationID === payload.notificationID);
  //   if (existePush) { return; }
  //   this.pushNotifications.unshift(payload);
  //   this.pushListener.emit(payload);
  //   await this.guardarPushStorage();
  // }

  // guardarPushStorage() {
  //   this.storage.set('pushNoti', this.pushNotifications);
  // }

  // async cargarPushStorage() {
  //   this.pushNotifications = await this.storage.get('pushNoti') || [];
  //   return this.pushNotifications;
  // }

  // async getPushNotifications() {
  //   await this.cargarPushStorage();
  //   return [...this.pushNotifications];
  // }
}