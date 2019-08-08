import { Injectable, EventEmitter } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { Storage } from '@ionic/storage';
import { MensajePush } from '../interfaces/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL_ONESIGNAL = environment.URL_ONESIGNAL;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  userId: string;

  pushNotifications: OSNotificationPayload[] = [];

  pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal: OneSignal, private storage: Storage, private http: HttpClient) {
    this.cargarPushStorage();
  }

  configOneSignal() {
    this.oneSignal.startInit('2e0acd3c-c349-4292-b003-be852010bc7a', '375189511823');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      this.notificacionRecibida(noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe(async(noti) => {
      // do something when a notification is opened
      console.log('Notificación abierta', noti);
      await this.notificacionRecibida(noti.notification);
    });

    // Get de user Id
    // this.oneSignal.getIds().then(resp => { this.userId = resp.userId });

    this.oneSignal.endInit();
  }

  async notificacionRecibida(noti: OSNotification) {
    await this.cargarPushStorage();
    const payload = noti.payload;
    const existePush = this.pushNotifications.find(mensaje => mensaje.notificationID === payload.notificationID);
    if (existePush) { return; }
    this.pushNotifications.unshift(payload);
    this.pushListener.emit(payload);
    await this.guardarPushStorage();
  }

  guardarPushStorage() {
    this.storage.set('pushNoti', this.pushNotifications);
  }

  async cargarPushStorage() {
    this.pushNotifications = await this.storage.get('pushNoti') || [];
    return this.pushNotifications;
  }

  async getPushNotifications() {
    await this.cargarPushStorage();
    return [...this.pushNotifications];
  }

  sendRestPushNotification(mensaje: MensajePush) {
    console.log(mensaje);
    const headers = new HttpHeaders({
      'Authorization': 'Basic MGI4MTUwOTQtOWRjOS00OTAyLTk5MDEtOWY2ZjdlMjQzMmNm'
    });
    const body = {
      'app_id': '2e0acd3c-c349-4292-b003-be852010bc7a',
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
}
