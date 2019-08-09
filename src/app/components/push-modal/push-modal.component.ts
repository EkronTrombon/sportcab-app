import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-push-modal',
  templateUrl: './push-modal.component.html',
  styleUrls: ['./push-modal.component.scss'],
})
export class PushModalComponent implements OnInit {

  @Input() pushNoti: OSNotificationPayload;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.pushNoti);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
