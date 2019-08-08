import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../../services/push-notification.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  mensajes: OSNotificationPayload[] = [];

  userId: string;

  constructor(private pushNotificationService: PushNotificationService) {}

  ngOnInit() {
    this.pushNotificationService.pushListener.subscribe(noti => {
      this.mensajes.unshift(noti);
    });
  }

  async ionViewWillEnter() {
    this.mensajes = await this.pushNotificationService.getPushNotifications();
  }
}
