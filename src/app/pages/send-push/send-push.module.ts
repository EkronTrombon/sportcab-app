import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SendPushPage } from './send-push.page';
import { ComponentsModule } from '../../components/components.module';
import { PushModalComponent } from 'src/app/components/push-modal/push-modal.component';

const routes: Routes = [
  {
    path: '',
    component: SendPushPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SendPushPage]
})
export class SendPushPageModule {}
