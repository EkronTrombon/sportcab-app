import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushModalComponent } from './push-modal/push-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PushModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PushModalComponent
  ]
})
export class ComponentsModule { }
