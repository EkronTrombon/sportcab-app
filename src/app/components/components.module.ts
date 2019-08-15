import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushModalComponent } from './push-modal/push-modal.component';
import { IonicModule } from '@ionic/angular';
import { EventModalComponent } from './event-modal/event-modal.component';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PushModalComponent,
    EventModalComponent,
    AddEventComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    PushModalComponent,
    EventModalComponent,
    AddEventComponent
  ]
})
export class ComponentsModule { }
